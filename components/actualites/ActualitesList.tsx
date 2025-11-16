// components/actualites/ActualitesList.tsx
'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/supabase/articles';

type Props = {
  articles: Article[];
};

export default function ActualitesList({ articles }: Props) {
  if (!articles || articles.length === 0) {
    return (
      <section className="py-20 px-6 bg-gray-50">
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

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Article mis en avant */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Link href={`/actualites/${featuredArticle.slug}`}>
            <div className="group relative overflow-hidden rounded-3xl bg-white shadow-xl hover:shadow-2xl transition-all cursor-pointer">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Image */}
                <div className="relative h-96 md:h-auto overflow-hidden">
                  <Image
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <span className="absolute top-6 left-6 px-4 py-2 bg-primary-blue text-white rounded-full text-sm font-semibold capitalize">
                    {featuredArticle.category}
                  </span>
                </div>

                {/* Contenu */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(
                        featuredArticle.published_at
                      ).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {featuredArticle.reading_time} min
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      {featuredArticle.views}
                    </div>
                  </div>

                  <h2 className="text-4xl font-bold text-gray-900 mb-4 group-hover:text-primary-blue transition-colors">
                    {featuredArticle.title}
                  </h2>

                  <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                    {featuredArticle.excerpt}
                  </p>

                  <div className="flex items-center gap-4">
                    {featuredArticle.author.avatar && (
                      <Image
                        src={featuredArticle.author.avatar}
                        alt={featuredArticle.author.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900">
                        {featuredArticle.author.name}
                      </div>
                      <div className="text-sm text-gray-500">Auteur</div>
                    </div>
                  </div>

                  <div className="mt-8 inline-flex items-center gap-2 text-primary-blue font-semibold group-hover:gap-4 transition-all">
                    Lire l'article
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Grille d'articles */}
        {otherArticles.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link href={`/actualites/${article.slug}`}>
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer h-full flex flex-col">
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-primary-blue rounded-full text-xs font-semibold capitalize">
                        {article.category}
                      </span>
                    </div>

                    {/* Contenu */}
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(article.published_at).toLocaleDateString(
                            'fr-FR'
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.reading_time} min
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-blue transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-1">
                        {article.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          {article.author.avatar && (
                            <Image
                              src={article.author.avatar}
                              alt={article.author.name}
                              width={32}
                              height={32}
                              className="rounded-full"
                            />
                          )}
                          <span className="text-sm font-medium text-gray-700">
                            {article.author.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-500">
                          <Eye className="w-4 h-4" />
                          <span className="text-sm">{article.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
