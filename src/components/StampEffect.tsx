import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useCallback, useRef, useState, type ReactNode } from 'react';

import { useFinePointer, usePrefersReducedMotion } from '../hooks/useMediaQuery';
import HumanSeal from './HumanSeal';

type Stamp = {
  id: number;
  x: number;
  y: number;
  rotate: number;
  label: string;
  sub: string;
};

type Props = {
  children: ReactNode;
  className?: string;
  sealLabel?: string;
  sealSub?: string;
  accent?: 'signal' | 'acid';
  /** Render a translucent seal that trails the pointer before stamping. */
  follow?: boolean;
  onStamped?: () => void;
};

const SEAL_CLASS =
  'w-[8.5rem] sm:w-[10.5rem] h-auto [filter:contrast(1.15)_saturate(1.1)]';

/**
 * Stamps an "APPROVED BY HUMANS" seal wherever the user presses. Each stamp
 * jitters, overshoots and fades like wet ink, and is torn down afterwards so the
 * DOM never accumulates nodes.
 */
export default function StampEffect({
  children,
  className = '',
  sealLabel = 'APPROVED BY HUMANS',
  sealSub = 'NO AI',
  accent = 'acid',
  follow = true,
  onStamped,
}: Props) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const [stamps, setStamps] = useState<Stamp[]>([]);

  const reducedMotion = usePrefersReducedMotion();
  const finePointer = useFinePointer();
  const showFollow = follow && finePointer && !reducedMotion;

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const followX = useSpring(pointerX, { stiffness: 420, damping: 32, mass: 0.35 });
  const followY = useSpring(pointerY, { stiffness: 420, damping: 32, mass: 0.35 });
  const [hovering, setHovering] = useState(false);

  const localPoint = (clientX: number, clientY: number) => {
    const rect = surfaceRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const remove = useCallback((id: number) => {
    setStamps((current) => current.filter((stamp) => stamp.id !== id));
  }, []);

  const stampAt = (clientX: number, clientY: number) => {
    const { x, y } = localPoint(clientX, clientY);
    const id = nextId.current++;
    const rotate = Math.round((Math.random() - 0.5) * 34);
    setStamps((current) => [...current.slice(-5), { id, x, y, rotate, label: sealLabel, sub: sealSub }]);
    onStamped?.();
  };

  const accentText = accent === 'acid' ? 'text-acid' : 'text-signal';

  return (
    <div
      ref={surfaceRef}
      className={`relative isolate ${className}`}
      onPointerDown={(event) => {
        if (event.button !== 0) return;
        stampAt(event.clientX, event.clientY);
      }}
      onPointerMove={(event) => {
        if (!showFollow) return;
        const { x, y } = localPoint(event.clientX, event.clientY);
        pointerX.set(x);
        pointerY.set(y);
      }}
      onPointerEnter={() => setHovering(true)}
      onPointerLeave={() => setHovering(false)}
    >
      {children}

      {showFollow && (
        <motion.div
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 top-0 z-30 ${accentText}`}
          style={{ x: followX, y: followY, translateX: '-50%', translateY: '-50%' }}
          animate={{ opacity: hovering ? 0.22 : 0, scale: hovering ? 1 : 0.85 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <HumanSeal className={SEAL_CLASS} label={sealLabel} sub={sealSub} />
        </motion.div>
      )}

      <div className="pointer-events-none absolute inset-0 z-40 overflow-hidden">
        <AnimatePresence>
          {stamps.map((stamp) => (
            <div key={stamp.id} className="absolute" style={{ left: stamp.x, top: stamp.y }}>
              <motion.span
                aria-hidden="true"
                className={`absolute left-0 top-0 block h-24 w-24 rounded-full border-2 ${
                  accent === 'acid' ? 'border-acid' : 'border-signal'
                }`}
                style={{ translateX: '-50%', translateY: '-50%' }}
                initial={{ scale: 0.2, opacity: 0.85 }}
                animate={{ scale: 2.6, opacity: 0 }}
                transition={{ duration: 0.75, ease: 'easeOut' }}
              />
              <motion.div
                className={`absolute left-0 top-0 ${accentText}`}
                style={{ translateX: '-50%', translateY: '-50%' }}
                initial={{ scale: 3.4, opacity: 0, rotate: stamp.rotate + 22 }}
                animate={{
                  scale: [3.4, 1, 1, 1.06],
                  opacity: [0, 1, 1, 0],
                  rotate: [stamp.rotate + 22, stamp.rotate, stamp.rotate, stamp.rotate + 5],
                }}
                transition={{ duration: 1.05, times: [0, 0.14, 0.72, 1], ease: 'easeOut' }}
                onAnimationComplete={() => remove(stamp.id)}
              >
                <HumanSeal className={SEAL_CLASS} label={stamp.label} sub={stamp.sub} />
              </motion.div>
            </div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
