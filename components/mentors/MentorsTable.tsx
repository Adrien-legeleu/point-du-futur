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
  Briefcase,
  Users,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import MentorModal from './MentorModal';

interface Mentor {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string | null;
  age: number | null;
  ville: string | null;
  experience: string | null;
  motivation: string | null;
  competences: string | null;
  disponibilite: string | null;
  status: string;
  mentees_count: number;
  max_mentees: number;
  created_at: string;
}

export default function MentorsTable({ mentors }: { mentors: Mentor[] }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  // Filtrer
  const filteredMentors = mentors.filter((mentor) => {
    const matchSearch =
      mentor.nom.toLowerCase().includes(search.toLowerCase()) ||
      mentor.prenom.toLowerCase().includes(search.toLowerCase()) ||
      mentor.email.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      filterStatus === 'all' || mentor.status === filterStatus;

    return matchSearch && matchStatus;
  });

  // Changer le statut
  const handleStatusChange = async (id: string, newStatus: string) => {
    setUpdating(id);
    const { error } = await supabase
      .from('mentors')
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
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce mentor ?')) return;

    setDeleting(id);
    const { error } = await supabase.from('mentors').delete().eq('id', id);

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
                placeholder="Rechercher un mentor..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all"
              />
            </div>

            {/* Status filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all"
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
            {filteredMentors.length} mentor(s) trouvé(s)
          </p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Mentor
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Contact
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Expérience
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                  Mentorés
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
              {filteredMentors.map((mentor, index) => (
                <motion.tr
                  key={mentor.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {mentor.prenom} {mentor.nom}
                      </div>
                      {mentor.ville && (
                        <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {mentor.ville}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        {mentor.email}
                      </div>
                      {mentor.telephone && (
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          {mentor.telephone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-2 text-sm text-gray-600">
                      <Briefcase className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <div className="line-clamp-2">
                        {mentor.experience || 'Non renseigné'}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary-green" />
                      <span className="font-semibold text-gray-900">
                        {mentor.mentees_count}
                      </span>
                      <span className="text-gray-400">/</span>
                      <span className="text-gray-600">
                        {mentor.max_mentees}
                      </span>
                    </div>
                    {mentor.mentees_count >= mentor.max_mentees && (
                      <span className="inline-block mt-1 px-2 py-0.5 bg-orange-100 text-orange-700 rounded text-xs font-semibold">
                        Complet
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      {getStatusBadge(mentor.status)}
                      {mentor.status === 'pending' && (
                        <div className="flex gap-1">
                          <button
                            onClick={() =>
                              handleStatusChange(mentor.id, 'active')
                            }
                            disabled={updating === mentor.id}
                            className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold hover:bg-green-200 transition-colors disabled:opacity-50"
                          >
                            Approuver
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(mentor.id, 'inactive')
                            }
                            disabled={updating === mentor.id}
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
                        onClick={() => setSelectedMentor(mentor)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(mentor.id)}
                        disabled={deleting === mentor.id}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      >
                        {deleting === mentor.id ? (
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

          {filteredMentors.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Aucun mentor trouvé</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal détails */}
      {selectedMentor && (
        <MentorModal
          mentor={selectedMentor}
          onClose={() => setSelectedMentor(null)}
        />
      )}
    </>
  );
}
