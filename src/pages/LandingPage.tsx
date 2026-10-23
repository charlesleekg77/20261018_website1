import { Link } from 'react-router-dom';

import Hero from '../components/Hero';
import Manifesto from '../components/Manifesto';
import Marquee from '../components/Marquee';
import { Reveal, SectionLabel } from '../components/Reveal';
import StampEffect from '../components/StampEffect';
import WorksGrid from '../components/WorksGrid';
import { PROCESS } from '../data/services';
import { WORKS } from '../data/works';

const TICKER = [
  'NO SYNTHETIC CONTENT',
  'REAL HUMAN CRAFT',
  'HANDCRAFTED CODE',
  'NO AI GENERATION',
];

const featured = WORKS.filter((work) => work.featured);

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Manifesto />

      <section id="works" className="relative border-b border-offwhite/15 bg-charcoal-2">
        <div className="shell py-20 lg:py-28">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <SectionLabel accent="acid">Selected human works</SectionLabel>
              <h2 className="section-type mt-7 text-offwhite">
                Made by people
                <br />
                who can explain
                <br />
                <span className="text-signal">every decision.</span>
              </h2>
            </div>

            <div className="flex flex-col gap-5 lg:max-w-sm lg:items-end">
              <p className="font-serif text-lg leading-relaxed text-offwhite/70 lg:text-right">
                Six recent projects. Hover to strip the grey back off and let the colour through, the
                way a print proof does under a lamp.
              </p>
              <Link
                to="/works"
                data-cursor-label="ALL WORK"
                className="label-type w-fit border border-offwhite/25 px-5 py-3 text-offwhite transition-colors hover:border-acid hover:bg-acid hover:text-ink"
              >
                All human works
              </Link>
            </div>
          </div>

          <div className="mt-14">
            <WorksGrid works={featured} />
          </div>

          <div className="mt-10 grid gap-6 border-t border-offwhite/15 pt-10 sm:grid-cols-3">
            {[
              { k: 'Avg. project length', v: '9 weeks' },
              { k: 'Words written by hand', v: '1.2M' },
              { k: 'AI-generated assets', v: 'None' },
            ].map((stat) => (
              <div key={stat.k}>
                <p className="label-type text-offwhite/40">{stat.k}</p>
                <p className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-offwhite sm:text-4xl">
                  {stat.v}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="relative border-b border-offwhite/15 bg-charcoal">
        <div className="shell py-20 lg:py-28">
          <SectionLabel accent="signal">Human craft</SectionLabel>

          <div className="mt-7 grid gap-10 lg:grid-cols-[1fr_1fr]">
            <h2 className="section-type text-offwhite">
              Four things
              <br />
              we do by hand,
              <br />
              <span className="text-acid">properly.</span>
            </h2>
            <p className="max-w-lg self-end font-serif text-lg leading-relaxed text-offwhite/70">
              We are deliberately narrow. Strategy, code, direction and the strange interactive work
              nobody else wants to build. Everything else we refer to people we trust.
            </p>
          </div>

          <ol className="mt-14 border-t border-offwhite/15">
            {PROCESS.map((step, index) => (
              <Reveal key={step.step} delay={index * 0.05} y={20}>
                <li className="grid gap-4 border-b border-offwhite/15 py-8 sm:grid-cols-[5rem_14rem_1fr] sm:items-baseline sm:gap-8">
                  <span className="font-mono text-sm text-signal">{step.step}</span>
                  <span className="font-display text-2xl font-extrabold uppercase tracking-tight text-offwhite sm:text-3xl">
                    {step.title}
                  </span>
                  <span className="font-serif text-base leading-relaxed text-offwhite/70">
                    {step.body}
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>

          <Link
            to="/services"
            data-cursor-label="SERVICES"
            className="label-type mt-10 inline-block border border-signal bg-signal px-6 py-4 text-ink transition-colors hover:border-acid hover:bg-acid"
          >
            Capabilities and comparison table
          </Link>
        </div>
      </section>

      <section id="contact" className="relative bg-ink">
        <Marquee
          items={TICKER}
          durationSeconds={24}
          className="border-b border-offwhite/15 py-4"
          itemClassName="font-display text-2xl font-extrabold uppercase tracking-tight text-acid sm:text-4xl"
        />

        <StampEffect className="relative" accent="signal" sealLabel="APPROVED BY HUMANS" sealSub="SIGNED">
          <div className="shell type-container grid gap-10 py-20 lg:grid-cols-[1.2fr_1fr] lg:py-28">
            <div data-cursor-stamp="STAMP IT" className="col-fluid max-w-3xl">
              <SectionLabel accent="signal">Contact / join</SectionLabel>
              <h2 className="hero-type-col mt-7 text-offwhite">
                Bring us
                <br />
                something
                <br />
                <span className="text-signal">worth making.</span>
              </h2>
            </div>

            <div className="flex flex-col justify-end gap-6">
              <p className="font-serif text-lg leading-relaxed text-offwhite/70">
                Tell us what you are trying to say and who needs to hear it. If we are not the right
                humans for it, we will say so and point you at someone who is.
              </p>

              <Link
                to="/contact"
                data-cursor-label="PLEDGE"
                className="label-type w-fit border border-acid bg-acid px-6 py-4 text-ink transition-colors hover:border-signal hover:bg-signal"
              >
                Sign the human pledge
              </Link>

              <div className="flex flex-col gap-2 border-t border-offwhite/15 pt-6">
                <span className="label-type text-offwhite/40">Or write to us directly</span>
                <a
                  href="mailto:hello@deathtorobots.example"
                  data-cursor-label="EMAIL"
                  className="font-mono text-base text-offwhite transition-colors hover:text-acid"
                >
                  hello@deathtorobots.example
                </a>
              </div>

              <p className="label-type text-offwhite/35">
                Click the background to stamp it. It is the only automation on this site.
              </p>
            </div>
          </div>
        </StampEffect>
      </section>
    </>
  );
}
