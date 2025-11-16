'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Edit, Trash2, Search } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

type Evenement = {
  id: string;
  titre: string;
  description: string;
  date_debut: string;
  lieu: string;
  ville: string;
  type: string;
  status: string;
  places_disponibles: number | null;
  image_url: string | null;
  created_at: string;
};

type Props = {
  evenements: Evenement[];
};

export default function EvenementsTable({ evenements }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');

  const filteredEvenements = evenements.filter((evenement) => {
    const matchesSearch =
      evenement.titre.toLowerCase().includes(search.toLowerCase()) ||
      evenement.ville.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || evenement.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
      return;
    }

    setLoading(id);
    try {
      const { error } = await supabase.from('evenements').delete().eq('id', id);

      if (error) throw error;

      router.refresh();
    } catch (error) {
      console.error('Error deleting evenement:', error);
      alert('Erreur lors de la suppression');
    } finally {
      setLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-orange-100 text-orange-700';
      case 'archived':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'seminaire':
        return 'bg-blue-100 text-blue-700';
      case 'colloque':
        return 'bg-purple-100 text-purple-700';
      case 'atelier':
        return 'bg-green-100 text-green-700';
      case 'rencontre':
        return 'bg-orange-100 text-orange-700';
      case 'conference':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Filtres */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Rechercher un événement..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
            />
          </div>

          {/* Status filter */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-3 rounded-xl border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
          >
            <option value="all">Tous les statuts</option>
            <option value="published">Publiés</option>
            <option value="draft">Brouillons</option>
            <option value="archived">Archivés</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
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
                Type
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
            {filteredEvenements.map((evenement) => (
              <motion.tr
                key={evenement.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    {evenement.image_url && (
                      <img
                        src={evenement.image_url}
                        alt={evenement.titre}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <div className="font-semibold text-gray-900 line-clamp-1">
                        {evenement.titre}
                      </div>
                      <div className="text-sm text-gray-500 line-clamp-1">
                        {evenement.description}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {new Date(evenement.date_debut).toLocaleDateString('fr-FR')}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    {evenement.ville}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
                      evenement.type
                    )}`}
                  >
                    {evenement.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600">
                    {evenement.places_disponibles ?? '∞'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      evenement.status
                    )}`}
                  >
                    {evenement.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/evenements/${evenement.id}`}
                      className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                      title="Modifier"
                    >
                      <Edit className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                    </Link>
                    <button
                      onClick={() => handleDelete(evenement.id)}
                      disabled={loading === evenement.id}
                      className="p-2 hover:bg-red-50 rounded-lg transition-colors group disabled:opacity-50"
                      title="Supprimer"
                    >
                      {loading === evenement.id ? (
                        <div className="w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-600" />
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
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Aucun événement trouvé</p>
          </div>
        )}
      </div>
    </div>
  );
}
