'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';
import { WavePath } from '../ui/WavePath';

export default function CTA() {
  return (
    <section className="relative w-full bg-gradient-to-b from-zinc-50 to-white">
      {/* halo léger */}
      <div
        aria-hidden="true"
        className={cn(
          'pointer-events-none absolute -top-10 left-1/2 size-[1000px] -translate-x-1/2 rounded-full',
          'bg-[radial-gradient(ellipse_at_center,hsl(var(--primary-h,200)_60%_85%/_0.08),transparent_55%)]',
          'blur-[40px]'
        )}
      />

      <div className="relative mx-auto flex min-h-[65vh] max-w-6xl flex-col items-center justify-center px-6 py-24 md:py-32">
        {/* Ligne Wave */}
        <WavePath className="mb-10" />

        {/* Texte + bouton */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-primary-600 mb-4">
            Construisons l’avenir
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed">
            Engage-toi à nos côtés pour accompagner, inspirer et relier les
            jeunes qui bâtissent demain.
          </p>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary-600 px-8 py-4 font-semibold text-white shadow-md hover:shadow-lg transition-all"
            >
              <Mail className="h-5 w-5" />
              Rejoindre l’aventure
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
