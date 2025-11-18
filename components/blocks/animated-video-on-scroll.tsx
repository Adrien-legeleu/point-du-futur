'use client';

import * as React from 'react';
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
  type HTMLMotionProps,
  type MotionValue,
  type Variants,
  type Transition,
} from 'motion/react';

import { cn } from '@/lib/utils';

interface ContainerScrollContextValue {
  scrollYProgress: MotionValue<number>;
}

interface ContainerInsetProps extends HTMLMotionProps<'div'> {
  insetYRange?: [number, number];
  insetXRange?: [number, number];
  roundednessRange?: [number, number];
}

const SPRING_TRANSITION_CONFIG: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 16,
  mass: 0.75,
  restDelta: 0.005,
};

const variants: Variants = {
  hidden: {
    filter: 'blur(10px)',
    opacity: 0,
  },
  visible: {
    filter: 'blur(0px)',
    opacity: 1,
  },
};

const ContainerScrollContext = React.createContext<
  ContainerScrollContextValue | undefined
>(undefined);

function useContainerScrollContext() {
  const context = React.useContext(ContainerScrollContext);
  if (!context) {
    throw new Error(
      'useContainerScrollContext must be used within a ContainerScroll Component'
    );
  }
  return context;
}

export const ContainerScroll: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = ({ children, className, ...props }) => {
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ['start center', 'end end'],
  });

  return (
    <ContainerScrollContext.Provider value={{ scrollYProgress }}>
      <div
        ref={scrollRef}
        className={cn('relative min-h-svh w-full', className)}
        {...props}
      >
        {children}
      </div>
    </ContainerScrollContext.Provider>
  );
};
ContainerScroll.displayName = 'ContainerScroll';

interface ContainerAnimatedProps extends HTMLMotionProps<'div'> {
  inputRange?: number[];
  outputRange?: number[];
}

export const ContainerAnimated = React.forwardRef<
  HTMLDivElement,
  ContainerAnimatedProps
>(
  (
    {
      className,
      transition,
      style,
      inputRange = [0.2, 0.8],
      outputRange = [80, 0],
      ...props
    },
    ref
  ) => {
    const { scrollYProgress } = useContainerScrollContext();
    const y = useTransform(scrollYProgress, inputRange, outputRange);

    const mergedTransition: Transition | undefined = transition
      ? { ...SPRING_TRANSITION_CONFIG, ...(transition as Transition) }
      : SPRING_TRANSITION_CONFIG;

    return (
      <motion.div
        ref={ref}
        className={cn('', className)}
        variants={variants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        style={{ y, ...style }}
        transition={mergedTransition}
        {...props}
      />
    );
  }
);
ContainerAnimated.displayName = 'ContainerAnimated';

export const ContainerSticky = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn('sticky left-0 top-0 min-h-svh w-full', className)}
      {...props}
    />
  );
});
ContainerSticky.displayName = 'ContainerSticky';

export const HeroImage = React.forwardRef<
  HTMLImageElement,
  HTMLMotionProps<'img'>
>(({ style, className, ...props }, ref) => {
  const { scrollYProgress } = useContainerScrollContext();
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1.35]);
  return (
    <motion.img
      ref={ref}
      className={cn(
        'relative z-10 h-auto max-h-full w-auto max-w-full object-cover',
        className
      )}
      style={{ scale, ...style }}
      {...props}
    />
  );
});
HeroImage.displayName = 'HeroImage';

export const HeroButton = React.forwardRef<
  HTMLButtonElement,
  HTMLMotionProps<'button'>
>(({ className, ...props }, ref) => {
  return (
    <motion.button
      whileHover={{
        scale: 1.015,
      }}
      whileTap={{
        scale: 0.985,
      }}
      ref={ref}
      className={cn(
        'group relative flex w-fit items-center rounded-full border border-[#84cc16] bg-gray-950/10 px-4 py-2 shadow-[0px_4px_24px_#84cc16] transition-colors hover:bg-slate-950/50',
        className
      )}
      {...props}
    />
  );
});
HeroButton.displayName = 'HeroButton';

export const ContainerInset = React.forwardRef<
  HTMLDivElement,
  ContainerInsetProps
>(
  (
    {
      className,
      style,
      insetYRange = [35, 0],
      insetXRange = [35, 0],
      roundednessRange = [1000, 5],
      ...props
    },
    ref
  ) => {
    const { scrollYProgress } = useContainerScrollContext();

    // 👇 state pour savoir si on est sur mobile
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
      if (typeof window === 'undefined') return;

      const mql = window.matchMedia('(max-width: 768px)');

      const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
        setIsMobile(e.matches);
      };

      // init
      handleChange(mql);

      // listener
      const listener = (e: MediaQueryListEvent) => handleChange(e);
      mql.addEventListener('change', listener);

      return () => {
        mql.removeEventListener('change', listener);
      };
    }, []);

    const insetY = useTransform(scrollYProgress, [0, 0.8], insetYRange);
    const insetX = useTransform(scrollYProgress, [0, 0.8], insetXRange);

    // 👉 sur mobile : quasiment pas arrondi
    const effectiveRoundedRange = isMobile ? [8, 12] : roundednessRange;

    const roundedness = useTransform(
      scrollYProgress,
      [0, 1],
      effectiveRoundedRange
    );

    const clipPath = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${roundedness}px)`;

    return (
      <motion.div
        ref={ref}
        className={cn(
          'relative pointer-events-none overflow-hidden',
          className
        )}
        style={{
          clipPath,
          ...style,
        }}
        {...props}
      />
    );
  }
);
ContainerInset.displayName = 'ContainerInset';
