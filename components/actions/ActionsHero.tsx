'use client';
import {
  ContainerAnimated,
  ContainerInset,
  ContainerScroll,
  ContainerSticky,
  HeroImage,
} from '@/components/blocks/animated-video-on-scroll';
import { motion } from 'framer-motion';
import Link from 'next/link';

export const ActionsHero = () => {
  return (
    <section className="bg-zinc-50">
      <ContainerScroll className="min-h-[350vh]">
        <ContainerSticky className="bg-zinc-50 px-6 py-10 ">
          <ContainerAnimated className="space-y-4 text-center">
            <h1 className="text-5xl sm:text-6xl text-primary-600/80 font-bold md:text-7xl lg:text-8xl">
              Nos Programmes
            </h1>

            <p className="mx-auto max-w-xl py-4 opacity-80">
              Nous aidons chaque jeune à trouver sa voie, à grandir et à croire
              en ses ambitions, grâce à une constellation de programmes pensés
              pour l’accompagner concrètement.
            </p>
          </ContainerAnimated>

          <ContainerInset className="max-h-[700px] w-auto  ">
            <HeroImage
              src="/about/team-meeting-startups.jpg"
              data-src="team-meeting-startups.jpg"
            />
          </ContainerInset>
        </ContainerSticky>
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-50" />
      </ContainerScroll>
      <Schedule />
    </section>
  );
};

const Schedule = () => {
  return (
    <section
      id="launch-schedule"
      className="mx-auto max-w-5xl px-4 pb-48 pt-20 text-zinc-900"
    >
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.75 }}
        className="mb-8 text-4xl font-black uppercase text-primary-500"
      >
        Nos programmes en détail
      </motion.h1>

      <motion.p
        initial={{ y: 32, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.75, delay: 0.1 }}
        className="mb-16 max-w-2xl text-sm text-zinc-500"
      >
        Chacun de nos programmes a été conçu pour répondre à un besoin concret :
        accompagner, orienter, sensibiliser, transmettre et créer du lien.
        Découvrez les parcours qui donnent à chaque jeune les moyens d’avancer.
      </motion.p>

      <ScheduleItem
        id="mentorat"
        title="Mentorat"
        description="Programme de mentorat individuel avec des professionnels engagés pour un accompagnement personnalisé."
        meta="Sur 6 mois · 50+ binômes"
      />

      <ScheduleItem
        id="orientation"
        title="Orientation"
        description="Ateliers d'orientation et de découverte des métiers pour t'aider à construire ton projet professionnel."
        meta="Mensuel · 30+ jeunes"
      />

      <ScheduleItem
        id="sensibilisation"
        title="Sensibilisation"
        description="Sessions de sensibilisation sur l'égalité des chances et l'intégration sociale."
        meta="Trimestriel · 60+ participants"
      />

      <ScheduleItem
        id="seminaires"
        title="Séminaires"
        description="Séminaires thématiques et conférences inspirantes avec des intervenants de qualité."
        meta="Bimestriel · 80+ participants"
      />

      <ScheduleItem
        id="colloques"
        title="Colloques"
        description="Organisation de colloques sur l'intégration, la réussite et les enjeux sociétaux."
        meta="Annuel · 150+ participants"
      />

      <ScheduleItem
        id="reseau"
        title="Réseau d'entraide"
        description="Mise en relation entre étudiants, mentors et partenaires pour créer une communauté soudée."
        meta="Permanent · 200+ membres"
      />
    </section>
  );
};

type ScheduleItemProps = {
  id: string;
  title: string;
  meta: string;
  description: string;
};

const ScheduleItem = ({ id, title, meta, description }: ScheduleItemProps) => {
  return (
    <Link href={id}>
      <motion.div
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: 'easeInOut', duration: 0.75 }}
        className="group mb-9 flex cursor-pointer items-center justify-between border-b-2 border-zinc-100 px-3 pb-9"
      >
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <FlipTitle>{title}</FlipTitle>
          </div>
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            {meta}
          </p>
        </div>
        <div className="max-w-sm text-right text-sm text-zinc-400">
          {description}
        </div>
      </motion.div>
    </Link>
  );
};

const FlipTitle = ({ children }: { children: string }) => {
  return (
    <span
      className="relative block overflow-hidden whitespace-nowrap text-primary-600/80 text-2xl font-bold uppercase sm:text-3xl md:text-4xl"
      style={{ lineHeight: 0.9 }}
    >
      <div className="flex">
        {children.split('').map((letter, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-[110%]"
            style={{ transitionDelay: `${i * 25}ms` }}
          >
            {letter}
          </span>
        ))}
      </div>

      <div className="absolute inset-0 flex">
        {children.split('').map((letter, i) => (
          <span
            key={i}
            className="inline-block translate-y-[110%] transition-transform duration-300 ease-in-out group-hover:translate-y-0"
            style={{ transitionDelay: `${i * 25}ms` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </span>
  );
};
