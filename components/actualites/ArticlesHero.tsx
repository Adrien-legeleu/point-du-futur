'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, User } from 'lucide-react';
import Link from 'next/link';
import type { Article } from '@/lib/supabase/articles';
import { categories } from '@/lib/constants';

interface ArticleHeroProps {
  article: Article;
}

export default function ArticleHero({ article }: ArticleHeroProps) {
  const category = categories.find((c) => c.value === article.category);

  return (
    <section className="relative pt-32 pb-16 overflow-hidden bg-white">
      {/* Back button */}
      <div className="max-w-4xl mx-auto px-6 mb-8">
        <Link
          href="/actualites"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-accent-600 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Retour aux actualités
        </Link>
      </div>

      <div className="max-w-4xl mx-auto px-6">
        {/* Category badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold text-white ${
              category?.color === 'blue'
                ? 'bg-accent-600'
                : category?.color === 'green'
                ? 'bg-success'
                : category?.color === 'orange'
                ? 'bg-warning'
                : 'bg-primary-900'
            }`}
          >
            {category?.label}
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight"
        >
          {article.title}
        </motion.h1>

        {/* Meta info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap items-center gap-6 text-gray-600 mb-8"
        >
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-accent-600" />
            <span className="font-medium">{article.author.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-success" />
            <span>
              {new Date(article.published_at).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-warning" />
            <span>{article.reading_time} min de lecture</span>
          </div>
        </motion.div>

        {/* Featured image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative aspect-video rounded-[2rem] overflow-hidden shadow-lg mb-8 bg-gray-100"
        >
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap gap-2"
        >
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
