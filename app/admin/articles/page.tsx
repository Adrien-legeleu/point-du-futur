import { createServerSupabaseClient } from '@/lib/supabase/server';
import ArticlesList from '@/components/admin/articles/ArticlesList';
import Link from 'next/link';
import { Plus } from 'lucide-react';

export default async function ArticlesPage() {
  const supabase = createServerSupabaseClient();

  // Récupérer tous les articles
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Articles</h1>
          <p className="text-gray-600 mt-1">
            Gérez les articles et actualités du site
          </p>
        </div>
        <Link href="/admin/articles/nouveau">
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-blue to-primary-green text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
            <Plus className="w-5 h-5" />
            Nouvel article
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total', value: articles?.length || 0, color: 'blue' },
          {
            label: 'Publiés',
            value:
              articles?.filter((a) => a.status === 'published').length || 0,
            color: 'green',
          },
          {
            label: 'Brouillons',
            value: articles?.filter((a) => a.status === 'draft').length || 0,
            color: 'orange',
          },
          {
            label: 'Vues totales',
            value: articles?.reduce((sum, a) => sum + a.views, 0) || 0,
            color: 'purple',
          },
        ].map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
          >
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Articles list */}
      <ArticlesList articles={articles || []} />
    </div>
  );
}
