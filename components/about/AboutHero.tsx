import {
  ContainerAnimated,
  ContainerInset,
  ContainerScroll,
  ContainerSticky,
  HeroImage,
} from '@/components/blocks/animated-video-on-scroll';

export const AboutHero = () => {
  return (
    <section>
      <ContainerScroll className="min-h-[350vh]">
        <ContainerSticky className="bg-gradient-to-b from-zinc-50 via-zinc-50 to-primary-100 px-6 py-10 ">
          <ContainerAnimated className="space-y-4 text-center">
            <h1 className="text-5xl sm:text-6xl text-primary-600/80 font-bold  md:text-7xl lg:text-8xl">
              Derrière le projet, <br /> une équipe engagée
            </h1>

            <p className="mx-auto max-w-xl py-4 opacity-80">
              Nous aidons chaque jeune à trouver sa voie, à grandir, à croire en
              ses ambitions. Une équipe unie par la même volonté : faire la
              différence.
            </p>
          </ContainerAnimated>

          <ContainerInset className="max-h-[700px] w-auto  ">
            <HeroImage
              src="/about/team-meeting-startups.jpg"
              data-src="team-meeting-startups.jpg"
            />
          </ContainerInset>
        </ContainerSticky>
      </ContainerScroll>
    </section>
  );
};
