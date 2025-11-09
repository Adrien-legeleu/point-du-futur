'use client';

import { motion } from 'framer-motion';

interface SectionTitleProps {
  title: string;
  highlight?: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionTitle({
  title,
  highlight,
  subtitle,
  centered = true,
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={centered ? 'text-center mb-16' : 'mb-16'}
    >
      <h2 className="text-4xl md:text-6xl font-bold mb-4 text-primary-900">
        {title}{' '}
        {highlight && <span className="text-accent-600">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
      )}
      <div className="w-24 h-1 bg-accent-600 mx-auto rounded-full mt-6" />
    </motion.div>
  );
}
