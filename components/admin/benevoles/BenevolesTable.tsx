'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Trash2, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BenevolesTable({ benevoles }: { benevoles: any[] }) {
  const [loading, setLoading] = useState(false);
  const [localBenevoles, setLocalBenevoles] = useState(benevoles);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoading(true);
    const { error } = await supabase
      .from('benevoles')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setLocalBenevoles((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce bénévole ?')) return;

    setLoading(true);
    const { error } = await supabase.from('benevoles').delete().eq('id', id);

    if (!error) {
      setLocalBenevoles((prev) => prev.filter((b) => b.id !== id));
    }
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
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
            {localBenevoles.map((benevole) => (
              <motion.tr
                key={benevole.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-semibold text-gray-900">
                        {benevole.prenom} {benevole.nom}
                      </div>
                      <div className="text-sm text-gray-500">
                        {benevole.profession || 'N/A'}
                      </div>
                    </div>
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
                    {benevole.ville && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {benevole.ville}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">
                    {benevole.competences || 'N/A'}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={benevole.status}
                    onChange={(e) =>
                      handleStatusChange(benevole.id, e.target.value)
                    }
                    disabled={loading}
                    className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-primary-500 outline-none"
                  >
                    <option value="pending">En attente</option>
                    <option value="active">Actif</option>
                    <option value="inactive">Inactif</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleDelete(benevole.id)}
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

      {localBenevoles.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Aucun bénévole pour le moment
        </div>
      )}
    </div>
  );
}
