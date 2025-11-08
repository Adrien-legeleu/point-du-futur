'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Article } from '@/lib/articles-data';
import { categories } from '@/lib/articles-data';

interface RelatedArticlesProps {
  articles: Article[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  const getCategoryColor = (category: string) => {
    const cat = categories.find((c) => c.value === category);
    return cat?.color || 'gray';
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find((c) => c.value === category);
    return cat?.label || category;
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Articles similaires
          </h2>
          <p className="text-xl text-gray-600">
            Découvre d'autres contenus qui pourraient t'intéresser
          </p>
        </motion.div>

        {/* Articles grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group bg-gray-50 rounded-[2rem] overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <Link href={`/actualites/${article.slug}`}>
                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary-blue/20 to-primary-green/20">
                  {/* Placeholder gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300" />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                        getCategoryColor(article.category) === 'blue'
                          ? 'bg-primary-blue'
                          : getCategoryColor(article.category) === 'green'
                          ? 'bg-primary-green'
                          : getCategoryColor(article.category) === 'orange'
                          ? 'bg-primary-orange'
                          : 'bg-purple-600'
                      }`}
                    >
                      {getCategoryLabel(article.category)}
                    </span>
                  </div>
                </div>
              </Link>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.publishedAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                    })}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {article.readTime} min
                  </div>
                </div>

                {/* Title */}
                <Link href={`/actualites/${article.slug}`}>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-blue transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </Link>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* CTA */}
                <Link
                  href={`/actualites/${article.slug}`}
                  className="inline-flex items-center gap-2 text-primary-blue font-semibold text-sm group-hover:gap-3 transition-all"
                >
                  Lire l'article
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-blue to-primary-green text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Voir toutes les actualités
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
