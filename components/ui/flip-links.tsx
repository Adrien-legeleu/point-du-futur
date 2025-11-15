import { ArrowRight, ExternalLink, Link2, MoveRight } from 'lucide-react';
import Link from 'next/link';

export const FlipLinks = () => {
  return (
    <section className="grid place-content-start gap-7  w-full h-full text-primary-600/80">
      <FlipLink href="/contact">Membre</FlipLink>
      <FlipLink href="/contact">Benevole</FlipLink>
      <FlipLink href="/contact">Partenaire</FlipLink>
      <FlipLink href="/contact">Mentor</FlipLink>
    </section>
  );
};

const FlipLink = ({ children, href }: { children: string; href: string }) => {
  return (
    <Link
      href={href}
      className="group text-primary relative block overflow-hidden  text-primary-600/80 whitespace-nowrap text-4xl font-black uppercase sm:text-6xl md:text-7xl lg:text-8xl"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div className="flex">
        {children.split('').map((letter, i) => (
          <span
            key={i}
            className="inline-block transition-transform duration-300 ease-in-out group-hover:-translate-y-[110%]"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter}
          </span>
        ))}
        <MoveRight className="w-3 group-hover:visible invisible h-3" />
      </div>
      <div className="absolute inset-0 flex">
        {children.split('').map((letter, i) => (
          <span
            key={i}
            className="inline-block translate-y-[110%] transition-transform duration-300 ease-in-out group-hover:translate-y-0"
            style={{
              transitionDelay: `${i * 25}ms`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>
    </Link>
  );
};
