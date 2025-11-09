'use client';

import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { Calendar, Clock, ArrowRight, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import type { Article } from '@/lib/types';

const ARTICLES_PER_PAGE = 6;

const categories = [
  { label: 'Tous', value: 'all' },
  { label: 'Événements', value: 'evenement' },
  { label: 'Témoignages', value: 'temoignage' },
  { label: 'Actualités', value: 'actualite' },
  { label: 'Partenariats', value: 'partenariat' },
];

interface ActualitesListProps {
  articles: Article[];
}

export default function ActualitesList({ articles }: ActualitesListProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and search articles
  const filteredArticles = useMemo(() => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(
        (article) => article.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
          article.tags.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    return filtered;
  }, [articles, selectedCategory, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'evenement':
        return 'bg-accent-600';
      case 'temoignage':
        return 'bg-success';
      case 'actualite':
        return 'bg-warning';
      case 'partenariat':
        return 'bg-primary-700';
      default:
        return 'bg-gray-600';
    }
  };

  const getCategoryLabel = (category: string) => {
    const cat = categories.find((c) => c.value === category);
    return cat?.label || category;
  };

  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            {/* Search bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un article..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 outline-none transition-all bg-white shadow-sm"
              />
            </div>

            {/* Category filters */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-5 h-5 text-gray-500 hidden md:block" />
              {categories.map((category) => (
                <motion.button
                  key={category.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedCategory(category.value);
                    setCurrentPage(1);
                  }}
                  className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                    selectedCategory === category.value
                      ? 'bg-primary-900 text-white shadow-md'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Results count */}
          <p className="mt-6 text-gray-600 text-sm">
            {filteredArticles.length} article
            {filteredArticles.length > 1 ? 's' : ''}{' '}
            {searchQuery && `pour "${searchQuery}"`}
          </p>
        </div>

        {/* Articles grid */}
        {paginatedArticles.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-4">
              Aucun article trouvé pour cette recherche
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-primary-900 text-white rounded-xl font-semibold hover:bg-primary-800 transition-colors"
            >
              Réinitialiser les filtres
            </motion.button>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {paginatedArticles.map((article, index) => (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-accent-300 hover:shadow-xl transition-all duration-300 hover-lift"
                >
                  {/* Image */}
                  <Link href={`/actualites/${article.slug}`}>
                    <div className="relative h-56 overflow-hidden bg-gray-100">
                      {/* Placeholder */}
                      <div className="absolute inset-0 bg-gray-200" />

                      {/* Category badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${getCategoryColor(
                            article.category
                          )}`}
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
                        {new Date(article.publishedAt).toLocaleDateString(
                          'fr-FR',
                          {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                          }
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {article.readTime} min
                      </div>
                    </div>

                    {/* Title */}
                    <Link href={`/actualites/${article.slug}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent-600 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                    </Link>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed text-sm">
                      {article.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-50 text-gray-600 rounded-lg text-xs border border-gray-100"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Author & CTA */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 text-sm font-semibold">
                          {article.author.name.charAt(0)}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {article.author.name}
                        </span>
                      </div>

                      <Link
                        href={`/actualites/${article.slug}`}
                        className="flex items-center gap-2 text-accent-600 font-semibold text-sm group-hover:gap-3 transition-all"
                      >
                        Lire
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Précédent
                </motion.button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <motion.button
                        key={page}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCurrentPage(page)}
                        className={`w-10 h-10 rounded-xl font-medium transition-colors ${
                          currentPage === page
                            ? 'bg-primary-900 text-white'
                            : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {page}
                      </motion.button>
                    )
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                >
                  Suivant
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
