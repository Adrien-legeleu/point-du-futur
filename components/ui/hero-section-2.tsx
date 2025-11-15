'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion, type Variants, type HTMLMotionProps } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { FlipLinks } from './flip-links';

// Icon component for contact details
const InfoIcon = ({ type }: { type: 'website' | 'phone' | 'address' }) => {
  const icons = {
    website: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-primary"
      >
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="2" x2="22" y1="12" y2="12"></line>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
      </svg>
    ),
    phone: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-primary"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
      </svg>
    ),
    address: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5 text-primary"
      >
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
  };
  return <div className="mr-2 flex-shrink-0">{icons[type]}</div>;
};

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

// Props propres au composant
interface HeroSectionOwnProps {
  backgroundImage: string;
}

// On part des props Motion de <motion.section>
// puis on enlève 'title' pour la remplacer par notre ReactNode.
type HeroSectionProps = HeroSectionOwnProps &
  Omit<HTMLMotionProps<'section'>, 'title'>;

const HeroSection = React.forwardRef<HTMLElement, HeroSectionProps>(
  (
    {
      className,

      backgroundImage,

      ...motionProps
    },
    ref
  ) => {
    return (
      <motion.section
        ref={ref}
        className={cn(
          'relative flex w-full  flex-col min-h-screen overflow-hidden bg-gradient-to-b from-zinc-50 via-zinc-100 to-white mb-48 text-foreground md:flex-row',
          className
        )}
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        {...motionProps}
      >
        {/* Left Side: Content */}
        <div className="flex w-full flex-col justify-between gap-20 p-8 md:w-1/2 md:p-12 lg:w-3/5 lg:p-16">
          <header className="">
            <h2 className="text-primary-500  font-bold text-2xl md:text-3xl leading-tight max-w-2xl">
              Comment nous rejoindre ?
            </h2>
          </header>
          <FlipLinks />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-left"
          >
            <p className="text-xl text-gray-600 mb-6">
              Une question ? Besoin de plus d&apos;informations ?
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary-500 text-white rounded-2xl font-semibold shadow-[0_25px_60px_-18px_rgba(0,0,0,0.12)] hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.16)] transition-all"
            >
              Contactez-nous
              <ArrowRight className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>

        {/* Right Side: Image with Clip Path Animation */}
        <motion.div
          className="w-full min-h-[300px] bg-cover bg-center md:w-1/2 md:min-h-full "
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
          initial={{
            clipPath: 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)',
          }}
          animate={{
            clipPath: 'polygon(25% 0, 100% 0, 100% 100%, 0% 100%)',
          }}
          transition={{ duration: 1.2, ease: 'circOut' }}
        />
      </motion.section>
    );
  }
);

HeroSection.displayName = 'HeroSection';

export { HeroSection };
