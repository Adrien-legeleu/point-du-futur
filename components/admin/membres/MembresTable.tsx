'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import {
  Edit,
  Trash2,
  Mail,
  Phone,
  MapPin,
  CheckCircle,
  XCircle,
  Clock,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function MembresTable({ membres }: { membres: any[] }) {
  const [loading, setLoading] = useState(false);
  const [localMembres, setLocalMembres] = useState(membres);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoading(true);
    const { error } = await supabase
      .from('membres')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setLocalMembres((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
      );
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) return;

    setLoading(true);
    const { error } = await supabase.from('membres').delete().eq('id', id);

    if (!error) {
      setLocalMembres((prev) => prev.filter((m) => m.id !== id));
    }
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-orange-100 text-orange-700',
      accepted: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    };
    const icons = {
      pending: Clock,
      accepted: CheckCircle,
      rejected: XCircle,
    };
    const labels = {
      pending: 'En attente',
      accepted: 'Accepté',
      rejected: 'Rejeté',
    };

    const Icon = icons[status as keyof typeof icons] || Clock;
    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
          styles[status as keyof typeof styles]
        }`}
      >
        <Icon className="w-3 h-3" />
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Membre
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Infos
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
            {localMembres.map((membre) => (
              <motion.tr
                key={membre.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold">
                      {membre.prenom[0]}
                      {membre.nom[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {membre.prenom} {membre.nom}
                      </div>
                      <div className="text-sm text-gray-500">
                        {membre.etablissement || 'N/A'}
                      </div>
                    </div>
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
                    {membre.ville && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {membre.ville}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Âge:</span>{' '}
                      {membre.age || 'N/A'}
                    </div>
                    <div>
                      <span className="font-medium">Niveau:</span>{' '}
                      {membre.niveau_etude || 'N/A'}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={membre.status}
                    onChange={(e) =>
                      handleStatusChange(membre.id, e.target.value)
                    }
                    disabled={loading}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="pending">En attente</option>
                    <option value="accepted">Accepté</option>
                    <option value="rejected">Rejeté</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleDelete(membre.id)}
                      disabled={loading}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {localMembres.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Aucun membre pour le moment
        </div>
      )}
    </div>
  );
}
