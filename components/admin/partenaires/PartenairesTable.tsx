'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Trash2, Mail, Phone, Globe, Building } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartenairesTable({
  partenaires,
}: {
  partenaires: any[];
}) {
  const [loading, setLoading] = useState(false);
  const [localPartenaires, setLocalPartenaires] = useState(partenaires);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoading(true);
    const { error } = await supabase
      .from('partenaires')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setLocalPartenaires((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
      );
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) return;

    setLoading(true);
    const { error } = await supabase.from('partenaires').delete().eq('id', id);

    if (!error) {
      setLocalPartenaires((prev) => prev.filter((p) => p.id !== id));
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
                Organisation
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Type
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
            {localPartenaires.map((partenaire) => (
              <motion.tr
                key={partenaire.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {partenaire.nom_organisation}
                      </div>
                      <div className="text-sm text-gray-500">
                        {partenaire.secteur || 'N/A'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1 text-sm">
                    <div className="font-medium text-gray-900">
                      {partenaire.prenom_contact} {partenaire.nom_contact}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      {partenaire.email_contact}
                    </div>
                    {partenaire.telephone_contact && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        {partenaire.telephone_contact}
                      </div>
                    )}
                    {partenaire.site_web && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Globe className="w-4 h-4" />
                        <a
                          href={partenaire.site_web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:underline"
                        >
                          Site web
                        </a>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    {partenaire.type_organisation || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={partenaire.status}
                    onChange={(e) =>
                      handleStatusChange(partenaire.id, e.target.value)
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
                      onClick={() => handleDelete(partenaire.id)}
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

      {localPartenaires.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Aucun partenaire pour le moment
        </div>
      )}
    </div>
  );
}
('use client');

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Trash2, Mail, Phone, Globe, Building } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PartenairesTable({
  partenaires,
}: {
  partenaires: any[];
}) {
  const [loading, setLoading] = useState(false);
  const [localPartenaires, setLocalPartenaires] = useState(partenaires);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoading(true);
    const { error } = await supabase
      .from('partenaires')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setLocalPartenaires((prev) =>
        prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
      );
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce partenaire ?')) return;

    setLoading(true);
    const { error } = await supabase.from('partenaires').delete().eq('id', id);

    if (!error) {
      setLocalPartenaires((prev) => prev.filter((p) => p.id !== id));
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
                Organisation
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Type
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
            {localPartenaires.map((partenaire) => (
              <motion.tr
                key={partenaire.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center text-white font-semibold">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {partenaire.nom_organisation}
                      </div>
                      <div className="text-sm text-gray-500">
                        {partenaire.secteur || 'N/A'}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-1 text-sm">
                    <div className="font-medium text-gray-900">
                      {partenaire.prenom_contact} {partenaire.nom_contact}
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      {partenaire.email_contact}
                    </div>
                    {partenaire.telephone_contact && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        {partenaire.telephone_contact}
                      </div>
                    )}
                    {partenaire.site_web && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <Globe className="w-4 h-4" />
                        <a
                          href={partenaire.site_web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:underline"
                        >
                          Site web
                        </a>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
                    {partenaire.type_organisation || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={partenaire.status}
                    onChange={(e) =>
                      handleStatusChange(partenaire.id, e.target.value)
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
                      onClick={() => handleDelete(partenaire.id)}
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

      {localPartenaires.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Aucun partenaire pour le moment
        </div>
      )}
    </div>
  );
}
