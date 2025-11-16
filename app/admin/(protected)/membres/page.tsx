import { createServerSupabaseClient } from '@/lib/supabase/server';
import MembresTable from '@/components/admin/membres/MembresTable';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';

export default async function MembresPage() {
  const supabase = await createServerSupabaseClient();

  const { data: membres } = await supabase
    .from('membres')
    .select('*')
    .order('created_at', { ascending: false });

  const stats = [
    {
      label: 'Total',
      value: membres?.length || 0,
      icon: Users,
      color: 'blue',
    },
    {
      label: 'Acceptés',
      value: membres?.filter((m) => m.status === 'accepted').length || 0,
      icon: UserCheck,
      color: 'green',
    },
    {
      label: 'En attente',
      value: membres?.filter((m) => m.status === 'pending').length || 0,
      icon: Clock,
      color: 'orange',
    },
    {
      label: 'Rejetés',
      value: membres?.filter((m) => m.status === 'rejected').length || 0,
      icon: UserX,
      color: 'red',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Membres</h1>
        <p className="text-gray-600 mt-1">Gérez les membres de Pont du Futur</p>
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
                        ? 'text-blue-600'
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

      <MembresTable membres={membres || []} />
    </div>
  );
}
