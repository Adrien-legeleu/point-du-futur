'use client';

import Image from 'next/image';

export default function OurStory() {
  return (
    <section
      className="pb-12 md:py-32 bg-gradient-to-t relative max-md:-pt-20
     from-zinc-50 to-primary-50 "
    >
      <div className="max-w-7xl mx-auto px-6 grid gap-20 md:grid-cols-[1.2fr_0.8fr] items-start">
        {/* --- Left text side --- */}
        <div className="space-y-10">
          <h2 className="text-primary-500 md:h-40 font-bold text-5xl md:text-7xl leading-tight max-w-2xl">
            Qui nous sommes
          </h2>

          <p className="sm:text-md text-sm md:text-lg text-neutral-700 leading-8">
            Pont du Futur est né d’une conviction simple : chaque jeune mérite
            d’être accompagné, encouragé et entouré pour se projeter dans
            l’avenir avec confiance.
          </p>

          <p className="sm:text-md  text-sm md:text-lg text-neutral-700 leading-8">
            Au fil des rencontres, des ateliers, et des échanges avec les jeunes
            comme avec les bénévoles, nous avons façonné une approche humaine,
            ancrée dans la réalité, et centrée sur l’impact concret. Notre
            objectif n’est pas seulement de transmettre des outils, mais de
            créer un véritable accompagnement — individuel, collectif et durable
            — qui ouvre des portes et révèle des potentiels.
          </p>
        </div>

        {/* --- Right small column --- */}
        <div className="flex flex-col gap-8 items-start justify-start">
          <Image
            src="/about/image.png"
            alt="image a propos"
            width={300}
            height={300}
            className="rounded-sm aspect-square h-40 w-40 object-cover object-top shadow-lg"
          />

          <div className="h-[1px] bg-primary-200 w-full" />

          <p className="italic text-neutral-600 text-sm md:text-md leading-relaxed">
            “On a créé Pont du Futur pour donner à chaque jeune un espace où il
            peut croire en lui, évoluer, et se sentir accompagné dans ses
            choix.”
          </p>

          <div>
            <h3 className="text-primary-600 font-semibold text-2xl">Mamad</h3>
            <p className="text-xs text-neutral-500">
              Fondateur de Pont du Futur
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
