import type { Metadata } from 'next';

import { ActionsHero } from '@/components/actions/ActionsHero';
import Mentorat from '@/components/actions/Mentorat';
import Orientation from '@/components/actions/Orientations';
import Seminaires from '@/components/actions/Seminaires';
import Colloques from '@/components/actions/Colloques';
import ActionsCTA from '@/components/actions/ActionsCta';
import Sensibilisation from '@/components/actions/Sensibilisation';

export const metadata: Metadata = {
  title: 'Nos Actions | Pont du Futur - Programmes et Accompagnement',
  description:
    'Découvrez nos programmes : mentorat, orientation, séminaires, colloques et sensibilisation pour accompagner les jeunes vers la réussite.',
  openGraph: {
    title: 'Nos Actions - Pont du Futur',
    description:
      'Mentorat, orientation, séminaires... Découvrez tous nos programmes pour accompagner les jeunes issus des classes populaires et étudiants étrangers.',
    url: 'https://pontdufutur.org/nos-actions',
    type: 'website',
    images: [
      {
        url: '/images/actions/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Programmes Pont du Futur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nos Actions - Pont du Futur',
    description:
      'Découvrez nos programmes pour accompagner les jeunes : mentorat, orientation, séminaires et plus encore.',
    images: ['/images/actions/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://pontdufutur.org/nos-actions',
  },
  robots: 'index, follow',
};

export default function NosActionsPage() {
  return (
    <>
      <ActionsHero />
      <Mentorat />
      <Orientation />
      <Sensibilisation />
      <Seminaires />
      <Colloques />
      <div className="overflow-hidden w-full ">
        <ActionsCTA />
      </div>
    </>
  );
}
