// Database types (snake_case - correspond à Supabase)
export interface ArticleDB {
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
  created_at: string;
  updated_at: string;
  views: number;
}

// Type pour l'affichage (camelCase - utilisé dans les composants)
export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: 'actualite' | 'evenement' | 'temoignage' | 'partenariat';
  author: {
    name: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: number;
  tags: string[];
  views: number;
  status?: 'draft' | 'published' | 'archived';
}

export type ArticleStatus = ArticleDB['status'];
export type ArticleCategory = ArticleDB['category'];

// Form data types
export interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category: string;
  tags: string;
  status: string;
  read_time: number;
  author_name: string;
  author_avatar: string;
}

// Insert/Update types (without auto-generated fields)
export type ArticleInsert = Omit<ArticleDB, 'id' | 'created_at' | 'updated_at' | 'views'>;
export type ArticleUpdate = Partial<ArticleInsert>;
