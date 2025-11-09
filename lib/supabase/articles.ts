import { createServerSupabaseClient } from './server';
import type { Article } from '../types';

/**
 * Récupérer tous les articles publiés
 */
export async function getPublishedArticles(): Promise<Article[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Erreur lors de la récupération des articles:', error);
    return [];
  }

  return (data || []).map(article => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    image: article.image_url || '/images/default-article.jpg',
    category: article.category,
    author: {
      name: article.author_name,
      avatar: article.author_avatar || '/images/default-avatar.jpg',
    },
    publishedAt: article.published_at || article.created_at,
    readTime: article.read_time,
    tags: article.tags || [],
    views: article.views || 0,
  }));
}

/**
 * Récupérer un article par son slug
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !data) {
    console.error('Erreur lors de la récupération de l\'article:', error);
    return null;
  }

  // Incrémenter le compteur de vues
  await supabase
    .from('articles')
    .update({ views: (data.views || 0) + 1 })
    .eq('id', data.id);

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    image: data.image_url || '/images/default-article.jpg',
    category: data.category,
    author: {
      name: data.author_name,
      avatar: data.author_avatar || '/images/default-avatar.jpg',
    },
    publishedAt: data.published_at || data.created_at,
    readTime: data.read_time,
    tags: data.tags || [],
    views: (data.views || 0) + 1,
  };
}

/**
 * Récupérer les articles similaires (même catégorie)
 */
export async function getRelatedArticles(
  category: string,
  currentSlug: string,
  limit: number = 3
): Promise<Article[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .eq('category', category)
    .neq('slug', currentSlug)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Erreur lors de la récupération des articles similaires:', error);
    return [];
  }

  return (data || []).map(article => ({
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    image: article.image_url || '/images/default-article.jpg',
    category: article.category,
    author: {
      name: article.author_name,
      avatar: article.author_avatar || '/images/default-avatar.jpg',
    },
    publishedAt: article.published_at || article.created_at,
    readTime: article.read_time,
    tags: article.tags || [],
    views: article.views || 0,
  }));
}

/**
 * Récupérer tous les slugs d'articles pour la génération statique
 */
export async function getAllArticleSlugs(): Promise<string[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('articles')
    .select('slug')
    .eq('status', 'published');

  if (error) {
    console.error('Erreur lors de la récupération des slugs:', error);
    return [];
  }

  return (data || []).map(article => article.slug);
}
