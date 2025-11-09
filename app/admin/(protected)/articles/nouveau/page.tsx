import ArticleForm from '@/components/admin/articles/ArticleForm';
export default function NewArticlePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Nouvel article</h1>
        <p className="text-gray-600 mt-1">
          Créez un nouvel article ou actualité
        </p>
      </div>

      <ArticleForm />
    </div>
  );
}
