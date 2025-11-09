import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  href,
  onClick,
  className = '',
}: ButtonProps) {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all';

  const variants = {
    primary:
      'bg-primary-900 text-white shadow-md hover:bg-primary-800 hover:shadow-lg',
    secondary:
      'bg-accent-600 text-white shadow-md hover:bg-accent-500 hover:shadow-lg',
    outline:
      'border-2 border-primary-900 text-primary-900 hover:bg-primary-900 hover:text-white',
    ghost:
      'text-primary-900 hover:bg-gray-100',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={classes}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={classes}
    >
      {content}
    </motion.button>
  );
}
