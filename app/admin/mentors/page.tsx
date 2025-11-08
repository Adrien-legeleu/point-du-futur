import MentorsTable from '@/components/mentors/MentorsTable';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { Heart, UserCheck, UserX, Clock } from 'lucide-react';

export default async function MentorsPage() {
  const supabase = createServerSupabaseClient();

  const { data: mentors, error } = await supabase
    .from('mentors')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching mentors:', error);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Mentors</h1>
        <p className="text-gray-600 mt-1">
          Gérez les mentors bénévoles de Pont du Futur
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            label: 'Total',
            value: mentors?.length || 0,
            icon: Heart,
            color: 'blue',
          },
          {
            label: 'Actifs',
            value: mentors?.filter((m) => m.status === 'active').length || 0,
            icon: UserCheck,
            color: 'green',
          },
          {
            label: 'En attente',
            value: mentors?.filter((m) => m.status === 'pending').length || 0,
            icon: Clock,
            color: 'orange',
          },
          {
            label: 'Mentorés',
            value: mentors?.reduce((sum, m) => sum + m.mentees_count, 0) || 0,
            icon: Heart,
            color: 'purple',
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
      <MentorsTable mentors={mentors || []} />
    </div>
  );
}
