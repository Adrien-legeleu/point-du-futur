import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'gradient';
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  variant = 'default',
  className = '',
  hover = true,
}: CardProps) {
  const variants = {
    default: 'bg-white border border-gray-100 shadow-lg',
    glass: 'bg-white/70 backdrop-blur-xl border border-white/20 shadow-xl',
    gradient:
      'bg-gradient-to-br from-primary-blue/10 to-primary-green/10 border border-gray-100 shadow-lg',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -10, scale: 1.02 } : {}}
      className={`rounded-[2rem] p-6 transition-all duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </motion.div>
  );
}
