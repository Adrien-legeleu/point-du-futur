// lib/supabase/articles.ts
import { createServerSupabaseClient } from '@/lib/supabase/server';

// Type basé sur ton schéma exact
type ArticleDB = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string | null;
  category: 'actualite' | 'evenement' | 'temoignage' | 'partenariat';
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  read_time: number;
  author_name: string;
  author_avatar: string | null;
  published_at: string | null;
  views: number;
  created_at: string;
  updated_at: string;
};

// Type transformé pour le frontend
export type Article = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  tags: string[];
  status: string;
  reading_time: number;
  author: {
    name: string;
    avatar?: string;
  };
  published_at: string;
  views: number;
  created_at: string;
  updated_at: string;
};

// Fonction pour transformer les données DB vers frontend
function transformArticle(article: ArticleDB): Article {
  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content: article.content,
    image: article.image_url || '/images/default-article.jpg',
    category: article.category,
    tags: article.tags || [],
    status: article.status,
    reading_time: article.read_time || 5,
    author: {
      name: article.author_name,
      avatar: article.author_avatar || undefined,
    },
    published_at: article.published_at || article.created_at,
    views: article.views || 0,
    created_at: article.created_at,
    updated_at: article.updated_at,
  };
}

export async function getPublishedArticles(): Promise<Article[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching published articles:', error);
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  return data.map(transformArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching article:', error);
    return null;
  }

  if (!data) {
    return null;
  }

  return transformArticle(data);
}

export async function getRelatedArticles(
  category: string,
  currentSlug: string,
  limit = 3
): Promise<Article[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('category', category)
    .eq('status', 'published')
    .neq('slug', currentSlug)
    .not('published_at', 'is', null)
    .order('published_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }

  if (!data || data.length === 0) {
    return [];
  }

  return data.map(transformArticle);
}

export async function getAllArticleSlugs(): Promise<string[]> {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('articles')
    .select('slug')
    .eq('status', 'published');

  if (error) {
    console.error('Error fetching article slugs:', error);
    return [];
  }

  if (!data) {
    return [];
  }

  return data.map((article) => article.slug);
}

// Si tu veux utiliser la fonction RPC pour les vues (optionnel) :
export async function incrementArticleViews(slug: string): Promise<void> {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.rpc('increment_article_views', {
    article_slug: slug,
  });

  if (error) {
    console.error('Error incrementing views:', error);
  }
}
