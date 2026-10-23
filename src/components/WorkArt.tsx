import type { Work } from '../data/works';

/** Abstract artwork drawn in code per project. No stock imagery anywhere. */
export default function WorkArt({ work, className = '' }: { work: Work; className?: string }) {
  const accent = work.accent;

  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      {work.art === 'orbits' && (
        <>
          {[130, 100, 70, 42, 18].map((r, i) => (
            <circle
              key={r}
              cx="200"
              cy="150"
              r={r}
              stroke={i % 2 === 0 ? accent : 'currentColor'}
              strokeWidth={i % 2 === 0 ? 6 : 2}
              strokeDasharray={i === 3 ? '10 8' : undefined}
            />
          ))}
          <line x1="30" y1="270" x2="370" y2="30" stroke={accent} strokeWidth="3" />
        </>
      )}

      {work.art === 'stack' && (
        <>
          {Array.from({ length: 7 }).map((_, i) => (
            <rect
              key={i}
              x={40 + i * 12}
              y={30 + i * 34}
              width={250 - i * 8}
              height="22"
              fill={i === 3 ? accent : 'currentColor'}
              opacity={i === 3 ? 1 : 0.32}
            />
          ))}
          <rect x="40" y="30" width="250" height="22" stroke={accent} strokeWidth="2" />
        </>
      )}

      {work.art === 'type' && (
        <>
          <text
            x="200"
            y="215"
            textAnchor="middle"
            fontSize="220"
            fontWeight="800"
            fontFamily="var(--font-display), sans-serif"
            fill="currentColor"
            opacity="0.28"
          >
            N
          </text>
          <text
            x="200"
            y="215"
            textAnchor="middle"
            fontSize="220"
            fontWeight="800"
            fontFamily="var(--font-display), sans-serif"
            stroke={accent}
            strokeWidth="2.5"
          >
            N
          </text>
          <line
            x1="20"
            y1="150"
            x2="380"
            y2="150"
            stroke={accent}
            strokeWidth="1.5"
            strokeDasharray="6 6"
          />
        </>
      )}

      {work.art === 'halftone' && (
        <>
          {Array.from({ length: 12 }).map((_, row) =>
            Array.from({ length: 16 }).map((__, col) => {
              const size = ((row * 16 + col) % 7) + 1;
              return (
                <circle
                  key={`${row}-${col}`}
                  cx={20 + col * 24}
                  cy={20 + row * 22}
                  r={size}
                  fill={(row + col) % 9 === 0 ? accent : 'currentColor'}
                  opacity={(row + col) % 9 === 0 ? 1 : 0.3}
                />
              );
            }),
          )}
        </>
      )}

      {work.art === 'grid' && (
        <>
          {Array.from({ length: 9 }).map((_, i) => (
            <line
              key={`v${i}`}
              x1={i * 50}
              y1="0"
              x2={i * 50}
              y2="300"
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.25"
            />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <line
              key={`h${i}`}
              x1="0"
              y1={i * 50}
              x2="400"
              y2={i * 50}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.25"
            />
          ))}
          <rect x="150" y="100" width="100" height="100" fill={accent} />
          <rect x="200" y="150" width="50" height="50" stroke="currentColor" strokeWidth="3" />
        </>
      )}

      {work.art === 'slash' && (
        <>
          {Array.from({ length: 8 }).map((_, i) => (
            <line
              key={i}
              x1={-40 + i * 62}
              y1="330"
              x2={70 + i * 62}
              y2="-30"
              stroke={i === 4 ? accent : 'currentColor'}
              strokeWidth={i === 4 ? 16 : 5}
              opacity={i === 4 ? 1 : 0.28}
            />
          ))}
        </>
      )}
    </svg>
  );
}
