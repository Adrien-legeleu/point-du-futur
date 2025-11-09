'use client';

import { createBrowserClient } from '@supabase/ssr';

// Types
export type Database = {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string;
          slug: string;
          title: string;
          excerpt: string;
          content: string;
          image_url: string | null;
          category: 'evenement' | 'temoignage' | 'actualite' | 'partenariat';
          author_id: string | null;
          author_name: string;
          author_avatar: string | null;
          published_at: string | null;
          read_time: number;
          tags: string[];
          status: 'draft' | 'published' | 'archived';
          views: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['articles']['Row'],
          'id' | 'created_at' | 'updated_at' | 'views'
        >;
        Update: Partial<Database['public']['Tables']['articles']['Insert']>;
      };
      membres: {
        Row: {
          id: string;
          nom: string;
          prenom: string;
          email: string;
          telephone: string | null;
          age: number | null;
          ville: string | null;
          situation: string | null;
          motivation: string | null;
          disponibilite: string | null;
          status: 'pending' | 'approved' | 'rejected' | 'active' | 'inactive';
          mentor_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['membres']['Row'],
          'id' | 'created_at' | 'updated_at'
        >;
        Update: Partial<Database['public']['Tables']['membres']['Insert']>;
      };
      mentors: {
        Row: {
          id: string;
          nom: string;
          prenom: string;
          email: string;
          telephone: string | null;
          age: number | null;
          ville: string | null;
          experience: string | null;
          motivation: string | null;
          competences: string | null;
          disponibilite: string | null;
          status: 'pending' | 'approved' | 'rejected' | 'active' | 'inactive';
          mentees_count: number;
          max_mentees: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['mentors']['Row'],
          'id' | 'created_at' | 'updated_at' | 'mentees_count'
        >;
        Update: Partial<Database['public']['Tables']['mentors']['Insert']>;
      };
      evenements: {
        Row: {
          id: string;
          titre: string;
          slug: string;
          description: string;
          image_url: string | null;
          date_debut: string;
          date_fin: string | null;
          lieu: string;
          type:
            | 'seminaire'
            | 'atelier'
            | 'colloque'
            | 'networking'
            | 'autre'
            | null;
          places_total: number | null;
          places_restantes: number | null;
          status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
          organisateur_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database['public']['Tables']['evenements']['Row'],
          'id' | 'created_at' | 'updated_at'
        >;
        Update: Partial<Database['public']['Tables']['evenements']['Insert']>;
      };
    };
  };
};

// 👇 Client Supabase pour les composants client (AdminLoginPage, etc.)
export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
