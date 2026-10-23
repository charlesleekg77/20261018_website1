import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { SectionLabel } from '../components/Reveal';
import StampEffect from '../components/StampEffect';
import WorksGrid from '../components/WorksGrid';
import { WORKS } from '../data/works';

const ALL = 'All work';

export default function WorksPage() {
  const disciplines = useMemo(() => {
    const primary = WORKS.map((work) => work.discipline.split(' + ')[0].split(' & ')[0]);
    return [ALL, ...Array.from(new Set(primary))];
  }, []);

  const [filter, setFilter] = useState<string>(ALL);

  const visible = useMemo(
    () =>
      filter === ALL
        ? WORKS
        : WORKS.filter((work) => work.discipline.startsWith(filter)),
    [filter],
  );

  return (
    <>
      <header className="relative overflow-hidden border-b border-offwhite/15 bg-charcoal">
        <div aria-hidden="true" className="ink-paper absolute inset-0 opacity-40" />
        <div className="shell relative py-24 pt-36 lg:py-32 lg:pt-44">
          <SectionLabel accent="acid">Document 03 / Human works</SectionLabel>

          <h1 className="hero-type mt-8 max-w-[22ch] text-offwhite">
            Proof that
            <br />
            people still
            <br />
            <span className="text-acid">do this better.</span>
          </h1>

          <div className="mt-12 grid gap-8 border-t border-offwhite/15 pt-8 lg:grid-cols-[1.1fr_1fr]">
            <p className="max-w-2xl font-serif text-xl leading-snug text-offwhite/85 sm:text-2xl">
              Six projects, six arguments, zero synthetic assets. Every image here was drawn in code by
              a human, on purpose, because we could not find a photograph that told the truth.
            </p>
            <p className="max-w-md self-end font-mono text-sm leading-relaxed text-offwhite/55">
              Filter by discipline. Hover a card to lift the desaturation veil. The colour is real; the
              grey is the artificial part.
            </p>
          </div>
        </div>
      </header>

      <section className="border-b border-offwhite/15 bg-charcoal-2">
        <div className="shell py-16 lg:py-24">
          <div className="flex flex-wrap items-center gap-3">
            <span className="label-type mr-2 text-offwhite/40">Filter</span>
            {disciplines.map((discipline) => {
              const active = discipline === filter;
              return (
                <button
                  key={discipline}
                  type="button"
                  onClick={() => setFilter(discipline)}
                  aria-pressed={active}
                  data-cursor-label="FILTER"
                  className={`label-type border px-4 py-2 transition-colors ${
                    active
                      ? 'border-acid bg-acid text-ink'
                      : 'border-offwhite/20 text-offwhite/70 hover:border-offwhite/60 hover:text-offwhite'
                  }`}
                >
                  {discipline}
                </button>
              );
            })}
            <span className="label-type ml-auto text-offwhite/40">
              {String(visible.length).padStart(2, '0')} shown
            </span>
          </div>

          <div className="mt-12">
            <WorksGrid works={visible} />
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <StampEffect className="relative" accent="signal" sealLabel="APPROVED BY HUMANS" sealSub="NO AI">
          <div data-cursor-stamp="STAMP IT" className="shell type-container grid gap-10 py-20 lg:grid-cols-[1.2fr_1fr] lg:py-28">
            <h2 className="hero-type-col col-fluid text-offwhite">
              Your project
              <br />
              could be
              <br />
              <span className="text-signal">number seven.</span>
            </h2>

            <div className="flex flex-col justify-end gap-6">
              <p className="font-serif text-lg leading-relaxed text-offwhite/70">
                We take on four to six engagements a year so that every one of them gets a senior human
                for its whole life. There is room for one more this quarter.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  data-cursor-label="START"
                  className="label-type border border-signal bg-signal px-6 py-4 text-ink transition-colors hover:border-acid hover:bg-acid"
                >
                  Start a project
                </Link>
                <Link
                  to="/services"
                  data-cursor-label="SERVICES"
                  className="label-type border border-offwhite/25 px-6 py-4 text-offwhite transition-colors hover:border-offwhite hover:bg-offwhite hover:text-ink"
                >
                  What we do
                </Link>
              </div>
            </div>
          </div>
        </StampEffect>
      </section>
    </>
  );
}
