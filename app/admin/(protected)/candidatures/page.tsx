import CandidaturesOverview from '@/components/admin/candidatures/CandidaturesOverview';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { Users, Heart, Briefcase, Handshake } from 'lucide-react';

type HasStatus = {
  status: 'pending' | 'accepted' | 'rejected' | 'inactive';
};

export default async function CandidaturesPage() {
  const supabase = await createServerSupabaseClient();

  // Récupérer toutes les candidatures
  const [
    { data: membres },
    { data: mentors },
    { data: benevoles },
    { data: partenaires },
  ] = await Promise.all([
    supabase
      .from('membres')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('mentors')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('benevoles')
      .select('*')
      .order('created_at', { ascending: false }),
    supabase
      .from('partenaires')
      .select('*')
      .order('created_at', { ascending: false }),
  ]);

  // ✅ Tableaux "safe" juste pour les stats, avec un type qui a au moins `status`
  const membresWithStatus = (membres ?? []) as HasStatus[];
  const mentorsWithStatus = (mentors ?? []) as HasStatus[];
  const benevolesWithStatus = (benevoles ?? []) as HasStatus[];
  const partenairesWithStatus = (partenaires ?? []) as HasStatus[];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Candidatures</h1>
        <p className="text-gray-600 mt-1">
          Vue d'ensemble de toutes les candidatures reçues
        </p>
      </div>

      {/* Stats globales */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: 'Membres',
            value: membresWithStatus.filter((m) => m.status === 'pending')
              .length,
            total: membresWithStatus.length,
            icon: Users,
            color: 'blue',
            href: '/admin/membres',
          },
          {
            label: 'Mentors',
            value: mentorsWithStatus.filter((m) => m.status === 'pending')
              .length,
            total: mentorsWithStatus.length,
            icon: Heart,
            color: 'green',
            href: '/admin/mentors',
          },
          {
            label: 'Bénévoles',
            value: benevolesWithStatus.filter((b) => b.status === 'pending')
              .length,
            total: benevolesWithStatus.length,
            icon: Briefcase,
            color: 'orange',
            href: '/admin/benevoles',
          },
          {
            label: 'Partenaires',
            value: partenairesWithStatus.filter((p) => p.status === 'pending')
              .length,
            total: partenairesWithStatus.length,
            icon: Handshake,
            color: 'purple',
            href: '/admin/partenaires',
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <a key={index} href={stat.href}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      stat.color === 'blue'
                        ? 'bg-primary-blue/10'
                        : stat.color === 'green'
                        ? 'bg-green-100'
                        : stat.color === 'orange'
                        ? 'bg-orange-100'
                        : 'bg-purple-100'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        stat.color === 'blue'
                          ? 'text-primary-blue'
                          : stat.color === 'green'
                          ? 'text-green-600'
                          : stat.color === 'orange'
                          ? 'text-orange-600'
                          : 'text-purple-600'
                      }`}
                    />
                  </div>
                  {stat.value > 0 && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
                      {stat.value} en attente
                    </span>
                  )}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.total}
                </div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            </a>
          );
        })}
      </div>

      {/* Overview détaillé */}
      <CandidaturesOverview
        membres={membres || []}
        mentors={mentors || []}
        benevoles={benevoles || []}
        partenaires={partenaires || []}
      />
    </div>
  );
}
