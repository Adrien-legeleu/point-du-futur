// components/actualites/ActualitesList.tsx
'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Eye, ArrowRight, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/supabase/articles';

type Props = {
  articles: Article[];
};

// Helper pour vérifier si c'est une vraie URL d'image
const isValidImageUrl = (url: string | undefined): boolean => {
  if (!url) return false;
  return (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('/')
  );
};

export default function ActualitesList({ articles }: Props) {
  if (!articles || articles.length === 0) {
    return (
      <section className="py-20 px-6  bg-gradient-to-b from-primary-50 to-zinc-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
            <Calendar className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Aucun article publié
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Nous préparons du contenu passionnant. Revenez bientôt pour
            découvrir nos dernières actualités !
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-primary-50 to-zinc-50">
      <div className="max-w-7xl mx-auto">
        {/* Grid d'articles - Pinterest style avec colonnes */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {articles.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <Link href={`/actualites/${article.slug}`}>
                <div className="group cursor-pointer mb-8">
                  {/* Image sans rounded - taille naturelle */}
                  <div className="relative w-full overflow-hidden bg-gray-100">
                    <Image
                      src={article.image}
                      alt={article.title}
                      width={800}
                      height={600}
                      className="w-full h-auto object-cover group-hover:opacity-90 transition-opacity duration-300"
                    />
                  </div>

                  {/* Contenu */}
                  <div className="mt-4">
                    {/* Titre */}
                    <h3 className="text-3xl md:text-4xl font-bold text-primary-600/80 mb-2 group-hover:text-primary-blue transition-colors">
                      {article.title}
                    </h3>

                    {/* Description - max 3 lignes */}
                    <p className="text-neutral-600 text-sm line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
