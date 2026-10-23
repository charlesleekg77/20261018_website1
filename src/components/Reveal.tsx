import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

const EASE = [0.16, 1, 0.3, 1] as const;

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  once?: boolean;
};

export function Reveal({ children, className, delay = 0, y = 30, once = true }: RevealProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-10% 0px -10% 0px' }}
      transition={{ duration: 0.75, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type MaskLinesProps = {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
};

/** Reveals stacked headline lines from behind a clipping mask, one after another. */
export function MaskLines({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
}: MaskLinesProps) {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <span className={className}>
      {lines.map((line, index) => (
        <span key={index} className="block overflow-hidden pb-[0.06em]">
          <motion.span
            className={`block ${lineClassName ?? ''}`}
            initial={reducedMotion ? false : { y: '115%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true, margin: '-8% 0px -8% 0px' }}
            transition={{ duration: 0.9, delay: delay + index * stagger, ease: EASE }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function SectionLabel({
  children,
  accent = 'signal',
}: {
  children: ReactNode;
  accent?: 'signal' | 'acid' | 'muted';
}) {
  const color =
    accent === 'signal' ? 'text-signal' : accent === 'acid' ? 'text-acid' : 'text-offwhite/50';
  return (
    <div className="flex items-center gap-3">
      <span className={`h-2 w-2 shrink-0 ${accent === 'acid' ? 'bg-acid' : 'bg-signal'}`} />
      <span className={`label-type ${color}`}>{children}</span>
      <span className="h-px flex-1 bg-offwhite/15" />
    </div>
  );
}
