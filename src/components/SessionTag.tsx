import { useEffect, useRef, useState } from 'react';

const pad = (value: number, size = 2) => String(Math.max(0, Math.floor(value))).padStart(size, '0');

function useSessionTelemetry() {
  const [seconds, setSeconds] = useState(0);
  const [fps, setFps] = useState(60);
  const frames = useRef(0);
  const last = useRef(0);

  useEffect(() => {
    let raf = 0;
    const tick = (time: number) => {
      if (!last.current) last.current = time;
      frames.current += 1;
      if (time - last.current >= 1000) {
        setFps(Math.round((frames.current * 1000) / (time - last.current)));
        frames.current = 0;
        last.current = time;
      }
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    const clock = window.setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearInterval(clock);
    };
  }, []);

  return { seconds, fps };
}

/**
 * Live session badge. Counts how long a human has been on the page, reports the
 * measured frame rate, and states the studio's position in plain language.
 */
export default function SessionTag({ compact = false }: { compact?: boolean }) {
  const { seconds, fps } = useSessionTelemetry();

  return (
    <div
      className="flex items-center gap-3 border border-offwhite/20 bg-ink/60 px-3 py-1.5 backdrop-blur-sm"
      title="Live session telemetry, measured in your browser"
    >
      <span className="flex items-center gap-1.5">
        <span className="h-1.5 w-1.5 animate-blink bg-signal" />
        <span className="label-type text-signal">LIVE</span>
      </span>

      <span className="hidden h-3 w-px bg-offwhite/25 sm:block" />

      <span className="label-type text-offwhite/80">
        SESSION <span className="text-acid">{pad(Math.floor(seconds / 60))}:{pad(seconds % 60)}</span>
      </span>

      {!compact && (
        <>
          <span className="hidden h-3 w-px bg-offwhite/25 sm:block" />
          <span className="label-type hidden text-offwhite/80 sm:inline">
            {fps} FPS
          </span>
        </>
      )}

      <span className="hidden h-3 w-px bg-offwhite/25 lg:block" />
      <span className="label-type hidden text-offwhite/55 lg:inline">
        HUMAN-MADE <span className="text-offwhite/30">//</span> 100% ARTISANAL CODE{' '}
        <span className="text-offwhite/30">//</span> <span className="text-acid">NO AI GENERATION</span>
      </span>
    </div>
  );
}
