'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, GraduationCap } from 'lucide-react';

export default function MembresList({ membres }: { membres: any[] }) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {membres.map((membre, index) => (
          <motion.div
            key={membre.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white text-xl font-bold">
                {membre.prenom[0]}
                {membre.nom[0]}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {membre.prenom} {membre.nom}
                </h3>
                <p className="text-sm text-gray-500">
                  {membre.etablissement || 'Étudiant'}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              {membre.ville && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {membre.ville}
                </div>
              )}
              {membre.niveau_etude && (
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  {membre.niveau_etude}
                </div>
              )}
            </div>

            {membre.besoins && (
              <p className="mt-4 text-sm text-gray-600 line-clamp-3">
                {membre.besoins}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {membres.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Aucun membre pour le moment</p>
        </div>
      )}
    </div>
  );
}
