import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'subtle';
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
    default: 'bg-white border border-gray-200 shadow-md',
    glass: 'bg-white/90 backdrop-blur-lg border border-gray-100 shadow-lg',
    subtle:
      'bg-gray-50 border border-gray-100 shadow-sm',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      className={`rounded-2xl p-6 transition-all duration-300 ${variants[variant]} ${hover ? 'hover-lift' : ''} ${className}`}
    >
      {children}
    </motion.div>
  );
}
