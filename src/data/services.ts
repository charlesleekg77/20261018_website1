export type Capability = {
  index: string;
  title: string;
  summary: string;
  deliverables: string[];
  lead: string;
};

export const CAPABILITIES: Capability[] = [
  {
    index: 'A',
    title: 'Human Brand Strategy',
    summary:
      'Positioning, naming and narrative built in a room with your team, not scraped from your competitors. We start with the argument you want to win.',
    deliverables: ['Positioning platform', 'Naming + verbal identity', 'Narrative workshop', 'Messaging architecture'],
    lead: '4–6 weeks',
  },
  {
    index: 'B',
    title: 'Artisanal Web Development',
    summary:
      'No AI site builders, no page-builder sludge. Semantic, hand-written front-end code with real performance budgets and a human on call when it breaks.',
    deliverables: ['Design system', 'Hand-built front-end', 'CMS + content modelling', 'Performance + a11y pass'],
    lead: '6–14 weeks',
  },
  {
    index: 'C',
    title: 'Creative Direction & Copywriting',
    summary:
      'One senior human owns the work end to end and signs their name to it. Every sentence is written by a person who can defend it in a meeting.',
    deliverables: ['Art direction', 'Copy + tone of voice', 'Photography direction', 'Editorial guidelines'],
    lead: 'Ongoing',
  },
  {
    index: 'D',
    title: 'Experimental Interactive Experiences',
    summary:
      'WebGL, shaders, kinetic type, generative print. The odd, memorable stuff that makes people stop scrolling and take a screenshot.',
    deliverables: ['Concept + prototyping', 'Custom shader work', 'Motion system', 'Launch build'],
    lead: '8–16 weeks',
  },
];

export type ComparisonRow = {
  dimension: string;
  generic: string;
  human: string;
};

export const COMPARISON: ComparisonRow[] = [
  {
    dimension: 'Origin',
    generic: 'Averaged from a scraped corpus of everything that already exists.',
    human: 'Argued into existence by named people who will defend it.',
  },
  {
    dimension: 'Point of view',
    generic: 'Plausible. Never opinionated. Offends nobody, moves nobody.',
    human: 'Specific enough to lose the wrong client and win the right one.',
  },
  {
    dimension: 'Copy',
    generic: '"Elevate your brand with cutting-edge solutions."',
    human: 'Written out loud, read back, cut by a third, then kept.',
  },
  {
    dimension: 'Code',
    generic: 'Generated, bloated, unexplained. Nobody knows why line 400 exists.',
    human: 'Hand-written, commented where it is non-obvious, and owned.',
  },
  {
    dimension: 'Iteration',
    generic: 'Regenerate. Regenerate. Regenerate. Same average, new seed.',
    human: 'A critique, a redline and a decision. Documented.',
  },
  {
    dimension: 'Accountability',
    generic: 'The model did it. The prompt was unclear.',
    human: 'A senior human puts their name on the delivery.',
  },
  {
    dimension: 'Half-life',
    generic: 'Indistinguishable from the 900 competitors who prompted the same thing.',
    human: 'A recognisable asset that compounds for a decade.',
  },
];

export const PROCESS = [
  { step: '01', title: 'Listen', body: 'We ask rude questions and take real notes. No discovery deck, just a conversation.' },
  { step: '02', title: 'Argue', body: 'Two or three directions, defended in person. You will dislike at least one of them.' },
  { step: '03', title: 'Make', body: 'Hands on keyboards. Daily builds, weekly demos, no black boxes.' },
  { step: '04', title: 'Sign', body: 'We ship, then we stay reachable. The humans who made it answer the phone.' },
];
