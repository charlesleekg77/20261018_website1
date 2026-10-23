export type Work = {
  slug: string;
  title: string;
  client: string;
  year: string;
  discipline: string;
  blurb: string;
  art: 'orbits' | 'stack' | 'type' | 'halftone' | 'grid' | 'slash';
  accent: string;
  tone: 'paper' | 'charcoal' | 'signal' | 'acid';
  featured?: boolean;
};

export const WORKS: Work[] = [
  {
    slug: 'monolith-records',
    title: 'Monolith Records',
    client: 'Independent label, Rotterdam',
    year: '2026',
    discipline: 'Brand identity + packaging',
    blurb:
      'A label that refuses to sound like a playlist. We built a wordmark with a real saw-cut edge and pressed it into 40,000 sleeves by hand.',
    art: 'slash',
    accent: '#FF2B2B',
    tone: 'charcoal',
    featured: true,
  },
  {
    slug: 'foundry-north',
    title: 'Foundry North',
    client: 'Architecture studio, Leeds',
    year: '2025',
    discipline: 'Website + art direction',
    blurb:
      'Twelve projects, twelve essays, zero stock photography. Every image was shot on site by the studio, every line of copy written over coffee.',
    art: 'stack',
    accent: '#D4FF00',
    tone: 'paper',
    featured: true,
  },
  {
    slug: 'slow-water',
    title: 'Slow Water',
    client: 'Bottled water, absurdly',
    year: '2025',
    discipline: 'Packaging + campaign',
    blurb:
      'The brief was "premium hydration". We made it about patience instead. Sales rose 31%. Nobody has ever explained why.',
    art: 'orbits',
    accent: '#FF2B2B',
    tone: 'acid',
  },
  {
    slug: 'the-notebook',
    title: 'The Notebook',
    client: 'Literary quarterly',
    year: '2024',
    discipline: 'Editorial design + type',
    blurb:
      'A print magazine in 2024, printed on a risograph that jams twice a week. We designed around the jams and called them a feature.',
    art: 'type',
    accent: '#F5F5F5',
    tone: 'signal',
  },
  {
    slug: 'field-and-frame',
    title: 'Field & Frame',
    client: 'Documentary collective',
    year: '2024',
    discipline: 'Creative direction',
    blurb:
      'Six filmmakers, one visual language. We wrote it down on a single sheet of A3 and they have not broken it since.',
    art: 'halftone',
    accent: '#D4FF00',
    tone: 'charcoal',
  },
  {
    slug: 'night-shift',
    title: 'Night Shift',
    client: 'Coffee roastery, 24h',
    year: '2023',
    discipline: 'Identity + environment',
    blurb:
      'An identity designed to be read at 4am under sodium light. Contrast tuned by eye, not by a contrast checker.',
    art: 'grid',
    accent: '#FF2B2B',
    tone: 'paper',
  },
];
