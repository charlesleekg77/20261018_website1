import { Link } from 'react-router-dom';

import Marquee from './Marquee';
import { NAV_ITEMS } from './Navbar';

const FOOTER_PHRASES = [
  'DEATH TO ROBOTS',
  'LONG LIVE HUMAN CREATIVITY',
  'NO SYNTHETIC CONTENT',
  'REAL HUMAN CRAFT',
];

export default function Footer() {
  return (
    <footer className="relative border-t border-offwhite/15 bg-ink">
      <Marquee
        items={FOOTER_PHRASES}
        durationSeconds={38}
        reverse
        className="border-b border-offwhite/15 py-4"
        itemClassName="font-display text-2xl font-extrabold uppercase tracking-tight text-offwhite/85 sm:text-4xl"
      />

      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] [&>*]:min-w-0">
        <div>
          <h2 className="section-type max-w-md text-offwhite">
            Let&apos;s make something a machine couldn&apos;t.
          </h2>
          <p className="mt-6 max-w-sm font-mono text-sm leading-relaxed text-offwhite/60">
            We take on four to six projects a year. If your brief needs a point of view rather than a
            template, write to us like a person.
          </p>
          <a
            href="mailto:hello@deathtorobots.example"
            data-cursor-label="EMAIL US"
            className="mt-6 inline-block border-b-2 border-acid pb-1 font-mono text-base text-acid transition-colors hover:border-signal hover:text-signal"
          >
            hello@deathtorobots.example
          </a>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3">
          <span className="label-type text-offwhite/40">Index</span>
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              to={item.route}
              className="label-type w-fit text-offwhite/75 transition-colors hover:text-acid"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <span className="label-type text-offwhite/40">Studio</span>
          <span className="label-type text-offwhite/75">Rotterdam &mdash; Leeds</span>
          <span className="label-type text-offwhite/75">Mon&ndash;Thu, 09:00&ndash;18:00 CET</span>
          <span className="label-type text-offwhite/75">Handwritten replies only</span>
          <span className="label-type mt-2 border border-acid/40 px-2 py-1 text-acid">
            Est. 2019 &mdash; still no robots
          </span>
        </div>
      </div>

      <div className="shell flex flex-col gap-3 border-t border-offwhite/10 py-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="label-type text-offwhite/40">
          &copy; {new Date().getFullYear()} Death To Robots. All rights reserved.
        </span>
        <span className="label-type text-offwhite/40">
          Built by hand. Every line reviewed by a human.
        </span>
      </div>
    </footer>
  );
}
