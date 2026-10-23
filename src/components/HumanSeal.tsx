import { useId } from 'react';

type Props = {
  className?: string;
  label?: string;
  sub?: string;
};

/** Hand-drawn looking approval seal. Used as the interactive stamp artwork. */
export default function HumanSeal({ className = '', label = 'APPROVED BY HUMANS', sub = 'NO AI' }: Props) {
  const id = useId().replace(/[:]/g, '');
  const ring = `seal-ring-${id}`;

  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-label={`${label} seal`}>
      <defs>
        <path id={ring} d="M100,100 m-71,0 a71,71 0 1,1 142,0 a71,71 0 1,1 -142,0" />
      </defs>
      <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="5" />
      <circle cx="100" cy="100" r="84" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle
        cx="100"
        cy="100"
        r="78"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeDasharray="2 5"
      />
      <text
        fill="currentColor"
        fontSize="15.5"
        fontFamily="var(--font-mono), monospace"
        fontWeight="700"
        letterSpacing="2.6"
      >
        <textPath href={`#${ring}`} startOffset="0">
          {`${label} \u2022 DEATH TO ROBOTS \u2022 `}
        </textPath>
      </text>
      <text
        x="100"
        y="96"
        textAnchor="middle"
        fill="currentColor"
        fontSize="34"
        fontWeight="800"
        fontFamily="var(--font-display), sans-serif"
        letterSpacing="-1"
      >
        100%
      </text>
      <text
        x="100"
        y="120"
        textAnchor="middle"
        fill="currentColor"
        fontSize="15"
        fontWeight="700"
        fontFamily="var(--font-mono), monospace"
        letterSpacing="3"
      >
        {sub}
      </text>
      <line x1="62" y1="131" x2="138" y2="131" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
