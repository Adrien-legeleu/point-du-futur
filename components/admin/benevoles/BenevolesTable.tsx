'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Trash2,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Award,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import BenevoleModal from './BenevoleModal';

interface Benevole {
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
}

export default function BenevolesTable({
  benevoles,
}: {
  benevoles: Benevole[];
}) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedBenevole, setSelectedBenevole] = useState<Benevole | null>(
    null
  );
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  const filteredBenevoles = benevoles.filter((benevole) => {
    const matchSearch =
      benevole.nom.toLowerCase().includes(search.toLowerCase()) ||
      benevole.prenom.toLowerCase().includes(search.toLowerCase()) ||
      benevole.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      filterStatus === 'all' || benevole.status === filterStatus;

    return matchSearch && matchStatus;
  });

  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdating(id);
    const { error } = await supabase
      .from('benevoles')
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

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce bénévole ?')) return;

    setDeleting(id);
    const { error } = await supabase.from('benevoles').delete().eq('id', id);

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
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher un bénévole..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-trust focus:ring-2 focus:ring-trust/20 outline-none transition-all"
              />
            </div>

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
            {filteredBenevoles.length} bénévole(s) trouvé(s)
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Bénévole
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Compétences
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
              {filteredBenevoles.map((benevole, index) => (
                <motion.tr
                  key={benevole.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {benevole.prenom} {benevole.nom}
                      </div>
                      {benevole.ville && (
                        <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {benevole.ville}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        {benevole.email}
                      </div>
                      {benevole.telephone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          {benevole.telephone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div className="line-clamp-2">
                        {benevole.competences || 'Non renseigné'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      {getStatusBadge(benevole.status)}
                      {benevole.status === 'pending' && (
                        <div className="flex gap-1">
                          <button
                            onClick={() =>
                              handleStatusChange(benevole.id, 'approved')
                            }
                            disabled={updating === benevole.id}
                            className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold hover:bg-green-200 transition-colors disabled:opacity-50"
                          >
                            Approuver
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(benevole.id, 'rejected')
                            }
                            disabled={updating === benevole.id}
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
                        onClick={() => setSelectedBenevole(benevole)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(benevole.id)}
                        disabled={deleting === benevole.id}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deleting === benevole.id ? (
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

          {filteredBenevoles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun bénévole trouvé</p>
            </div>
          )}
        </div>
      </div>

      {selectedBenevole && (
        <BenevoleModal
          benevole={selectedBenevole}
          onClose={() => setSelectedBenevole(null)}
        />
      )}
    </>
  );
}
