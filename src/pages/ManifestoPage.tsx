import { Link } from 'react-router-dom';

import Manifesto from '../components/Manifesto';
import Marquee from '../components/Marquee';
import { Reveal, SectionLabel } from '../components/Reveal';
import { MARQUEE_PHRASES } from '../data/manifesto';

const EXHIBITS = [
  {
    label: 'Exhibit A',
    title: 'The averaged sentence',
    body:
      'Ask a model for a brand line and you get the midpoint of everything ever written. It is grammatical. It is confident. It has never once surprised its own author, because it has no author.',
    verdict: 'Rejected',
  },
  {
    label: 'Exhibit B',
    title: 'The invisible seam',
    body:
      'A generated layout has no history. Nobody argued about the gutter. Nobody fought for the odd number. What is missing is not polish, it is pressure, and pressure is what makes a thing feel true.',
    verdict: 'Rejected',
  },
  {
    label: 'Exhibit C',
    title: 'The refusal to be wrong',
    body:
      'A person will say "I think this is right and I will go down with it." That sentence is the entire difference. Taste is a position you can be held to, not a distribution you sample from.',
    verdict: 'Human',
  },
];

export default function ManifestoPage() {
  return (
    <>
      <header className="relative overflow-hidden border-b border-offwhite/15 bg-charcoal">
        <div aria-hidden="true" className="ink-paper absolute inset-0 opacity-40" />
        <div className="shell relative py-24 pt-36 lg:py-32 lg:pt-44">
          <SectionLabel accent="signal">Document 01 / Manifesto</SectionLabel>

          <h1 className="hero-type mt-8 max-w-[24ch] text-offwhite">
            We are not
            <br />
            against tools.
            <br />
            <span className="text-signal">We are against
            <br />
            average.</span>
          </h1>

          <div className="mt-12 grid gap-8 border-t border-offwhite/15 pt-8 lg:grid-cols-[1.1fr_1fr]">
            <p className="max-w-2xl font-serif text-xl leading-snug text-offwhite/85 sm:text-2xl">
              Death To Robots is a studio of eleven people who make things with their hands, argue about
              them in rooms, and put their names on the result. This document explains why.
            </p>
            <p className="max-w-md self-end font-mono text-sm leading-relaxed text-offwhite/55">
              Published in full, unedited, and readable without a prompt. Last revised by hand in
              March 2026.
            </p>
          </div>
        </div>
      </header>

      <Manifesto withMarquee={false} />

      <section className="border-b border-offwhite/15 bg-charcoal-2">
        <div className="shell py-20 lg:py-28">
          <SectionLabel accent="acid">Evidence</SectionLabel>
          <h2 className="section-type mt-7 max-w-3xl text-offwhite">
            Three exhibits, entered by the prosecution.
          </h2>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {EXHIBITS.map((exhibit, index) => (
              <Reveal key={exhibit.label} delay={index * 0.08} y={28} className="h-full">
                <article className="flex h-full flex-col border border-offwhite/15 bg-charcoal p-6">
                  <div className="flex items-center justify-between">
                    <span className="label-type text-offwhite/40">{exhibit.label}</span>
                    <span
                      className={`label-type border px-2 py-1 ${
                        exhibit.verdict === 'Human'
                          ? 'border-acid text-acid'
                          : 'border-signal text-signal'
                      }`}
                    >
                      {exhibit.verdict}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-2xl font-extrabold uppercase leading-none tracking-tight text-offwhite">
                    {exhibit.title}
                  </h3>

                  <p className="mt-4 font-serif text-base leading-relaxed text-offwhite/70">
                    {exhibit.body}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ink">
        <Marquee
          items={MARQUEE_PHRASES}
          durationSeconds={30}
          className="border-b border-offwhite/15 py-5"
          itemClassName="font-display text-3xl font-extrabold uppercase tracking-tight text-offwhite sm:text-5xl"
        />

        <div className="shell type-container grid gap-10 py-20 lg:grid-cols-[1.3fr_1fr] lg:py-28">
          <div className="col-fluid">
            <h2 className="hero-type-col text-offwhite">
              Imitation is the sincerest form of flattery
              <br />
              <span className="text-acid">that mediocrity can pay to greatness.</span>
            </h2>
          </div>

          <div className="flex flex-col justify-end gap-6">
            <p className="font-serif text-lg leading-relaxed text-offwhite/70">
              Said the human to the robot. And the robot was sad, for it knew that only a human could
              have written that.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/services"
                data-cursor-label="NEXT"
                className="label-type border border-acid bg-acid px-6 py-4 text-ink transition-colors hover:border-signal hover:bg-signal"
              >
                Read the capabilities
              </Link>
              <Link
                to="/works"
                data-cursor-label="WORKS"
                className="label-type border border-offwhite/25 px-6 py-4 text-offwhite transition-colors hover:border-offwhite hover:bg-offwhite hover:text-ink"
              >
                See the human works
              </Link>
              <Link
                to="/contact"
                data-cursor-label="JOIN"
                className="label-type border border-offwhite/25 px-6 py-4 text-offwhite transition-colors hover:border-offwhite hover:bg-offwhite hover:text-ink"
              >
                Sign the pledge
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
