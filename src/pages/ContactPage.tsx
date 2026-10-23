import { motion, useAnimationControls } from 'framer-motion';
import { useId, useRef, useState, type FormEvent } from 'react';

import HumanSeal from '../components/HumanSeal';
import Marquee from '../components/Marquee';
import { Reveal, SectionLabel } from '../components/Reveal';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

const TICKER = [
  'NO AI GENERATION',
  'REAL HUMAN CRAFT',
  'SIGNED BY HAND',
  'NO SYNTHETIC CONTENT',
];

const PROJECT_TYPES = [
  'Brand strategy',
  'Website build',
  'Creative direction',
  'Copywriting',
  'Experimental interactive',
  'Something else entirely',
];

const BUDGETS = [
  'Under \u20AC10k',
  '\u20AC10k \u2013 \u20AC25k',
  '\u20AC25k \u2013 \u20AC60k',
  '\u20AC60k \u2013 \u20AC120k',
  '\u20AC120k+',
  'Not sure yet',
];

type Values = {
  name: string;
  email: string;
  projectType: string;
  budget: string;
  brief: string;
  pledge: boolean;
};

type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = {
  name: '',
  email: '',
  projectType: '',
  budget: '',
  brief: '',
  pledge: false,
};

const FIELD_CLASS =
  'w-full border border-offwhite/20 bg-ink px-4 py-3 font-mono text-sm text-offwhite placeholder:text-offwhite/30 transition-colors focus:border-acid focus:outline-none';
const LABEL_CLASS = 'label-type text-offwhite/45';

export default function ContactPage() {
  const formId = useId();
  const reducedMotion = usePrefersReducedMotion();
  const sealControls = useAnimationControls();

  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'signed'>('idle');
  const [reference, setReference] = useState('');
  const summaryRef = useRef<HTMLDivElement>(null);

  const update = <K extends keyof Values>(key: K, value: Values[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = (candidate: Values): Errors => {
    const next: Errors = {};
    if (candidate.name.trim().length < 2) next.name = 'We need a name to address you by.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(candidate.email.trim()))
      next.email = 'That email address will not reach you.';
    if (!candidate.projectType) next.projectType = 'Pick the closest thing.';
    if (!candidate.budget) next.budget = 'A range is enough, we will not haggle.';
    if (candidate.brief.trim().length < 20)
      next.brief = 'Twenty characters minimum. A real sentence, please.';
    if (!candidate.pledge) next.pledge = 'The pledge is the point. Please confirm it.';
    return next;
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const next = validate(values);
    setErrors(next);

    if (Object.keys(next).length > 0) {
      summaryRef.current?.focus();
      return;
    }

    setStatus('sending');
    await new Promise((resolve) => window.setTimeout(resolve, 900));

    const stamp = `${new Date().getFullYear()}-${String(
      Math.floor(Math.random() * 9000) + 1000,
    )}`;
    setReference(stamp);
    setStatus('signed');

    if (!reducedMotion) {
      void sealControls.start({
        scale: [3.2, 1, 1, 1.05],
        opacity: [0, 1, 1, 0],
        rotate: [-18, -7, -7, -3],
        transition: { duration: 1.15, times: [0, 0.16, 0.74, 1], ease: 'easeOut' },
      });
    }
  };

  const errorEntries = Object.entries(errors).filter(([, message]) => Boolean(message));
  const sending = status === 'sending';
  const signed = status === 'signed';

  return (
    <>
      <header className="relative overflow-hidden border-b border-offwhite/15 bg-charcoal">
        <div aria-hidden="true" className="ink-paper absolute inset-0 opacity-40" />
        <div className="shell relative py-24 pt-36 lg:py-32 lg:pt-44">
          <SectionLabel accent="signal">Document 04 / Contact</SectionLabel>

          <h1 className="hero-type mt-8 max-w-[24ch] text-offwhite">
            Sign here.
            <br />
            <span className="text-signal">In ink,</span>
            <br />
            not a prompt.
          </h1>

          <div className="mt-12 grid gap-8 border-t border-offwhite/15 pt-8 lg:grid-cols-[1.1fr_1fr]">
            <p className="max-w-2xl font-serif text-xl leading-snug text-offwhite/85 sm:text-2xl">
              The Human Pledge is short on purpose. It tells us you want work made by people, and it
              tells us what you are actually trying to build.
            </p>
            <p className="max-w-md self-end font-mono text-sm leading-relaxed text-offwhite/55">
              We reply within two working days, by a person, from a real inbox. No autoresponders, no
              chatbot gatekeeping the conversation.
            </p>
          </div>
        </div>
      </header>

      <section className="border-b border-offwhite/15 bg-charcoal-2">
        <div className="shell grid gap-14 py-20 lg:grid-cols-[1.35fr_1fr] lg:gap-20 lg:py-28">
          <div>
            <SectionLabel accent="acid">The Human Pledge form</SectionLabel>

            {signed ? (
              <motion.div
                initial={reducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative mt-10 overflow-hidden border-2 border-acid bg-charcoal p-8 sm:p-10"
              >
                <motion.div
                  aria-hidden="true"
                  className="pointer-events-none absolute right-6 top-6 w-32 text-acid sm:w-40"
                  initial={{ scale: 3.2, opacity: 0, rotate: -18 }}
                  animate={sealControls}
                >
                  <HumanSeal className="h-auto w-full" label="APPROVED BY HUMANS" sub="SIGNED" />
                </motion.div>

                <p className="label-type text-acid">Pledge received</p>
                <h2 className="mt-5 max-w-lg font-display text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-offwhite sm:text-5xl">
                  Welcome to the human side, {values.name.split(' ')[0]}.
                </h2>
                <p className="mt-5 max-w-lg font-serif text-lg leading-relaxed text-offwhite/75">
                  Your pledge is logged as reference <span className="text-acid">{reference}</span>. A
                  person will read it and reply within two working days. Nothing about your brief was
                  summarised by a machine.
                </p>

                <dl className="mt-8 grid gap-4 border-t border-offwhite/15 pt-6 sm:grid-cols-2">
                  {[
                    { k: 'Project type', v: values.projectType },
                    { k: 'Budget range', v: values.budget },
                    { k: 'Email', v: values.email },
                    { k: 'Reference', v: reference },
                  ].map((row) => (
                    <div key={row.k}>
                      <dt className="label-type text-offwhite/40">{row.k}</dt>
                      <dd className="mt-1 font-mono text-sm text-offwhite/85">{row.v}</dd>
                    </div>
                  ))}
                </dl>

                <button
                  type="button"
                  onClick={() => {
                    setValues(EMPTY);
                    setStatus('idle');
                    setReference('');
                  }}
                  data-cursor-label="RESET"
                  className="label-type mt-8 border border-offwhite/25 px-5 py-3 text-offwhite transition-colors hover:border-acid hover:bg-acid hover:text-ink"
                >
                  Submit another pledge
                </button>
              </motion.div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="mt-10">
                <div
                  ref={summaryRef}
                  tabIndex={-1}
                  aria-live="polite"
                  className={errorEntries.length > 0 ? 'mb-8 border border-signal bg-signal/10 p-5' : 'sr-only'}
                >
                  {errorEntries.length > 0 && (
                    <>
                      <p className="label-type text-signal">
                        {errorEntries.length} field{errorEntries.length > 1 ? 's' : ''} need attention
                      </p>
                      <ul className="mt-3 flex flex-col gap-1.5">
                        {errorEntries.map(([field, message]) => (
                          <li key={field} className="font-mono text-sm text-offwhite/80">
                            <a href={`#${formId}-${field}`} className="underline decoration-signal">
                              {message}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label htmlFor={`${formId}-name`} className={LABEL_CLASS}>
                      Name *
                    </label>
                    <input
                      id={`${formId}-name`}
                      name="name"
                      autoComplete="name"
                      value={values.name}
                      onChange={(event) => update('name', event.target.value)}
                      aria-invalid={Boolean(errors.name)}
                      placeholder="Alex Mercer"
                      className={FIELD_CLASS}
                    />
                    {errors.name && <p className="font-mono text-xs text-signal">{errors.name}</p>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor={`${formId}-email`} className={LABEL_CLASS}>
                      Email *
                    </label>
                    <input
                      id={`${formId}-email`}
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={(event) => update('email', event.target.value)}
                      aria-invalid={Boolean(errors.email)}
                      placeholder="alex@company.com"
                      className={FIELD_CLASS}
                    />
                    {errors.email && <p className="font-mono text-xs text-signal">{errors.email}</p>}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor={`${formId}-projectType`} className={LABEL_CLASS}>
                      Project type *
                    </label>
                    <select
                      id={`${formId}-projectType`}
                      name="projectType"
                      value={values.projectType}
                      onChange={(event) => update('projectType', event.target.value)}
                      aria-invalid={Boolean(errors.projectType)}
                      className={FIELD_CLASS}
                    >
                      <option value="">Select one&hellip;</option>
                      {PROJECT_TYPES.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                    {errors.projectType && (
                      <p className="font-mono text-xs text-signal">{errors.projectType}</p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor={`${formId}-budget`} className={LABEL_CLASS}>
                      Budget range *
                    </label>
                    <select
                      id={`${formId}-budget`}
                      name="budget"
                      value={values.budget}
                      onChange={(event) => update('budget', event.target.value)}
                      aria-invalid={Boolean(errors.budget)}
                      className={FIELD_CLASS}
                    >
                      <option value="">Select a range&hellip;</option>
                      {BUDGETS.map((band) => (
                        <option key={band} value={band}>
                          {band}
                        </option>
                      ))}
                    </select>
                    {errors.budget && <p className="font-mono text-xs text-signal">{errors.budget}</p>}
                  </div>

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label htmlFor={`${formId}-brief`} className={LABEL_CLASS}>
                      What are you making? *
                    </label>
                    <textarea
                      id={`${formId}-brief`}
                      name="brief"
                      rows={5}
                      value={values.brief}
                      onChange={(event) => update('brief', event.target.value)}
                      aria-invalid={Boolean(errors.brief)}
                      placeholder="The problem, the audience, the deadline, and the thing you are afraid to say out loud."
                      className={`${FIELD_CLASS} resize-y`}
                    />
                    {errors.brief && <p className="font-mono text-xs text-signal">{errors.brief}</p>}
                  </div>
                </div>

                <div className="mt-8">
                  <label
                    htmlFor={`${formId}-pledge`}
                    className={`flex cursor-pointer items-start gap-4 border p-5 transition-colors ${
                      errors.pledge
                        ? 'border-signal bg-signal/5'
                        : values.pledge
                          ? 'border-acid bg-acid/5'
                          : 'border-offwhite/20 hover:border-offwhite/40'
                    }`}
                  >
                    <input
                      id={`${formId}-pledge`}
                      name="pledge"
                      type="checkbox"
                      checked={values.pledge}
                      onChange={(event) => update('pledge', event.target.checked)}
                      className="peer sr-only"
                    />
                    <span
                      aria-hidden="true"
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 font-mono text-xs font-bold transition-colors ${
                        values.pledge
                          ? 'border-acid bg-acid text-ink'
                          : 'border-offwhite/40 text-transparent'
                      }`}
                    >
                      x
                    </span>
                    <span className="font-mono text-sm leading-relaxed text-offwhite/85">
                      I confirm I want 100% human-crafted creative work.
                      <span className="mt-2 block text-offwhite/50">
                        No generated copy, no synthetic imagery, no AI page builder. A person will make
                        this, and a person will be accountable for it.
                      </span>
                    </span>
                  </label>
                  {errors.pledge && (
                    <p className="mt-2 font-mono text-xs text-signal">{errors.pledge}</p>
                  )}
                </div>

                <div className="mt-10 flex flex-wrap items-center gap-5">
                  <button
                    type="submit"
                    disabled={sending}
                    data-cursor-label={sending ? 'SENDING' : 'STAMP IT'}
                    className="label-type group relative overflow-hidden border-2 border-signal bg-signal px-8 py-4 text-ink transition-colors hover:border-acid hover:bg-acid disabled:cursor-wait disabled:opacity-70"
                  >
                    {sending ? 'Stamping your pledge\u2026' : 'Sign and stamp the pledge'}
                  </button>

                  <span className="label-type text-offwhite/40">
                    {sending ? 'Handling your details by hand' : 'Takes about ninety seconds'}
                  </span>
                </div>
              </form>
            )}
          </div>

          <aside className="flex flex-col gap-8">
            <Reveal y={24}>
              <div className="border border-offwhite/15 bg-charcoal p-6">
                <p className="label-type text-acid">What happens next</p>
                <ol className="mt-5 flex flex-col gap-5">
                  {[
                    { s: '01', t: 'A human reads it', d: 'Usually within a few hours, never a bot.' },
                    { s: '02', t: 'We reply honestly', d: 'Including when the answer is no.' },
                    { s: '03', t: 'We talk properly', d: 'Forty-five minutes, no deck, no slides.' },
                    { s: '04', t: 'We send a plan', d: 'Scope, weeks and a fixed price.' },
                  ].map((step) => (
                    <li key={step.s} className="flex gap-4 border-t border-offwhite/10 pt-4 first:border-0 first:pt-0">
                      <span className="font-mono text-sm text-signal">{step.s}</span>
                      <span>
                        <span className="block font-display text-lg font-extrabold uppercase tracking-tight text-offwhite">
                          {step.t}
                        </span>
                        <span className="mt-1 block font-serif text-sm leading-relaxed text-offwhite/65">
                          {step.d}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal y={24} delay={0.08}>
              <div className="border border-offwhite/15 bg-charcoal p-6">
                <p className="label-type text-offwhite/45">Direct lines</p>
                <a
                  href="mailto:hello@deathtorobots.example"
                  data-cursor-label="EMAIL"
                  className="mt-4 block border-b border-offwhite/20 pb-2 font-mono text-sm text-offwhite transition-colors hover:border-acid hover:text-acid"
                >
                  hello@deathtorobots.example
                </a>
                <a
                  href="tel:+3110000000"
                  data-cursor-label="CALL"
                  className="mt-4 block border-b border-offwhite/20 pb-2 font-mono text-sm text-offwhite transition-colors hover:border-acid hover:text-acid"
                >
                  +31 10 000 000
                </a>
                <p className="mt-5 font-mono text-xs leading-relaxed text-offwhite/50">
                  Studio hours Mon&ndash;Thu, 09:00&ndash;18:00 CET. Voicemail is checked by a person,
                  not transcribed by a model.
                </p>
              </div>
            </Reveal>

            <Reveal y={24} delay={0.16}>
              <div className="border border-acid/40 bg-acid/5 p-6">
                <p className="label-type text-acid">Not a fit?</p>
                <p className="mt-4 font-serif text-base leading-relaxed text-offwhite/75">
                  If you need something generated at volume, we are the wrong studio and we will tell
                  you so in the first reply. We would rather lose the work than fake the craft.
                </p>
              </div>
            </Reveal>
          </aside>
        </div>
      </section>

      <section className="bg-ink">
        <Marquee
          items={TICKER}
          durationSeconds={32}
          className="py-5"
          itemClassName="font-display text-2xl font-extrabold uppercase tracking-tight text-offwhite sm:text-4xl"
        />
      </section>
    </>
  );
}
