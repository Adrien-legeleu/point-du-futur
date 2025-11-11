'use client';

import { createBrowserClient } from '@supabase/ssr';
import type {
  ArticleDB,
  EvenementDB,
  MembreDB,
  MentorDB,
  BenevoleDB,
  PartenaireDB,
  CandidatureDB,
  NotificationDB,
} from '@/lib/types';

// ================================================
// TYPES SUPABASE DATABASE
// ================================================
export type Database = {
  public: {
    Tables: {
      articles: {
        Row: ArticleDB;
        Insert: Omit<ArticleDB, 'id' | 'created_at' | 'updated_at' | 'views'>;
        Update: Partial<
          Omit<ArticleDB, 'id' | 'created_at' | 'updated_at' | 'views'>
        >;
      };
      evenements: {
        Row: EvenementDB;
        Insert: Omit<EvenementDB, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<EvenementDB, 'id' | 'created_at' | 'updated_at'>>;
      };
      membres: {
        Row: MembreDB;
        Insert: Omit<MembreDB, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<MembreDB, 'id' | 'created_at' | 'updated_at'>>;
      };
      mentors: {
        Row: MentorDB;
        Insert: Omit<MentorDB, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<MentorDB, 'id' | 'created_at' | 'updated_at'>>;
      };
      benevoles: {
        Row: BenevoleDB;
        Insert: Omit<BenevoleDB, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<BenevoleDB, 'id' | 'created_at' | 'updated_at'>>;
      };
      partenaires: {
        Row: PartenaireDB;
        Insert: Omit<PartenaireDB, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<PartenaireDB, 'id' | 'created_at' | 'updated_at'>>;
      };
      candidatures: {
        Row: CandidatureDB;
        Insert: Omit<CandidatureDB, 'id' | 'created_at' | 'updated_at'>;
        Update: Partial<Omit<CandidatureDB, 'id' | 'created_at' | 'updated_at'>>;
      };
      notifications: {
        Row: NotificationDB;
        Insert: Omit<NotificationDB, 'id' | 'created_at'>;
        Update: Partial<Omit<NotificationDB, 'id' | 'created_at'>>;
      };
    };
  };
};

// ================================================
// CLIENT SUPABASE POUR LES COMPOSANTS CLIENT
// ================================================
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ================================================
// FONCTION D'INITIALISATION (si nécessaire)
// ================================================
export function getSupabaseBrowserClient() {
  return supabase;
}
