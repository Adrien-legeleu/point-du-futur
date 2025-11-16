'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Trash2, Edit, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ArticlesList({ articles }: { articles: any[] }) {
  const [loading, setLoading] = useState(false);
  const [localArticles, setLocalArticles] = useState(articles);

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;

    setLoading(true);
    const { error } = await supabase.from('articles').delete().eq('id', id);

    if (!error) {
      setLocalArticles((prev) => prev.filter((a) => a.id !== id));
    }
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      published: 'bg-green-100 text-green-700',
      draft: 'bg-gray-100 text-gray-700',
      archived: 'bg-orange-100 text-orange-700',
    };
    return styles[status as keyof typeof styles] || styles.draft;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
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
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {localArticles.map((article) => (
              <motion.tr
                key={article.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {article.image_url && (
                      <img
                        src={article.image_url}
                        alt={article.title}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900 line-clamp-1">
                        {article.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(article.created_at).toLocaleDateString(
                          'fr-FR'
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                    {article.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusBadge(
                      article.status
                    )}`}
                  >
                    {article.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {article.views || 0}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/actualites/${article.slug}`} target="_blank">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </Link>
                    <Link href={`/admin/articles/${article.id}`}>
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id)}
                      disabled={loading}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {localArticles.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Aucun article pour le moment
        </div>
      )}
    </div>
  );
}
