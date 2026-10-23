import { motion } from 'framer-motion';

import { MANIFESTO_POINTS, MARQUEE_PHRASES } from '../data/manifesto';
import Marquee from './Marquee';
import { Reveal, SectionLabel } from './Reveal';

const TONE: Record<string, string> = {
  signal: 'text-signal',
  acid: 'text-acid',
  plain: 'text-offwhite',
};

export default function Manifesto({ withMarquee = true }: { withMarquee?: boolean }) {
  return (
    <section id="manifesto" className="relative border-b border-offwhite/15 bg-charcoal">
      {withMarquee && (
        <Marquee
          items={MARQUEE_PHRASES}
          durationSeconds={42}
          reverse
          outline
          className="border-b border-offwhite/15 py-5"
          itemClassName="font-display text-3xl font-extrabold uppercase tracking-tight text-offwhite/70 sm:text-6xl"
        />
      )}

      <div className="shell grid gap-14 py-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20 lg:py-28 [&>*]:min-w-0">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionLabel accent="signal">The manifesto</SectionLabel>

          <h2 className="section-type mt-7 text-offwhite">
            An editorial
            <br />
            wall of text,
            <br />
            <span className="text-stroke text-signal">nail it up.</span>
          </h2>

          <p className="mt-7 max-w-md font-serif text-lg leading-relaxed text-offwhite/70">
            Six positions we will not trade away. We wrote them down so you can hold us to them, and so
            you can tell whether we are the studio you want in the room.
          </p>

          <div className="mt-9 border border-offwhite/15 bg-ink/60 p-5">
            <p className="label-type text-acid">Signed by hand</p>
            <p className="mt-3 font-mono text-sm leading-relaxed text-offwhite/60">
              Eleven humans. Zero models. If a machine helped make it, we tell you before you ask.
            </p>
          </div>
        </div>

        <ol className="flex flex-col">
          {MANIFESTO_POINTS.map((point, index) => (
            <li key={point.index} className="group border-t border-offwhite/15 last:border-b">
              <Reveal delay={index * 0.04} y={22}>
                <div className="grid gap-5 py-9 sm:grid-cols-[auto_1fr] sm:gap-8">
                  <div className="flex items-start gap-4 sm:flex-col sm:items-start sm:gap-3">
                    <span
                      className={`font-display text-4xl font-extrabold leading-none tracking-tight sm:text-5xl ${
                        TONE[point.tone]
                      }`}
                    >
                      {point.index}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`hidden h-px w-10 transition-all duration-500 sm:block ${
                        point.tone === 'acid' ? 'bg-acid' : 'bg-signal'
                      } group-hover:w-20`}
                    />
                  </div>

                  <div>
                    <h3
                      className={`font-display text-2xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-4xl ${
                        TONE[point.tone]
                      }`}
                    >
                      {point.claim}
                    </h3>
                    <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-offwhite/75 sm:text-lg">
                      {point.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>

      <motion.div
        aria-hidden="true"
        className="h-px w-full origin-left bg-gradient-to-r from-signal via-acid to-transparent"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </section>
  );
}
