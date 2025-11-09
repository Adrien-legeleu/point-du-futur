// app/admin/(protected)/page.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server';
import {
  Users,
  Heart,
  Briefcase,
  Handshake,
  FileText,
  Calendar,
  TrendingUp,
  Eye,
} from 'lucide-react';
import Link from 'next/link';

// 🔹 Types minimalistes pour les stats
type ArticleStatus = 'draft' | 'published';
type UserStatus = 'pending' | 'active' | 'inactive';
type EventStatus = 'upcoming' | 'past' | 'cancelled';

type ArticleForStats = {
  status: ArticleStatus;
  views: number | null;
};

type WithStatus<S extends string> = {
  status: S;
};

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient();

  // Récupérer les statistiques
  const [
    { data: articles },
    { data: membres },
    { data: mentors },
    { data: benevoles },
    { data: partenaires },
    { data: evenements },
  ] = await Promise.all([
    supabase.from('articles').select('id, status, views'),
    supabase.from('membres').select('id, status'),
    supabase.from('mentors').select('id, status'),
    supabase.from('benevoles').select('id, status'),
    supabase.from('partenaires').select('id, status'),
    supabase.from('evenements').select('id, status'),
  ]);

  const articlesSafe = (articles ?? []) as ArticleForStats[];
  const membresSafe = (membres ?? []) as WithStatus<UserStatus>[];
  const mentorsSafe = (mentors ?? []) as WithStatus<UserStatus>[];
  const benevolesSafe = (benevoles ?? []) as WithStatus<UserStatus>[];
  const partenairesSafe = (partenaires ?? []) as WithStatus<UserStatus>[];
  const evenementsSafe = (evenements ?? []) as WithStatus<EventStatus>[];

  const stats = [
    {
      label: 'Articles',
      value: articlesSafe.length,
      pending: articlesSafe.filter((a) => a.status === 'draft').length,
      icon: FileText,
      color: 'blue',
      href: '/admin/articles',
    },
    {
      label: 'Membres',
      value: membresSafe.length,
      pending: membresSafe.filter((m) => m.status === 'pending').length,
      icon: Users,
      color: 'green',
      href: '/admin/membres',
    },
    {
      label: 'Mentors',
      value: mentorsSafe.length,
      pending: mentorsSafe.filter((m) => m.status === 'pending').length,
      icon: Heart,
      color: 'purple',
      href: '/admin/mentors',
    },
    {
      label: 'Bénévoles',
      value: benevolesSafe.length,
      pending: benevolesSafe.filter((b) => b.status === 'pending').length,
      icon: Briefcase,
      color: 'orange',
      href: '/admin/benevoles',
    },
    {
      label: 'Partenaires',
      value: partenairesSafe.length,
      pending: partenairesSafe.filter((p) => p.status === 'pending').length,
      icon: Handshake,
      color: 'indigo',
      href: '/admin/partenaires',
    },
    {
      label: 'Événements',
      value: evenementsSafe.length,
      pending: evenementsSafe.filter((e) => e.status === 'upcoming').length,
      icon: Calendar,
      color: 'pink',
      href: '/admin/evenements',
    },
  ];

  const totalViews =
    articlesSafe.reduce((sum, a) => sum + (a.views ?? 0), 0) || 0;
  const totalPending = stats.reduce((sum, stat) => sum + stat.pending, 0) || 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-1">Vue d'ensemble de Pont du Futur</p>
      </div>

      {/* Stats globales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-blue to-primary-green rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {stats.reduce((sum, s) => sum + s.value, 0)}
          </div>
          <div className="text-sm text-gray-600">Total utilisateurs</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            {totalPending > 0 && (
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
                {totalPending} en attente
              </span>
            )}
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {totalPending}
          </div>
          <div className="text-sm text-gray-600">Candidatures en attente</div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {totalViews.toLocaleString()}
          </div>
          <div className="text-sm text-gray-600">Vues totales</div>
        </div>
      </div>

      {/* Cartes des sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.label} href={stat.href}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      stat.color === 'blue'
                        ? 'bg-primary-blue/10 group-hover:bg-primary-blue/20'
                        : stat.color === 'green'
                        ? 'bg-green-100 group-hover:bg-green-200'
                        : stat.color === 'purple'
                        ? 'bg-purple-100 group-hover:bg-purple-200'
                        : stat.color === 'orange'
                        ? 'bg-orange-100 group-hover:bg-orange-200'
                        : stat.color === 'indigo'
                        ? 'bg-indigo-100 group-hover:bg-indigo-200'
                        : 'bg-pink-100 group-hover:bg-pink-200'
                    } transition-colors`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        stat.color === 'blue'
                          ? 'text-primary-blue'
                          : stat.color === 'green'
                          ? 'text-green-600'
                          : stat.color === 'purple'
                          ? 'text-purple-600'
                          : stat.color === 'orange'
                          ? 'text-orange-600'
                          : stat.color === 'indigo'
                          ? 'text-indigo-600'
                          : 'text-pink-600'
                      }`}
                    />
                  </div>
                  {stat.pending > 0 && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
                      {stat.pending}
                    </span>
                  )}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 mb-3">{stat.label}</div>
                <div className="text-sm text-primary-blue group-hover:underline">
                  Voir tout →
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Actions rapides */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Actions rapides
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/articles/nouveau">
            <button className="w-full flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-primary-blue to-primary-green text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
              <FileText className="w-5 h-5" />
              Nouvel article
            </button>
          </Link>
          <Link href="/admin/evenements/nouveau">
            <button className="w-full flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
              <Calendar className="w-5 h-5" />
              Nouvel événement
            </button>
          </Link>
          <Link href="/admin/candidatures">
            <button className="w-full flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
              <Users className="w-5 h-5" />
              Voir candidatures
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
