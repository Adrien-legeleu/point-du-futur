import Impact from '@/components/sections/Impact';
import Actions from '@/components/sections/Actions';
import { Stories } from '@/components/sections/Stories';
import CTA from '@/components/sections/CTA';
import Hero from '@/components/sections/Hero';

export const metadata = {
  title: 'Pont du Futur - Construisons ton avenir, ensemble',
  description:
    'Association accompagnant les jeunes issus des classes populaires et les étudiants étrangers dans leur parcours académique et professionnel.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Impact />
      <Actions />
      <div className="overflow-hidden w-full h-full">
        <Stories />
        <CTA />
      </div>
    </>
  );
}
