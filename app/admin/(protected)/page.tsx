import { createServerSupabaseClient } from '@/lib/supabase/server';
import {
  FileText,
  Users,
  Heart,
  Briefcase,
  Calendar,
  Handshake,
  TrendingUp,
  Eye,
  Clock,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';

export default async function AdminDashboard() {
  const supabase = await createServerSupabaseClient();

  // Récupérer toutes les statistiques
  const [
    { count: articlesCount },
    { count: membresCount },
    { count: mentorsCount },
    { count: benevolesCount },
    { count: evenementsCount },
    { count: partenairesCount },
    { data: recentArticles },
    { data: pendingMembres },
  ] = await Promise.all([
    supabase.from('articles').select('*', { count: 'exact', head: true }),
    supabase.from('membres').select('*', { count: 'exact', head: true }),
    supabase.from('mentors').select('*', { count: 'exact', head: true }),
    supabase.from('benevoles').select('*', { count: 'exact', head: true }),
    supabase.from('evenements').select('*', { count: 'exact', head: true }),
    supabase.from('partenaires').select('*', { count: 'exact', head: true }),
    supabase
      .from('articles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5),
    supabase.from('membres').select('*').eq('status', 'pending').limit(5),
  ]);

  const stats = [
    {
      label: 'Articles',
      value: articlesCount || 0,
      icon: FileText,
      color: 'blue',
      href: '/admin/articles',
      change: '+12%',
    },
    {
      label: 'Membres',
      value: membresCount || 0,
      icon: Users,
      color: 'green',
      href: '/admin/membres',
      change: '+8%',
    },
    {
      label: 'Mentors',
      value: mentorsCount || 0,
      icon: Heart,
      color: 'red',
      href: '/admin/mentors',
      change: '+5%',
    },
    {
      label: 'Bénévoles',
      value: benevolesCount || 0,
      icon: Briefcase,
      color: 'orange',
      href: '/admin/benevoles',
      change: '+15%',
    },
    {
      label: 'Événements',
      value: evenementsCount || 0,
      icon: Calendar,
      color: 'purple',
      href: '/admin/evenements',
      change: '+3%',
    },
    {
      label: 'Partenaires',
      value: partenairesCount || 0,
      icon: Handshake,
      color: 'indigo',
      href: '/admin/partenaires',
      change: '+7%',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600 mt-2">
          Vue d'ensemble de votre plateforme Pont du Futur
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link key={index} href={stat.href}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      stat.color === 'blue'
                        ? 'bg-blue-100'
                        : stat.color === 'green'
                        ? 'bg-green-100'
                        : stat.color === 'red'
                        ? 'bg-red-100'
                        : stat.color === 'orange'
                        ? 'bg-orange-100'
                        : stat.color === 'purple'
                        ? 'bg-purple-100'
                        : 'bg-indigo-100'
                    }`}
                  >
                    <Icon
                      className={`w-7 h-7 ${
                        stat.color === 'blue'
                          ? 'text-blue-600'
                          : stat.color === 'green'
                          ? 'text-green-600'
                          : stat.color === 'red'
                          ? 'text-red-600'
                          : stat.color === 'orange'
                          ? 'text-orange-600'
                          : stat.color === 'purple'
                          ? 'text-purple-600'
                          : 'text-indigo-600'
                      }`}
                    />
                  </div>
                  <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                    <TrendingUp className="w-4 h-4" />
                    {stat.change}
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Two column layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent articles */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Articles récents
            </h2>
            <Link
              href="/admin/articles"
              className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
            >
              Voir tout
            </Link>
          </div>
          <div className="space-y-4">
            {recentArticles && recentArticles.length > 0 ? (
              recentArticles.map((article: any) => (
                <Link
                  key={article.id}
                  href={`/admin/articles/${article.id}`}
                  className="block"
                >
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views || 0} vues
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(article.created_at).toLocaleDateString(
                            'fr-FR'
                          )}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-semibold ${
                        article.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : article.status === 'draft'
                          ? 'bg-gray-100 text-gray-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}
                    >
                      {article.status}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">
                Aucun article pour le moment
              </p>
            )}
          </div>
        </div>

        {/* Pending applications */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              Candidatures en attente
            </h2>
            <Link
              href="/admin/candidatures"
              className="text-blue-600 hover:text-blue-700 text-sm font-semibold"
            >
              Voir tout
            </Link>
          </div>
          <div className="space-y-4">
            {pendingMembres && pendingMembres.length > 0 ? (
              pendingMembres.map((membre: any) => (
                <Link
                  key={membre.id}
                  href={`/admin/membres`}
                  className="block"
                >
                  <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                      {membre.prenom?.[0] || 'M'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {membre.prenom} {membre.nom}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {membre.email}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        {new Date(membre.created_at).toLocaleDateString(
                          'fr-FR'
                        )}
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-xs font-semibold">
                      En attente
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
                <p className="text-gray-500">
                  Aucune candidature en attente
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Actions rapides
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href="/admin/articles/nouveau"
            className="flex flex-col items-center gap-3 p-6 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">
              Nouvel article
            </span>
          </Link>
          <Link
            href="/admin/evenements"
            className="flex flex-col items-center gap-3 p-6 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">
              Événements
            </span>
          </Link>
          <Link
            href="/admin/membres"
            className="flex flex-col items-center gap-3 p-6 rounded-xl bg-green-50 hover:bg-green-100 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">
              Membres
            </span>
          </Link>
          <Link
            href="/admin/candidatures"
            className="flex flex-col items-center gap-3 p-6 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-orange-600 flex items-center justify-center">
              <Handshake className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-semibold text-gray-900">
              Candidatures
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
