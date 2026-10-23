import type { Work } from '../data/works';
import { Reveal } from './Reveal';
import WorkCard from './WorkCard';

export default function WorksGrid({ works }: { works: Work[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {works.map((work, index) => (
        <Reveal key={work.slug} delay={(index % 3) * 0.08} y={34} className="h-full">
          <WorkCard work={work} index={index} />
        </Reveal>
      ))}
    </div>
  );
}
