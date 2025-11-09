import { createServerSupabaseClient } from '@/lib/supabase/server';
import PartenairesTable from '@/components/admin/partenaires/PartenairesTable';
import { Handshake, UserCheck, UserX, Clock } from 'lucide-react';

// 🔹 Type minimal pour les stats partenaires
type PartenaireStatus = 'active' | 'pending' | 'inactive';

type PartenaireForStats = {
  status: PartenaireStatus;
};

export default async function PartenairesPage() {
  // ✅ penser à await
  const supabase = await createServerSupabaseClient();

  const { data: partenaires, error } = await supabase
    .from('partenaires')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching partenaires:', error);
  }

  // ✅ version typée pour les stats (pas de any, plus de never)
  const partenairesForStats: PartenaireForStats[] = (partenaires ??
    []) as PartenaireForStats[];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Partenaires</h1>
        <p className="text-gray-600 mt-1">
          Gérez les partenaires de Pont du Futur
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: 'Total',
            value: partenairesForStats.length,
            icon: Handshake,
            color: 'blue',
          },
          {
            label: 'Actifs',
            value: partenairesForStats.filter((p) => p.status === 'active')
              .length,
            icon: UserCheck,
            color: 'green',
          },
          {
            label: 'En attente',
            value: partenairesForStats.filter((p) => p.status === 'pending')
              .length,
            icon: Clock,
            color: 'orange',
          },
          {
            label: 'Inactifs',
            value: partenairesForStats.filter((p) => p.status === 'inactive')
              .length,
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
                      ? 'bg-trust/10'
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
                        ? 'text-trust'
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
      {/* ici on laisse les données complètes aller à la table */}
      <PartenairesTable partenaires={partenaires || []} />
    </div>
  );
}
