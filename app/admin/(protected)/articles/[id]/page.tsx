// app/admin/(protected)/articles/[id]/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server';
import ArticleForm from '@/components/admin/articles/ArticleForm';
import { notFound } from 'next/navigation';

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ id: string }>; // ✅ Promise dans le type
}) {
  // ✅ AWAIT params d'abord
  const { id } = await params;

  const supabase = await createServerSupabaseClient();

  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id) // ✅ Utiliser id au lieu de params.id
    .single();

  if (error || !article) {
    console.error('Erreur chargement article :', error);
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Modifier l'article</h1>
        <p className="text-gray-600 mt-1">
          Modifiez les informations de l'article
        </p>
      </div>

      <ArticleForm article={article} />
    </div>
  );
}
