import { Link } from 'react-router-dom';

/** Wordmark badge: the word ROBOTS is struck through, permanently. */
export default function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      to="/"
      data-cursor-label="HOME"
      className="group flex items-center gap-3"
      aria-label="Death To Robots, home"
    >
      <span className="relative flex h-9 w-9 shrink-0 items-center justify-center border-2 border-signal bg-signal/10">
        <span className="font-display text-lg font-extrabold leading-none text-signal">R</span>
        <span className="absolute -right-1 -top-1 h-2 w-2 bg-acid" />
      </span>

      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.95rem] font-extrabold uppercase tracking-[-0.02em] text-offwhite transition-colors group-hover:text-acid sm:text-base">
          Death To{' '}
          <span className="relative inline-block text-signal">
            Robots
            <span
              aria-hidden="true"
              className="absolute left-0 top-1/2 h-[3px] w-full -translate-y-1/2 bg-signal transition-transform duration-300 group-hover:scale-x-125"
            />
          </span>
        </span>
        {!compact && (
          <span className="label-type mt-1 hidden text-offwhite/40 sm:block">
            Handcrafted since 2019
          </span>
        )}
      </span>
    </Link>
  );
}
