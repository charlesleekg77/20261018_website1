import type { CSSProperties } from 'react';

type Props = {
  items: string[];
  reverse?: boolean;
  durationSeconds?: number;
  className?: string;
  itemClassName?: string;
  separator?: string;
  outline?: boolean;
};

/**
 * Kinetic typography band. Two identical tracks translate -50% so the loop is
 * seamless; the duplicate is hidden from assistive tech.
 */
export default function Marquee({
  items,
  reverse = false,
  durationSeconds = 30,
  className = '',
  itemClassName = '',
  separator = '\u25CF',
  outline = false,
}: Props) {
  const trackStyle: CSSProperties = { animationDuration: `${durationSeconds}s` };

  const renderTrack = (key: string, hidden: boolean) => (
    <div
      key={key}
      aria-hidden={hidden || undefined}
      className={`flex w-max shrink-0 items-center ${
        reverse ? 'animate-marquee-reverse' : 'animate-marquee'
      } motion-reduce:animate-none`}
      style={trackStyle}
    >
      {items.map((item, index) => (
        <span key={`${key}-${index}`} className={`flex shrink-0 items-center ${itemClassName}`}>
          <span className={outline ? 'text-stroke' : undefined}>{item}</span>
          <span aria-hidden="true" className="mx-5 text-signal sm:mx-8">
            {separator}
          </span>
        </span>
      ))}
    </div>
  );

  return (
    <div className={`group marquee-mask relative overflow-hidden ${className}`}>
      <div className="flex w-max hover:[&_.animate-marquee]:[animation-play-state:paused] hover:[&_.animate-marquee-reverse]:[animation-play-state:paused]">
        {renderTrack('a', false)}
        {renderTrack('b', true)}
      </div>
    </div>
  );
}
