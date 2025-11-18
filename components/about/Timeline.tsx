import React from 'react';
import { Timeline } from '@/components/ui/timeline';
import Image from 'next/image';

export function TimelineComponent() {
  const data = [
    {
      title: '2024 – Naissance du projet',
      content: (
        <div>
          <p className="mb-4 text-xs md:text-sm font-normal text-neutral-800 dark:text-neutral-200">
            Pont du Futur naît d’une conviction simple : créer un espace où
            chaque jeune peut se projeter dans l’avenir avec confiance, entouré
            et soutenu.
          </p>
          <p className="mb-8 text-xs md:text-sm font-normal text-neutral-800 dark:text-neutral-200">
            Les premières réunions, les premiers échanges avec des étudiantes et
            étudiants, les retours du terrain… Tout cela a posé les bases de
            notre approche : humaine, concrète, et centrée sur l’égalité des
            chances.
          </p>
          <div className="flex w-full items-center justify-center gap-4">
            <Image
              src="/about/front-view-friends-spending-quality-time-together.jpg"
              alt="Atelier d'orientation"
              width={300}
              height={300}
              className="aspect-9/12 object-cover rounded-sm"
            />
          </div>
        </div>
      ),
    },
    {
      title: '2025 – Premiers programmes',
      content: (
        <div>
          <p className="mb-4 text-xs md:text-sm font-normal text-neutral-800 dark:text-neutral-200">
            Lancement des premiers parcours : mentorat, ateliers d’orientation,
            rencontres avec des professionnelles et professionnels engagés.
          </p>
          <p className="mb-8 text-xs md:text-sm font-normal text-neutral-800 dark:text-neutral-200">
            On structure les formats, on teste, on ajuste. Chaque session nous
            permet de mieux comprendre les besoins des jeunes, leurs freins,
            leurs envies, et d’affiner notre impact.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/about/authentic-book-club-scene.jpg"
              alt="Atelier d'orientation"
              width={300}
              height={300}
              className="aspect-9/12 object-cover rounded-sm"
            />
            <Image
              src="/about/conference-room-hotel.jpg"
              alt="Atelier d'orientation"
              width={300}
              height={300}
              className="aspect-9/12 object-cover rounded-sm"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Demain – Ce qu’on construit',
      content: (
        <div>
          <p className="mb-4 text-xs md:text-sm font-normal text-neutral-800 dark:text-neutral-200">
            Pont du Futur est un projet qui évolue avec celles et ceux qui y
            participent. Demain, ce seront encore davantage de jeunes
            accompagnés, davantage de partenariats, davantage de lieux où chacun
            peut se sentir légitime et soutenu.
          </p>

          <p className="mb-4 text-xs md:text-sm font-normal text-neutral-800 dark:text-neutral-200">
            Notre ambition est simple : devenir un véritable pont entre les
            talents, les opportunités, les écoles, les entreprises et les
            associations qui souhaitent s’engager de manière concrète.
          </p>

          <div className="mb-6 space-y-2 text-xs md:text-sm text-neutral-700 dark:text-neutral-300">
            <div>Développer le mentorat et les accompagnements individuels</div>
            <div>
              Proposer davantage d’ateliers, en présentiel comme en ligne
            </div>
            <div>Renforcer un réseau de partenaires mobilisés</div>
            <div>
              Donner plus de place à la voix des jeunes, partout où elle compte
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/about/girl-laughing-with-friends-university.jpg"
              alt="Atelier d'orientation"
              width={300}
              height={300}
              className="aspect-9/12 object-cover rounded-sm"
            />
            <Image
              src="/about/young-adults-meeting-up-study (2).jpg"
              alt="Atelier d'orientation"
              width={300}
              height={300}
              className="aspect-9/12 object-cover rounded-sm"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full bg-gradient-to-br from-zinc-50 via-primary-100 to-inc-50 overflow-clip">
      <Timeline data={data} />
    </div>
  );
}
