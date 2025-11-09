'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Edit,
  Trash2,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import MembreModal from './MembreModal';

interface Membre {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  age: number | null;
  ville: string | null;
  situation: string | null;
  motivation: string | null;
  disponibilite: string | null;
  status: string;
  mentor_id: string | null;
  mentors?: { nom: string; prenom: string } | null;
  created_at: string;
}

export default function MembresTable({ membres }: { membres: Membre[] }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMembre, setSelectedMembre] = useState<Membre | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Filtrer les membres
  const filteredMembres = membres.filter((membre) => {
    const matchSearch =
      membre.nom.toLowerCase().includes(search.toLowerCase()) ||
      membre.prenom.toLowerCase().includes(search.toLowerCase()) ||
      membre.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      filterStatus === 'all' || membre.status === filterStatus;

    return matchSearch && matchStatus;
  });

  // Changer le statut
  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdating(id);
    const { error } = await supabase
      .from('membres')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      alert('Erreur lors de la mise à jour');
      console.error(error);
    } else {
      router.refresh();
    }
    setUpdating(null);
  };

  // Supprimer
  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) return;

    setDeleting(id);
    const { error } = await supabase.from('membres').delete().eq('id', id);

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
        pending: {
          color: 'bg-orange-100 text-orange-700',
          label: 'En attente',
          icon: Clock,
        },
        approved: {
          color: 'bg-blue-100 text-blue-700',
          label: 'Approuvé',
          icon: CheckCircle,
        },
        active: {
          color: 'bg-green-100 text-green-700',
          label: 'Actif',
          icon: CheckCircle,
        },
        inactive: {
          color: 'bg-gray-100 text-gray-700',
          label: 'Inactif',
          icon: XCircle,
        },
        rejected: {
          color: 'bg-red-100 text-red-700',
          label: 'Rejeté',
          icon: XCircle,
        },
      };

    const badge = badges[status] || badges.pending;
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

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
        {/* Filters */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un membre..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-trust focus:ring-2 focus:ring-trust/20 outline-none transition-all"
              />
            </div>

            {/* Status filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-trust focus:ring-2 focus:ring-trust/20 outline-none transition-all"
            >
              <option value="all">Tous les statuts</option>
              <option value="pending">En attente</option>
              <option value="approved">Approuvés</option>
              <option value="active">Actifs</option>
              <option value="inactive">Inactifs</option>
              <option value="rejected">Rejetés</option>
            </select>
          </div>

          <p className="text-sm text-gray-600 mt-4">
            {filteredMembres.length} membre(s) trouvé(s)
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Membre
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Mentor
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
              {filteredMembres.map((membre, index) => (
                <motion.tr
                  key={membre.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {membre.prenom} {membre.nom}
                      </div>
                      {membre.situation && (
                        <div className="text-sm text-gray-600 mt-1">
                          {membre.situation}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        {membre.email}
                      </div>
                      {membre.telephone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          {membre.telephone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1 text-sm text-gray-600">
                      {membre.age && <div>Âge: {membre.age} ans</div>}
                      {membre.ville && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {membre.ville}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {membre.mentors ? (
                      <div className="text-sm">
                        <div className="font-medium text-gray-900">
                          {membre.mentors.prenom} {membre.mentors.nom}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Non assigné</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      {getStatusBadge(membre.status)}
                      {membre.status === 'pending' && (
                        <div className="flex gap-1">
                          <button
                            onClick={() =>
                              handleStatusChange(membre.id, 'approved')
                            }
                            disabled={updating === membre.id}
                            className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold hover:bg-green-200 transition-colors disabled:opacity-50"
                          >
                            Approuver
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(membre.id, 'rejected')
                            }
                            disabled={updating === membre.id}
                            className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-semibold hover:bg-red-200 transition-colors disabled:opacity-50"
                          >
                            Rejeter
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setSelectedMembre(membre)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(membre.id)}
                        disabled={deleting === membre.id}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deleting === membre.id ? (
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

          {filteredMembres.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun membre trouvé</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal détails */}
      {selectedMembre && (
        <MembreModal
          membre={selectedMembre}
          onClose={() => setSelectedMembre(null)}
        />
      )}
    </>
  );
}
