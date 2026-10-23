export type ManifestoPoint = {
  index: string;
  claim: string;
  body: string;
  tone: 'signal' | 'acid' | 'plain';
};

export const MANIFESTO_POINTS: ManifestoPoint[] = [
  {
    index: '01',
    claim: 'Algorithms have no soul.',
    body:
      'A model can average ten thousand paintings. It cannot decide that a thing matters. Taste is a wound you carry around; a machine has never bled, so it can only ever imitate the shape of caring.',
    tone: 'signal',
  },
  {
    index: '02',
    claim: 'Flaws make art human.',
    body:
      'The wobble in a hand-drawn line. The half-beat a drummer refuses to quantise. We leave the seams visible on purpose, because the seam is the signature, and the signature is the proof.',
    tone: 'acid',
  },
  {
    index: '03',
    claim: 'We craft code, design and ideas by hand.',
    body:
      'Every div is placed by a person who will be held responsible for it. Every sentence was argued over out loud. No prompt was pasted into a box and shipped as if it were a decision.',
    tone: 'plain',
  },
  {
    index: '04',
    claim: 'Generic is the enemy, not the baseline.',
    body:
      'The sludge is not ugly because it is machine-made. It is ugly because it is average, and averageness is a statistical property. No brand was ever loved for being statistically likely.',
    tone: 'plain',
  },
  {
    index: '05',
    claim: 'Speed is not a craft value.',
    body:
      'You can generate a website in nine seconds. You cannot generate a point of view in nine seconds. We would rather be slow and right, and we will show you the notebook to prove it.',
    tone: 'plain',
  },
  {
    index: '06',
    claim: 'The human stays in charge.',
    body:
      'We use the newest tools. We apply the algorithm where it serves the work. But the humans hold the pen, with all their odd foibles and chaotic instincts. That is where the best strategy comes from.',
    tone: 'signal',
  },
];

export const MARQUEE_PHRASES: string[] = [
  'NO SYNTHETIC CONTENT',
  'REAL HUMAN CRAFT',
  'HANDCRAFTED CODE',
  'NO AI GENERATION',
  'FLAWS ARE FEATURES',
  'MADE BY PEOPLE',
];
