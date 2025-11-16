'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Trash2, Mail, Phone, Eye, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DemandesTable({ demandes }: { demandes: any[] }) {
  const [loading, setLoading] = useState(false);
  const [localDemandes, setLocalDemandes] = useState(demandes);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoading(true);
    const { error } = await supabase
      .from('demandes_infos')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setLocalDemandes((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
      );
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette demande ?')) return;

    setLoading(true);
    const { error } = await supabase
      .from('demandes_infos')
      .delete()
      .eq('id', id);

    if (!error) {
      setLocalDemandes((prev) => prev.filter((d) => d.id !== id));
    }
    setLoading(false);
  };

  const getTypeBadge = (type: string) => {
    const styles = {
      membre: 'bg-blue-100 text-blue-700',
      mentor: 'bg-green-100 text-green-700',
      benevole: 'bg-orange-100 text-orange-700',
      partenaire: 'bg-purple-100 text-purple-700',
      information: 'bg-gray-100 text-gray-700',
    };
    return styles[type as keyof typeof styles] || styles.information;
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      new: 'bg-blue-100 text-blue-700',
      read: 'bg-yellow-100 text-yellow-700',
      processed: 'bg-green-100 text-green-700',
      archived: 'bg-gray-100 text-gray-700',
    };
    const labels = {
      new: 'Nouveau',
      read: 'Lu',
      processed: 'Traité',
      archived: 'Archivé',
    };
    return {
      style: styles[status as keyof typeof styles],
      label: labels[status as keyof typeof labels],
    };
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Message
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
            {localDemandes.map((demande) => {
              const statusInfo = getStatusBadge(demande.status);
              return (
                <motion.tr
                  key={demande.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                        {demande.prenom[0]}
                        {demande.nom[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {demande.prenom} {demande.nom}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-2">
                          <Mail className="w-3 h-3" />
                          {demande.email}
                        </div>
                        {demande.telephone && (
                          <div className="text-sm text-gray-500 flex items-center gap-2">
                            <Phone className="w-3 h-3" />
                            {demande.telephone}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeBadge(
                        demande.type_demande
                      )}`}
                    >
                      {demande.type_demande}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-600 line-clamp-2 max-w-xs">
                      {demande.message}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={demande.status}
                      onChange={(e) =>
                        handleStatusChange(demande.id, e.target.value)
                      }
                      disabled={loading}
                      className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-primary-500 outline-none"
                    >
                      <option value="new">Nouveau</option>
                      <option value="read">Lu</option>
                      <option value="processed">Traité</option>
                      <option value="archived">Archivé</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDelete(demande.id)}
                        disabled={loading}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {localDemandes.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Aucune demande pour le moment
        </div>
      )}
    </div>
  );
}
