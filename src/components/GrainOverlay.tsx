/**
 * Full-viewport film-grain overlay built on an inline feTurbulence filter, plus
 * a fine scanline ruling. Purely decorative: never intercepts pointer events.
 */
export default function GrainOverlay() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[70] overflow-hidden">
      <svg className="grain-overlay h-full w-full opacity-[0.22]" xmlns="http://www.w3.org/2000/svg">
        <filter id="dtr-film-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.78" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#dtr-film-grain)" />
      </svg>

      <div className="absolute inset-0 opacity-[0.16] mix-blend-soft-light scanlines" />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 90% at 50% 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </div>
  );
}
