import type { Work } from '../data/works';
import { useFinePointer } from '../hooks/useMediaQuery';
import WorkArt from './WorkArt';

const SHELL: Record<Work['tone'], string> = {
  paper: 'bg-paper text-ink',
  charcoal: 'bg-charcoal-2 text-offwhite',
  signal: 'bg-signal text-ink',
  acid: 'bg-acid text-ink',
};

// Dark cards cast an acid shadow, light cards cast an ink shadow. Either way it
// is a hard offset, not a blur, because blur is for people who cannot commit.
const SHADOW: Record<Work['tone'], string> = {
  paper: 'hover:shadow-[8px_8px_0_0_var(--color-ink)]',
  charcoal: 'hover:shadow-[8px_8px_0_0_var(--color-acid)]',
  signal: 'hover:shadow-[8px_8px_0_0_var(--color-ink)]',
  acid: 'hover:shadow-[8px_8px_0_0_var(--color-ink)]',
};

export default function WorkCard({ work, index }: { work: Work; index: number }) {
  const finePointer = useFinePointer();

  return (
    <article
      data-cursor-label="VIEW"
      className={`group relative flex h-full flex-col border border-offwhite/15 transition-all duration-500 hover:-translate-y-1.5 ${SHELL[work.tone]} ${SHADOW[work.tone]}`}
    >
      <div className="relative aspect-4/3 overflow-hidden border-b border-current/15">
        <WorkArt
          work={work}
          className="absolute inset-0 h-full w-full transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />

        {/* Desaturating veil lifts on hover so colour returns to the artwork. */}
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-ink transition-opacity duration-700 ${
            finePointer ? 'opacity-100 group-hover:opacity-0' : 'opacity-0'
          }`}
          style={{ mixBlendMode: 'saturation' }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-0 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-60"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='c'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23c)'/%3E%3C/svg%3E\")",
          }}
        />

        <span className="label-type absolute left-4 top-4 border border-offwhite/30 bg-ink/70 px-2 py-1 text-offwhite">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="label-type absolute right-4 top-4 text-current/70">{work.year}</span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5 sm:p-6">
        <h3 className="font-display text-2xl font-extrabold uppercase leading-none tracking-tight sm:text-3xl">
          {work.title}
        </h3>

        <p className="label-type text-current/55">{work.discipline}</p>
        <p className="font-mono text-xs leading-relaxed text-current/70">{work.client}</p>
        <p className="mt-1 font-serif text-base leading-relaxed text-current/85">{work.blurb}</p>

        <span className="label-type mt-auto flex items-center gap-2 pt-4 text-current">
          View project
          <span
            aria-hidden="true"
            className="inline-block transition-transform duration-300 group-hover:translate-x-1.5"
          >
            &rarr;
          </span>
        </span>
      </div>
    </article>
  );
}
