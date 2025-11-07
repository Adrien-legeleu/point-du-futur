import Hero from '@/components/sections/Hero';
import Impact from '@/components/sections/Impact';
import Actions from '@/components/sections/Actions';
import HowItWorks from '@/components/sections/HowItWorks';
import Stories from '@/components/sections/Stories';
import CTA from '@/components/sections/CTA';
import Mission from '@/components/sections/Missions';

export const metadata = {
  title: 'Pont du Futur - Construisons ton avenir, ensemble',
  description:
    'Association accompagnant les jeunes issus des classes populaires et les étudiants étrangers dans leur parcours académique et professionnel.',
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Mission />
      <Impact />
      <Actions />
      <HowItWorks />
      <Stories />
      <CTA />
    </>
  );
}
