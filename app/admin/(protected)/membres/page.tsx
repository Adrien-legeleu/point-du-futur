import MembresTable from '@/components/membres/MembresTable';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';
import type { MembreStatus } from '@/lib/types';

// Type minimal pour les stats
type MembreForStats = {
  status: MembreStatus;
};

export default async function MembresPage() {
  const supabase = await createServerSupabaseClient();

  const { data: membres, error } = await supabase
    .from('membres')
    .select('*, mentors(nom, prenom)')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching membres:', error);
  }

  // ✅ Version typée pour les stats (pas de any, plus de never)
  const membresForStats: MembreForStats[] = (membres ?? []) as MembreForStats[];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Membres</h1>
        <p className="text-gray-600 mt-1">Gérez les membres de Pont du Futur</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: 'Total',
            value: membresForStats.length,
            icon: Users,
            color: 'blue',
          },
          {
            label: 'Approuvés',
            value: membresForStats.filter((m) => m.status === 'approved').length,
            icon: UserCheck,
            color: 'green',
          },
          {
            label: 'En attente',
            value: membresForStats.filter((m) => m.status === 'pending').length,
            icon: Clock,
            color: 'orange',
          },
          {
            label: 'Rejetés',
            value: membresForStats.filter((m) => m.status === 'rejected').length,
            icon: UserX,
            color: 'red',
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    stat.color === 'blue'
                      ? 'bg-primary-blue/10'
                      : stat.color === 'green'
                      ? 'bg-green-100'
                      : stat.color === 'orange'
                      ? 'bg-orange-100'
                      : 'bg-red-100'
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
                        : 'text-red-600'
                    }`}
                  />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          );
        })}
      </div>

      {/* Table */}
      {/* ici on garde les données complètes (avec le mentor) */}
      <MembresTable membres={membres || []} />
    </div>
  );
}
