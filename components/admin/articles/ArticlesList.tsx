'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit, Trash2, Calendar, Tag, Search, Filter } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  status: string;
  published_at: string | null;
  views: number;
  tags: string[];
  created_at: string;
}

export default function ArticlesList({ articles }: { articles: Article[] }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleting, setDeleting] = useState<string | null>(null);

  // Filtrer les articles
  const filteredArticles = articles.filter((article) => {
    const matchSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      filterCategory === 'all' || article.category === filterCategory;

    const matchStatus =
      filterStatus === 'all' || article.status === filterStatus;

    return matchSearch && matchCategory && matchStatus;
  });

  // Supprimer un article
  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

    setDeleting(id);
    const { error } = await supabase.from('articles').delete().eq('id', id);

    if (error) {
      alert('Erreur lors de la suppression');
      console.error(error);
    } else {
      router.refresh();
    }
    setDeleting(null);
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      evenement: 'bg-blue-100 text-blue-700',
      temoignage: 'bg-green-100 text-green-700',
      actualite: 'bg-orange-100 text-orange-700',
      partenariat: 'bg-purple-100 text-purple-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      published: 'bg-green-100 text-green-700',
      draft: 'bg-gray-100 text-gray-700',
      archived: 'bg-red-100 text-red-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Filters */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un article..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-trust focus:ring-2 focus:ring-trust/20 outline-none transition-all"
            />
          </div>

          {/* Category filter */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-trust focus:ring-2 focus:ring-trust/20 outline-none transition-all"
          >
            <option value="all">Toutes les catégories</option>
            <option value="evenement">Événements</option>
            <option value="temoignage">Témoignages</option>
            <option value="actualite">Actualités</option>
            <option value="partenariat">Partenariats</option>
          </select>

          {/* Status filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-trust focus:ring-2 focus:ring-trust/20 outline-none transition-all"
          >
            <option value="all">Tous les statuts</option>
            <option value="published">Publiés</option>
            <option value="draft">Brouillons</option>
            <option value="archived">Archivés</option>
          </select>
        </div>

        <p className="text-sm text-gray-600 mt-4">
          {filteredArticles.length} article(s) trouvé(s)
        </p>
      </div>

      {/* Articles table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Article
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Catégorie
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Statut
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Vues
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Date
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredArticles.map((article, index) => (
              <motion.tr
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="font-semibold text-gray-900 line-clamp-1">
                      {article.title}
                    </div>
                    <div className="text-sm text-gray-600 line-clamp-1 mt-1">
                      {article.excerpt}
                    </div>
                    {article.tags.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {article.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                      article.category
                    )}`}
                  >
                    {article.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      article.status
                    )}`}
                  >
                    {article.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-medium">{article.views}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      {new Date(
                        article.published_at || article.created_at
                      ).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/actualites/${article.slug}`} target="_blank">
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </Link>
                    <Link href={`/admin/articles/${article.id}`}>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id)}
                      disabled={deleting === article.id}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {deleting === article.id ? (
                        <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 text-red-600" />
                      )}
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun article trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}
