import { useState } from 'react';
import { Link } from 'react-router-dom';

import Marquee from '../components/Marquee';
import { Reveal, SectionLabel } from '../components/Reveal';
import StampEffect from '../components/StampEffect';
import { CAPABILITIES, COMPARISON, PROCESS } from '../data/services';

const TICKER = [
  'NO AI SITE BUILDERS',
  'HAND-WRITTEN FRONT-END',
  'SENIOR HUMANS ONLY',
  'NO SYNTHETIC CONTENT',
];

export default function ServicesPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      <header className="relative overflow-hidden border-b border-offwhite/15 bg-charcoal">
        <div aria-hidden="true" className="ink-paper absolute inset-0 opacity-40" />
        <div className="shell relative py-24 pt-36 lg:py-32 lg:pt-44">
          <SectionLabel accent="acid">Document 02 / Services</SectionLabel>

          <h1 className="hero-type mt-8 max-w-[24ch] text-offwhite">
            Human hands.
            <br />
            <span className="text-acid">Real code.</span>
            <br />
            No builders.
          </h1>

          <div className="mt-12 grid gap-8 border-t border-offwhite/15 pt-8 lg:grid-cols-[1.1fr_1fr]">
            <p className="max-w-2xl font-serif text-xl leading-snug text-offwhite/85 sm:text-2xl">
              Four capabilities, each led by a senior human who will be in the room for the whole
              project. No account layer, no handoff to a junior, no page builder.
            </p>
            <p className="max-w-md self-end font-mono text-sm leading-relaxed text-offwhite/55">
              Fixed-scope engagements or monthly retainers. We quote in weeks, not in sprints, because
              we have never met a sprint that survived contact with a real idea.
            </p>
          </div>
        </div>
      </header>

      <section className="border-b border-offwhite/15 bg-charcoal-2">
        <div className="shell py-20 lg:py-28">
          <SectionLabel accent="signal">Capabilities grid</SectionLabel>

          <div className="mt-12 grid gap-6 lg:grid-cols-2 [&>*]:min-w-0">
            {CAPABILITIES.map((capability, index) => {
              const open = openIndex === index;
              return (
                <Reveal key={capability.index} delay={(index % 2) * 0.08} y={26} className="h-full">
                  <article className="flex h-full flex-col border border-offwhite/15 bg-charcoal">
                    <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3 border-b border-offwhite/15 p-6">
                      <div className="flex min-w-0 flex-1 basis-full items-baseline gap-4 sm:basis-auto">
                        <span className="font-display text-4xl font-extrabold leading-none tracking-tight text-signal">
                          {capability.index}
                        </span>
                        <h2 className="min-w-0 font-display text-2xl font-extrabold uppercase leading-none tracking-tight text-offwhite sm:text-3xl">
                          {capability.title}
                        </h2>
                      </div>
                      <span className="label-type shrink-0 border border-offwhite/20 px-2 py-1 text-offwhite/60">
                        {capability.lead}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-6">
                      <p className="font-serif text-base leading-relaxed text-offwhite/75 sm:text-lg">
                        {capability.summary}
                      </p>

                      <button
                        type="button"
                        onClick={() => setOpenIndex(open ? null : index)}
                        aria-expanded={open}
                        data-cursor-label={open ? 'HIDE' : 'SHOW'}
                        className="label-type mt-6 flex w-fit items-center gap-2 border-b border-acid/50 pb-1 text-acid transition-colors hover:border-acid hover:text-offwhite"
                      >
                        {open ? 'Hide deliverables' : 'Show deliverables'}
                        <span
                          aria-hidden="true"
                          className={`inline-block transition-transform duration-300 ${
                            open ? 'rotate-45' : ''
                          }`}
                        >
                          +
                        </span>
                      </button>

                      <div
                        className={`grid transition-all duration-500 ease-out ${
                          open ? 'mt-5 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <ul className="flex flex-col gap-2 overflow-hidden">
                          {capability.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-baseline gap-3 border-t border-offwhite/10 pt-2 font-mono text-sm text-offwhite/70"
                            >
                              <span aria-hidden="true" className="text-signal">
                                &mdash;
                              </span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-offwhite/15 bg-charcoal">
        <div className="shell py-20 lg:py-28">
          <SectionLabel accent="acid">The comparison</SectionLabel>

          <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_1fr]">
            <h2 className="section-type text-offwhite">
              Generic AI output
              <br />
              <span className="text-signal">vs.</span>
              <br />
              <span className="text-acid">human craft.</span>
            </h2>
            <p className="max-w-lg self-end font-serif text-lg leading-relaxed text-offwhite/70">
              A side-by-side we are happy to be judged on. If the left column describes what you
              already have, that is exactly why it is not working.
            </p>
          </div>

          <p className="label-type mt-4 text-offwhite/40 lg:hidden">
            Swipe the table sideways →
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <caption className="sr-only">
                Comparison of generic AI output and Death To Robots human craft
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="label-type w-[13rem] border border-offwhite/15 bg-ink p-4 text-offwhite/45">
                    Dimension
                  </th>
                  <th scope="col" className="label-type border border-offwhite/15 bg-ink p-4 text-signal">
                    Generic AI output
                  </th>
                  <th scope="col" className="label-type border border-offwhite/15 bg-ink p-4 text-acid">
                    Death To Robots
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row, index) => (
                  <tr key={row.dimension} className={index % 2 === 0 ? 'bg-charcoal-2/60' : ''}>
                    <th
                      scope="row"
                      className="label-type border border-offwhite/15 p-4 align-top text-offwhite/80"
                    >
                      {row.dimension}
                    </th>
                    <td className="border border-offwhite/15 p-4 align-top font-mono text-sm leading-relaxed text-offwhite/45">
                      <span className="mr-2 text-signal" aria-hidden="true">
                        &#10007;
                      </span>
                      {row.generic}
                    </td>
                    <td className="border border-offwhite/15 p-4 align-top font-serif text-base leading-relaxed text-offwhite/90">
                      <span className="mr-2 text-acid" aria-hidden="true">
                        &#10003;
                      </span>
                      {row.human}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="border-b border-offwhite/15 bg-charcoal-2">
        <div className="shell py-20 lg:py-28">
          <SectionLabel accent="signal">How we work</SectionLabel>
          <h2 className="section-type mt-7 max-w-3xl text-offwhite">
            Four steps. No black boxes.
          </h2>

          <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((step, index) => (
              <Reveal key={step.step} delay={index * 0.07} y={24} className="h-full">
                <li className="flex h-full flex-col border-t-2 border-signal bg-charcoal p-6">
                  <span className="font-mono text-sm text-signal">{step.step}</span>
                  <span className="mt-4 font-display text-2xl font-extrabold uppercase tracking-tight text-offwhite">
                    {step.title}
                  </span>
                  <span className="mt-3 font-serif text-base leading-relaxed text-offwhite/70">
                    {step.body}
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-ink">
        <Marquee
          items={TICKER}
          durationSeconds={28}
          reverse
          className="border-b border-offwhite/15 py-4"
          itemClassName="font-display text-2xl font-extrabold uppercase tracking-tight text-acid sm:text-4xl"
        />

        <StampEffect className="relative" accent="acid" sealLabel="HUMAN MADE" sealSub="BY HAND">
          <div data-cursor-stamp="STAMP IT" className="shell type-container grid gap-10 py-20 lg:grid-cols-[1.2fr_1fr] lg:py-28">
            <h2 className="hero-type-col col-fluid text-offwhite">
              Pick a capability.
              <br />
              <span className="text-acid">Then hold us to it.</span>
            </h2>

            <div className="flex flex-col justify-end gap-6">
              <p className="font-serif text-lg leading-relaxed text-offwhite/70">
                Tell us the deadline, the budget and the thing you are afraid to say out loud. We will
                tell you honestly whether we can make it better than a machine can.
              </p>
              <Link
                to="/contact"
                data-cursor-label="START"
                className="label-type w-fit border border-acid bg-acid px-6 py-4 text-ink transition-colors hover:border-signal hover:bg-signal"
              >
                Start the pledge form
              </Link>
            </div>
          </div>
        </StampEffect>
      </section>
    </>
  );
}
