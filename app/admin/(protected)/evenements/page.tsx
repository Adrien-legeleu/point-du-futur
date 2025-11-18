import { createServerSupabaseClient } from '@/lib/supabase/server';
import EvenementsTable from '@/components/admin/evenements/EvenementsTable';
import Link from 'next/link';
import { Plus, Calendar, CheckCircle, Clock } from 'lucide-react';
import type { Database } from '@/lib/supabase/client';

type Evenement = Database['public']['Tables']['evenements']['Row'];

export default async function EvenementsPage() {
  const supabase = await createServerSupabaseClient();

  const { data: evenements, error } = await supabase
    .from('evenements')
    .select('*')
    .order('date_debut', { ascending: false });

  if (error) {
    console.error('Error fetching evenements:', error);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-5 justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Événements</h1>
          <p className="text-gray-600 mt-1">
            Gérez les événements et séminaires
          </p>
        </div>
        <Link href="/admin/evenements/nouveau">
          <button className="flex items-center max-md:text-sm gap-2 px-6 py-3 bg-primary-600/80 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            <Plus className="w-5 h-5" />
            Nouvel événement
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: 'Total',
            value: evenements?.length || 0,
            icon: Calendar,
            color: 'trust' as const,
          },
          {
            label: 'Publiés',
            value:
              evenements?.filter((e: Evenement) => e.status === 'published')
                .length || 0,
            icon: CheckCircle,
            color: 'future' as const,
          },
          {
            label: 'Brouillons',
            value:
              evenements?.filter((e: Evenement) => e.status === 'draft')
                .length || 0,
            icon: Clock,
            color: 'energy' as const,
          },
          {
            label: 'Archivés',
            value:
              evenements?.filter((e: Evenement) => e.status === 'archived')
                .length || 0,
            icon: CheckCircle,
            color: 'gray' as const,
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    stat.color === 'trust'
                      ? 'bg-trust-100'
                      : stat.color === 'future'
                      ? 'bg-future-100'
                      : stat.color === 'energy'
                      ? 'bg-energy-100'
                      : 'bg-gray-100'
                  }`}
                >
                  <Icon
                    className={`w-6 h-6 ${
                      stat.color === 'trust'
                        ? 'text-trust-600'
                        : stat.color === 'future'
                        ? 'text-future-600'
                        : stat.color === 'energy'
                        ? 'text-energy-600'
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

      {/* Table */}
      <EvenementsTable evenements={evenements || []} />
    </div>
  );
}
