import { createServerSupabaseClient } from '@/lib/supabase/server';
import BenevolesTable from '@/components/admin/benevoles/BenevolesTable';
import { Briefcase, UserCheck, UserX, Clock } from 'lucide-react';

type Benevole = {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  age: number | null;
  ville: string | null;
  motivation: string | null;
  competences: string | null;
  disponibilite: string | null;
  status: string;
  created_at: string;
};

export default async function BenevolesPage() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from('benevoles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching benevoles:', error);
  }

  // ✅ ici on force le type proprement (pas de any)
  const benevoles: Benevole[] = (data ?? []) as Benevole[];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Bénévoles</h1>
        <p className="text-gray-600 mt-1">
          Gérez les bénévoles de Pont du Futur
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: 'Total',
            value: benevoles.length,
            icon: Briefcase,
            color: 'blue',
          },
          {
            label: 'Actifs',
            value: benevoles.filter((b) => b.status === 'active').length,
            icon: UserCheck,
            color: 'green',
          },
          {
            label: 'En attente',
            value: benevoles.filter((b) => b.status === 'pending').length,
            icon: Clock,
            color: 'orange',
          },
          {
            label: 'Inactifs',
            value: benevoles.filter((b) => b.status === 'inactive').length,
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
      <BenevolesTable benevoles={benevoles} />
    </div>
  );
}
