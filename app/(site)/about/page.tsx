import type { Metadata } from 'next';
import { AboutHero } from '@/components/about/AboutHero';
import { TimelineComponent } from '@/components/about/Timeline';
import OurStory from '@/components/about/OurStory';
import Valeurs from '@/components/ui/sticky-scroll';
import { HeroSection } from '@/components/ui/hero-section-2';

export const metadata: Metadata = {
  title: 'À Propos | Pont du Futur - Notre Histoire et Équipe',
  description:
    "Découvrez l'histoire, les valeurs et l'équipe passionnée qui se cache derrière Pont du Futur, l'association qui accompagne les jeunes vers la réussite.",
  openGraph: {
    title: 'À Propos de Pont du Futur',
    description:
      "Plongez dans les coulisses de Pont du Futur : notre parcours, notre vision et les personnes qui façonnent l'accompagnement de demain.",
    url: 'https://pontdufutur.org/about',
    type: 'website',
    images: [
      {
        url: '/images/about/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Équipe Pont du Futur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'À Propos de Pont du Futur',
    description:
      'Découvrez qui se cache derrière Pont du Futur et comment notre équipe accompagne les jeunes vers la réussite.',
    images: ['/images/about/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://pontdufutur.org/about',
  },
  robots: 'index, follow',
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <OurStory />
      <Valeurs />
      <TimelineComponent />
      <div className="w-full">
        <HeroSection backgroundImage="/group-teenagers-posing-together.jpg" />
      </div>
    </>
  );
}
