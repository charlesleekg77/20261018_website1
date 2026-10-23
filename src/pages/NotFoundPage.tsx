import { Link } from 'react-router-dom';

import Marquee from '../components/Marquee';
import StampEffect from '../components/StampEffect';

export default function NotFoundPage() {
  return (
    <>
      <section className="relative border-b border-offwhite/15 bg-charcoal">
        <StampEffect
          className="relative"
          accent="signal"
          sealLabel="DEAD END"
          sealSub="HUMAN ERROR"
        >
          <div
            data-cursor-stamp="STAMP IT"
            className="shell flex min-h-[100svh] flex-col justify-center py-32"
          >
            <p className="label-type text-signal">Error 404 &mdash; made by a human</p>

            <h1 className="hero-type mt-8 text-offwhite">
              This page
              <br />
              does not
              <br />
              <span className="text-signal">exist.</span>
            </h1>

            <p className="mt-10 max-w-xl font-serif text-xl leading-snug text-offwhite/80 sm:text-2xl">
              A person mistyped a link, or we moved something and forgot to tell anyone. Either way it
              is a human error, which we consider on-brand.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/"
                data-cursor-label="HOME"
                className="label-type border border-acid bg-acid px-6 py-4 text-ink transition-colors hover:border-signal hover:bg-signal"
              >
                Back to the manifesto
              </Link>
              <Link
                to="/works"
                data-cursor-label="WORKS"
                className="label-type border border-offwhite/25 px-6 py-4 text-offwhite transition-colors hover:border-offwhite hover:bg-offwhite hover:text-ink"
              >
                See human works
              </Link>
            </div>
          </div>
        </StampEffect>
      </section>

      <Marquee
        items={['NOT FOUND', 'NO AI GENERATION', 'REAL HUMAN CRAFT', 'STILL BY HAND']}
        durationSeconds={34}
        className="bg-ink py-5"
        itemClassName="font-display text-2xl font-extrabold uppercase tracking-tight text-offwhite/80 sm:text-4xl"
      />
    </>
  );
}
