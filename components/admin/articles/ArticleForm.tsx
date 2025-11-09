'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, Eye } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import type { Article, ArticleFormData } from '@/lib/types';

// Importer un éditeur riche (ex: react-quill)
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';

interface ArticleFormProps {
  article?: Article;
}

export default function ArticleForm({ article }: ArticleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ArticleFormData>({
    title: article?.title || '',
    slug: article?.slug || '',
    excerpt: article?.excerpt || '',
    content: article?.content || '',
    category: article?.category || 'actualite',
    tags: article?.tags?.join(', ') || '',
    status: article?.status || 'draft',
    read_time: article?.read_time || 5,
    author_name: article?.author_name || 'Admin',
    author_avatar: article?.author_avatar || '👨‍💼',
  });

  // Générer le slug automatiquement
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag);

      const articleData = {
        ...formData,
        tags: tagsArray,
        published_at:
          formData.status === 'published' && !article?.published_at
            ? new Date().toISOString()
            : article?.published_at,
      };

      if (article) {
        // Update
        const { error } = await supabase
          .from('articles')
          .update(articleData)
          .eq('id', article.id);

        if (error) throw error;
      } else {
        // Create
        const { error } = await supabase.from('articles').insert([articleData]);

        if (error) throw error;
      }

      router.push('/admin/articles');
      router.refresh();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Une erreur est survenue';
      alert('Erreur: ' + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        {/* Title */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Titre *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust focus:ring-2 focus:ring-trust/20 outline-none transition-all"
            placeholder="Titre de l'article"
          />
        </div>

        {/* Slug */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Slug (URL)
          </label>
          <div className="flex items-center gap-2">
            <span className="text-gray-500 text-sm">/actualites/</span>
            <input
              type="text"
              required
              value={formData.slug}
              onChange={(e) =>
                setFormData({ ...formData, slug: e.target.value })
              }
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-trust focus:ring-2 focus:ring-trust/20 outline-none transition-all"
              placeholder="mon-article"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Extrait *
          </label>
          <textarea
            required
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust focus:ring-2 focus:ring-trust/20 outline-none transition-all resize-none"
            placeholder="Court résumé de l'article..."
          />
        </div>

        {/* Content */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Contenu *
          </label>
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              modules={{
                toolbar: [
                  [{ header: [2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ list: 'ordered' }, { list: 'bullet' }],
                  ['blockquote', 'code-block'],
                  ['link'],
                  ['clean'],
                ],
              }}
              className="bg-white"
            />
          </div>
        </div>

        {/* Category & Status */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Catégorie *
            </label>
            <select
              required
              value={formData.category}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust focus:ring-2 focus:ring-trust/20 outline-none transition-all"
            >
              <option value="actualite">Actualité</option>
              <option value="evenement">Événement</option>
              <option value="temoignage">Témoignage</option>
              <option value="partenariat">Partenariat</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Statut *
            </label>
            <select
              required
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust focus:ring-2 focus:ring-trust/20 outline-none transition-all"
            >
              <option value="draft">Brouillon</option>
              <option value="published">Publié</option>
              <option value="archived">Archivé</option>
            </select>
          </div>
        </div>

        {/* Tags & Read time */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tags (séparés par des virgules)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) =>
                setFormData({ ...formData, tags: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust focus:ring-2 focus:ring-trust/20 outline-none transition-all"
              placeholder="Innovation, Tech, Mentorat"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Temps de lecture (min)
            </label>
            <input
              type="number"
              min="1"
              value={formData.read_time}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  read_time: parseInt(e.target.value),
                })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust focus:ring-2 focus:ring-trust/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Author */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Auteur
            </label>
            <input
              type="text"
              value={formData.author_name}
              onChange={(e) =>
                setFormData({ ...formData, author_name: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust focus:ring-2 focus:ring-trust/20 outline-none transition-all"
              placeholder="Nom de l'auteur"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Avatar (emoji)
            </label>
            <input
              type="text"
              value={formData.author_avatar}
              onChange={(e) =>
                setFormData({ ...formData, author_avatar: e.target.value })
              }
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-trust focus:ring-2 focus:ring-trust/20 outline-none transition-all"
              placeholder="👨‍💼"
            />
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Link href="/admin/articles">
          <button
            type="button"
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Retour
          </button>
        </Link>

        <div className="flex gap-3">
          {article && (
            <Link href={`/actualites/${article.slug}`} target="_blank">
              <button
                type="button"
                className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-gray-300 transition-colors"
              >
                <Eye className="w-5 h-5" />
                Prévisualiser
              </button>
            </Link>
          )}

          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-trust to-future text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                {article ? 'Mettre à jour' : 'Publier'}
              </>
            )}
          </motion.button>
        </div>
      </div>
    </form>
  );
}
