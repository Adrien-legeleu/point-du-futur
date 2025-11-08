// Database types
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: 'actualite' | 'evenement' | 'temoignage' | 'partenariat';
  tags: string[];
  status: 'draft' | 'published' | 'archived';
  read_time: number;
  author_name: string;
  author_avatar: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
}

export type ArticleStatus = Article['status'];
export type ArticleCategory = Article['category'];

// Form data types
export interface ArticleFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string;
  status: string;
  read_time: number;
  author_name: string;
  author_avatar: string;
}

// Insert/Update types (without auto-generated fields)
export type ArticleInsert = Omit<Article, 'id' | 'created_at' | 'updated_at'>;
export type ArticleUpdate = Partial<ArticleInsert>;
