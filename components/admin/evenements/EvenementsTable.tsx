'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Users,
  Edit,
  Trash2,
  Search,
  Clock,
  CheckCircle,
} from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface Evenement {
  id: string;
  titre: string;
  slug: string;
  description: string;
  date_debut: string;
  date_fin: string | null;
  lieu: string;
  type: string | null;
  places_total: number | null;
  places_restantes: number | null;
  status: string;
  created_at: string;
}

export default function EvenementsTable({
  evenements,
}: {
  evenements: Evenement[];
}) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleting, setDeleting] = useState<string | null>(null);

  const filteredEvenements = evenements.filter((evenement) => {
    const matchSearch =
      evenement.titre.toLowerCase().includes(search.toLowerCase()) ||
      evenement.lieu.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      filterStatus === 'all' || evenement.status === filterStatus;

    return matchSearch && matchStatus;
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) return;

    setDeleting(id);
    const { error } = await supabase.from('evenements').delete().eq('id', id);

    if (error) {
      alert('Erreur lors de la suppression');
      console.error(error);
    } else {
      router.refresh();
    }
    setDeleting(null);
  };

  const getStatusBadge = (status: string) => {
    const badges: Record<string, { color: string; label: string; icon: any }> =
      {
        upcoming: {
          color: 'bg-orange-100 text-orange-700',
          label: 'À venir',
          icon: Clock,
        },
        ongoing: {
          color: 'bg-green-100 text-green-700',
          label: 'En cours',
          icon: CheckCircle,
        },
        completed: {
          color: 'bg-gray-100 text-gray-700',
          label: 'Terminé',
          icon: CheckCircle,
        },
        cancelled: {
          color: 'bg-red-100 text-red-700',
          label: 'Annulé',
          icon: CheckCircle,
        },
      };

    const badge = badges[status] || badges.upcoming;
    const Icon = badge.icon;

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${badge.color}`}
      >
        <Icon className="w-3 h-3" />
        {badge.label}
      </span>
    );
  };

  const getTypeLabel = (type: string | null) => {
    const types: Record<string, string> = {
      seminaire: 'Séminaire',
      atelier: 'Atelier',
      colloque: 'Colloque',
      networking: 'Networking',
      autre: 'Autre',
    };
    return type ? types[type] : 'Non défini';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Filters */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un événement..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all"
          >
            <option value="all">Tous les statuts</option>
            <option value="upcoming">À venir</option>
            <option value="ongoing">En cours</option>
            <option value="completed">Terminés</option>
            <option value="cancelled">Annulés</option>
          </select>
        </div>

        <p className="text-sm text-gray-600 mt-4">
          {filteredEvenements.length} événement(s) trouvé(s)
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Événement
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Date
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Lieu
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Places
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Statut
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredEvenements.map((evenement, index) => (
              <motion.tr
                key={evenement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div>
                    <div className="font-semibold text-gray-900 line-clamp-1">
                      {evenement.titre}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {getTypeLabel(evenement.type)}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(evenement.date_debut).toLocaleDateString(
                      'fr-FR',
                      {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      }
                    )}
                  </div>
                  {evenement.date_fin && (
                    <div className="text-xs text-gray-500 mt-1">
                      au{' '}
                      {new Date(evenement.date_fin).toLocaleDateString(
                        'fr-FR',
                        {
                          day: 'numeric',
                          month: 'short',
                        }
                      )}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {evenement.lieu}
                  </div>
                </td>
                <td className="px-6 py-4">
                  {evenement.places_total ? (
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary-blue" />
                      <span className="text-sm font-semibold text-gray-900">
                        {evenement.places_restantes || 0}
                      </span>
                      <span className="text-gray-400">/</span>
                      <span className="text-sm text-gray-600">
                        {evenement.places_total}
                      </span>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">Illimité</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(evenement.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/evenements/${evenement.id}`}>
                      <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(evenement.id)}
                      disabled={deleting === evenement.id}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {deleting === evenement.id ? (
                        <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 text-red-600" />
                      )}
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredEvenements.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun événement trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}
