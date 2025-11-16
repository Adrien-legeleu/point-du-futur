import { createServerSupabaseClient } from '@/lib/supabase/server';
import DemandesTable from '@/components/admin/demandes/DemandesTable';
import { Mail, Eye, CheckCircle, Archive } from 'lucide-react';

export default async function DemandesPage() {
  const supabase = await createServerSupabaseClient();

  const { data: demandes } = await supabase
    .from('demandes_infos')
    .select('*')
    .order('created_at', { ascending: false });

  const stats = [
    {
      label: 'Total',
      value: demandes?.length || 0,
      icon: Mail,
      color: 'blue',
    },
    {
      label: 'Nouvelles',
      value: demandes?.filter((d) => d.status === 'new').length || 0,
      icon: Mail,
      color: 'blue',
    },
    {
      label: 'Lues',
      value: demandes?.filter((d) => d.status === 'read').length || 0,
      icon: Eye,
      color: 'yellow',
    },
    {
      label: 'Traitées',
      value: demandes?.filter((d) => d.status === 'processed').length || 0,
      icon: CheckCircle,
      color: 'green',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Demandes d'informations
        </h1>
        <p className="text-gray-600 mt-1">Gérez les demandes de contact</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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
                      ? 'bg-blue-100'
                      : stat.color === 'yellow'
                      ? 'bg-yellow-100'
                      : stat.color === 'green'
                      ? 'bg-green-100'
                      : 'bg-gray-100'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      stat.color === 'blue'
                        ? 'text-blue-600'
                        : stat.color === 'yellow'
                        ? 'text-yellow-600'
                        : stat.color === 'green'
                        ? 'text-green-600'
                        : 'text-gray-600'
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

      <DemandesTable demandes={demandes || []} />
    </div>
  );
}
