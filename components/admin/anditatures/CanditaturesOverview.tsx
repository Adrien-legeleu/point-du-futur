'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Mail, User, Clock } from 'lucide-react';

interface CandidaturesOverviewProps {
  membres: any[];
  mentors: any[];
  benevoles: any[];
  partenaires: any[];
}

export default function CandidaturesOverview({
  membres,
  mentors,
  benevoles,
  partenaires,
}: CandidaturesOverviewProps) {
  const [filter, setFilter] = useState('pending'); // 'all', 'pending', 'approved', 'rejected'

  // Combiner toutes les candidatures
  const allCandidatures = [
    ...membres.map((m) => ({ ...m, type: 'Membre', color: 'blue' })),
    ...mentors.map((m) => ({ ...m, type: 'Mentor', color: 'green' })),
    ...benevoles.map((b) => ({ ...b, type: 'Bénévole', color: 'orange' })),
    ...partenaires.map((p) => ({ ...p, type: 'Partenaire', color: 'purple' })),
  ]
    .filter((c) => (filter === 'all' ? true : c.status === filter))
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-orange-100 text-orange-700',
      approved: 'bg-blue-100 text-blue-700',
      active: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
      inactive: 'bg-gray-100 text-gray-700',
    };
    return colors[status] || colors.pending;
  };

  const getTypeColor = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-primary-blue/10 text-primary-blue',
      green: 'bg-green-100 text-green-700',
      orange: 'bg-orange-100 text-orange-700',
      purple: 'bg-purple-100 text-purple-700',
    };
    return colors[color];
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      {/* Filters */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex gap-2">
          {[
            { value: 'all', label: 'Toutes' },
            { value: 'pending', label: 'En attente' },
            { value: 'approved', label: 'Approuvées' },
            { value: 'rejected', label: 'Rejetées' },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                filter === f.value
                  ? 'bg-primary-blue text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <p className="text-sm text-gray-600 mt-4">
          {allCandidatures.length} candidature(s) trouvée(s)
        </p>
      </div>

      {/* Liste */}
      <div className="divide-y divide-gray-100">
        {allCandidatures.slice(0, 50).map((candidature, index) => (
          <motion.div
            key={`${candidature.type}-${candidature.id}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
                      candidature.color
                    )}`}
                  >
                    {candidature.type}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                      candidature.status
                    )}`}
                  >
                    {candidature.status === 'pending'
                      ? 'En attente'
                      : candidature.status === 'approved'
                      ? 'Approuvé'
                      : candidature.status === 'active'
                      ? 'Actif'
                      : candidature.status === 'rejected'
                      ? 'Rejeté'
                      : 'Inactif'}
                  </span>
                </div>

                <div className="flex items-center gap-2 mb-1">
                  <User className="w-4 h-4 text-gray-400" />
                  <span className="font-semibold text-gray-900">
                    {candidature.prenom} {candidature.nom}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    {candidature.email}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(candidature.created_at).toLocaleDateString(
                      'fr-FR',
                      {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      }
                    )}
                  </div>
                </div>

                {candidature.motivation && (
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                    {candidature.motivation}
                  </p>
                )}
              </div>

              <a
                href={`/admin/${candidature.type.toLowerCase()}s`}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-semibold transition-colors"
              >
                Voir détails
              </a>
            </div>
          </motion.div>
        ))}

        {allCandidatures.length === 0 && (
          <div className="text-center py-12">
            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aucune candidature trouvée</p>
          </div>
        )}
      </div>
    </div>
  );
}
