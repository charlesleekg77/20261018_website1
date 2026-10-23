import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

import { useFinePointer, usePrefersReducedMotion } from '../hooks/useMediaQuery';

type Variant = 'idle' | 'link' | 'text' | 'stamp';

const SIZES: Record<Variant, number> = { idle: 26, link: 60, text: 8, stamp: 96 };

/**
 * Crosshair cursor with a trailing ring. Enabled only for fine pointers and
 * disabled entirely when the user asks for reduced motion, so native cursors
 * stay usable for everyone else.
 */
export default function CustomCursor() {
  const finePointer = useFinePointer();
  const reducedMotion = usePrefersReducedMotion();
  const enabled = finePointer && !reducedMotion;

  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);
  const ringX = useSpring(rawX, { stiffness: 520, damping: 34, mass: 0.4 });
  const ringY = useSpring(rawY, { stiffness: 520, damping: 34, mass: 0.4 });

  const [variant, setVariant] = useState<Variant>('idle');
  const [label, setLabel] = useState('');
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) {
      document.body.removeAttribute('data-cursor');
      return;
    }

    document.body.setAttribute('data-cursor', 'custom');

    const resolve = (target: EventTarget | null): { variant: Variant; label: string } => {
      const element = target instanceof Element ? target : null;
      if (!element) return { variant: 'idle', label: '' };

      const stamped = element.closest<HTMLElement>('[data-cursor-stamp]');
      if (stamped) {
        return { variant: 'stamp', label: stamped.dataset.cursorStamp || 'STAMP IT' };
      }

      const interactive = element.closest<HTMLElement>(
        'a, button, [role="button"], summary, input[type="checkbox"], input[type="radio"], select',
      );
      if (interactive) {
        return {
          variant: 'link',
          label:
            interactive.dataset.cursorLabel ||
            (interactive.getAttribute('aria-label') ?? '') ||
            '',
        };
      }

      const typing = element.closest<HTMLElement>('input, textarea, [contenteditable="true"]');
      if (typing) return { variant: 'text', label: '' };

      return { variant: 'idle', label: '' };
    };

    const onMove = (event: PointerEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      setVisible(true);
      const next = resolve(event.target);
      setVariant(next.variant);
      setLabel(next.label.slice(0, 22));
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    document.addEventListener('pointerenter', onEnter);

    return () => {
      document.body.removeAttribute('data-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointerleave', onLeave);
      document.removeEventListener('pointerenter', onEnter);
    };
  }, [enabled, rawX, rawY]);

  if (!enabled) return null;

  const size = SIZES[variant];
  const filled = variant === 'stamp';

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden md:block">
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-acid mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          scale: pressed ? 0.82 : 1,
          backgroundColor: filled ? 'rgba(212,255,0,1)' : 'rgba(212,255,0,0)',
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      >
        {label && (
          <span className="label-type whitespace-nowrap px-1 text-[8px] text-ink mix-blend-normal">{label}</span>
        )}
      </motion.div>

      <motion.div
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full bg-acid"
        style={{ x: rawX, y: rawY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible ? 1 : 0, scale: variant === 'text' ? 1.8 : 1 }}
        transition={{ duration: 0.12 }}
      />

      <motion.div
        className="absolute left-0 top-0 h-5 w-px bg-acid/70"
        style={{ x: rawX, y: rawY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && variant === 'idle' ? 0.5 : 0 }}
      />
      <motion.div
        className="absolute left-0 top-0 h-px w-5 bg-acid/70"
        style={{ x: rawX, y: rawY, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: visible && variant === 'idle' ? 0.5 : 0 }}
      />
    </div>
  );
}
