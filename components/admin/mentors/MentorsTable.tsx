'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { Trash2, Mail, Phone, MapPin, Briefcase, Linkedin } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MentorsTable({ mentors }: { mentors: any[] }) {
  const [loading, setLoading] = useState(false);
  const [localMentors, setLocalMentors] = useState(mentors);

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoading(true);
    const { error } = await supabase
      .from('mentors')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      setLocalMentors((prev) =>
        prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
      );
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce mentor ?')) return;

    setLoading(true);
    const { error } = await supabase.from('mentors').delete().eq('id', id);

    if (!error) {
      setLocalMentors((prev) => prev.filter((m) => m.id !== id));
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
                Mentor
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">
                Expertise
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
            {localMentors.map((mentor) => (
              <motion.tr
                key={mentor.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-semibold">
                      {mentor.prenom[0]}
                      {mentor.nom[0]}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        {mentor.prenom} {mentor.nom}
                      </div>
                      <div className="text-sm text-gray-500">
                        {mentor.profession || 'N/A'}
                      </div>
                    </div>
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
                    {mentor.ville && (
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        {mentor.ville}
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      {mentor.domaine_expertise || 'N/A'}
                    </div>
                    {mentor.linkedin && (
                      <div className="flex items-center gap-2 mt-1">
                        <Linkedin className="w-4 h-4" />
                        <a
                          href={mentor.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary-600 hover:underline"
                        >
                          LinkedIn
                        </a>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={mentor.status}
                    onChange={(e) =>
                      handleStatusChange(mentor.id, e.target.value)
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
                      onClick={() => handleDelete(mentor.id)}
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

      {localMentors.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          Aucun mentor pour le moment
        </div>
      )}
    </div>
  );
}
