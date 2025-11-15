'use client';

import { ReactLenis } from 'lenis/react';
import React, { forwardRef } from 'react';
import { Heart, Users, Target, Lightbulb, Shield, Smile } from 'lucide-react';
import Image from 'next/image';

type ValueColor = 'primary' | 'accent' | 'energy';

const values = [
  {
    icon: Heart,
    title: 'Solidarité',
    description:
      "Nous croyons en la force du collectif et de l'entraide pour construire un avenir meilleur.",
    color: 'primary' as ValueColor,
  },
  {
    icon: Lightbulb,
    title: 'Innovation',
    description:
      'Nous innovons constamment pour proposer des solutions adaptées aux besoins des jeunes.',
    color: 'accent' as ValueColor,
  },
  {
    icon: Users,
    title: 'Inclusion',
    description:
      'Chaque personne, quelle que soit son origine, mérite sa place et ses chances de réussir.',
    color: 'primary' as ValueColor,
  },
  {
    icon: Shield,
    title: 'Bienveillance',
    description:
      "L'écoute, le respect et la bienveillance sont au cœur de toutes nos actions.",
    color: 'primary' as ValueColor,
  },
  {
    icon: Target,
    title: 'Excellence',
    description:
      "Nous visons l'excellence dans l'accompagnement pour offrir le meilleur à nos membres.",
    color: 'accent' as ValueColor,
  },
  {
    icon: Smile,
    title: 'Optimisme',
    description:
      'Nous croyons fermement que chaque jeune peut réussir avec le bon accompagnement.',
    color: 'energy' as ValueColor,
  },
];

function ValueCard({ value }: { value: (typeof values)[number] }) {
  const iconBlurColor =
    value.color === 'primary'
      ? 'bg-primary-300/30'
      : value.color === 'accent'
      ? 'bg-accent-300/30'
      : 'bg-energy-300/30';
  const titleColorClass =
    value.color === 'primary'
      ? 'text-primary-500'
      : value.color === 'accent'
      ? 'text-accent-500'
      : 'text-energy-500';

  return (
    <article className="w-full relative  bg-transparent px-5 py-6 flex flex-col gap-3 items-center h-full justify-center">
      <div
        className={`absolute top-1/2 w-1/2 h-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 blur-2xl  ${iconBlurColor}`}
      />
      <div className="flex items-center z-10 relative gap-3">
        <h3 className={`text-3xl font-semibold ${titleColorClass}`}>
          {value.title}
        </h3>
      </div>
      <p className="text-xs z-10 text-center text-neutral-500 leading-relaxed">
        {value.description}
      </p>
    </article>
  );
}

const Valeurs = forwardRef<HTMLElement>((props, ref) => {
  return (
    <ReactLenis root>
      <main ref={ref}>
        <section className="w-full bg-gradient-to-b from-zinc-50 via-zinc-50 to-zinc-50   py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6">
            {/* Titre section */}
            <header className="mb-10 md:mb-14">
              <h2 className="text-primary-500 h-40 font-bold text-5xl md:text-7xl leading-tight max-w-2xl">
                Ce qui guide Pont du Futur
              </h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
              {/* Colonne gauche */}
              <div className="grid gap-3 md:gap-4 md:col-span-4">
                <figure className="w-full">
                  <Image
                    width={400}
                    height={400}
                    src="/about/team-meeting-startups.jpg"
                    alt="Jeunes qui collaborent"
                    className="w-full h-80 md:h-96 object-cover  transition-all duration-300"
                  />
                </figure>

                <ValueCard value={values[2]} />

                <figure className="w-full">
                  <Image
                    width={400}
                    height={400}
                    src="/about/young-colleagues-working-together-cafe.jpg"
                    alt="Travail en équipe"
                    className="w-full h-80 md:h-96 object-cover  transition-all duration-300"
                  />
                </figure>

                <ValueCard value={values[1]} />

                <figure className="w-full">
                  <Image
                    width={400}
                    height={400}
                    src="/about/young-adults-meeting-up-study (2).jpg"
                    alt="Moment de partage"
                    className="w-full h-80 md:h-96 object-cover  transition-all duration-300"
                  />
                </figure>
              </div>

              {/* Colonne centrale sticky */}
              <div className="md:sticky md:top-2 md:h-[98vh] md:col-span-4 grid grid-rows-3 gap-3 md:gap-4">
                <figure className="w-full h-full">
                  <Image
                    width={400}
                    height={400}
                    src="/about/group-young-people-sitting-conference-together-while-raising-their-hands-ask-question-business-team-meeting-seminar-training-concept.jpg"
                    alt="Accompagnement des jeunes"
                    className="h-full w-full object-cover  transition-all duration-300"
                  />
                </figure>

                <ValueCard value={values[0]} />

                <figure className="w-full h-full">
                  <Image
                    width={400}
                    height={400}
                    src="/about/gathered-discussion.jpg"
                    alt="Engagement associatif"
                    className="h-full w-full object-cover  transition-all duration-300"
                  />
                </figure>
              </div>

              {/* Colonne droite */}
              <div className="grid gap-3 md:gap-4 md:col-span-4">
                <figure className="w-full">
                  <Image
                    width={400}
                    height={400}
                    src="/about/college-students-cramming-outdoor.jpg"
                    alt="Échanges et rencontres"
                    className="w-full h-80 md:h-96 object-cover  transition-all duration-300"
                  />
                </figure>

                <ValueCard value={values[3]} />

                <figure className="w-full">
                  <Image
                    src="/about/conference-hall-empty-seats-row-projection-screen-before-seminar.jpg"
                    alt="Conférences et ateliers"
                    width={400}
                    height={400}
                    className="w-full h-80 md:h-96 object-cover  transition-all duration-300"
                  />
                </figure>

                <ValueCard value={values[4]} />

                <figure className="w-full">
                  <Image
                    width={400}
                    height={400}
                    src="/about/business-executives-with-hand-stacked.jpg"
                    alt="Sourires et optimisme"
                    className="w-full h-80 md:h-96 object-cover  transition-all duration-300"
                  />
                </figure>

                <ValueCard value={values[5]} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </ReactLenis>
  );
});

Valeurs.displayName = 'Valeurs';

export default Valeurs;
