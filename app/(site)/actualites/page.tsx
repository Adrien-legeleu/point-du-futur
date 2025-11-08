import type { Metadata } from 'next';
import ActualitesList from '@/components/actualites/ActualitesList';
import Newsletter from '@/components/actualites/Newsletter';
import ActualitesHero from '@/components/actualites/Actualiteshero';

export const metadata: Metadata = {
  title: 'Actualités | Pont du Futur - Événements et Témoignages',
  description:
    'Découvrez les dernières actualités, événements et témoignages de Pont du Futur. Restez informé de nos actions et des réussites de nos membres.',
  openGraph: {
    title: 'Actualités - Pont du Futur',
    description:
      'Événements, témoignages et actualités de Pont du Futur. Suivez nos actions et les parcours inspirants de nos membres.',
    url: 'https://pontdufutur.org/actualites',
    type: 'website',
    images: [
      {
        url: '/images/actualites/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Actualités Pont du Futur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Actualités - Pont du Futur',
    description:
      'Découvrez nos derniers événements, témoignages et actualités.',
    images: ['/images/actualites/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://pontdufutur.org/actualites',
  },
  robots: 'index, follow',
};

export default function ActualitesPage() {
  return (
    <>
      <ActualitesHero />
      <ActualitesList />
      <Newsletter />
    </>
  );
}
