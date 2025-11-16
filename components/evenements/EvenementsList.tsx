'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';
import Image from 'next/image';

export default function EvenementsList({ evenements }: { evenements: any[] }) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getTypeBadge = (type: string) => {
    const styles = {
      seminaire: 'bg-blue-100 text-blue-700',
      colloque: 'bg-purple-100 text-purple-700',
      atelier: 'bg-green-100 text-green-700',
      rencontre: 'bg-orange-100 text-orange-700',
      conference: 'bg-red-100 text-red-700',
    };
    return styles[type as keyof typeof styles] || styles.seminaire;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {evenements.map((evenement, index) => (
          <motion.div
            key={evenement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
          >
            {evenement.image_url && (
              <div className="relative h-48">
                <Image
                  src={evenement.image_url}
                  alt={evenement.titre}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeBadge(
                      evenement.type
                    )}`}
                  >
                    {evenement.type}
                  </span>
                </div>
              </div>
            )}

            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {evenement.titre}
              </h3>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(evenement.date_debut)}
                </div>
                {evenement.heure_debut && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {evenement.heure_debut}
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {evenement.lieu}, {evenement.ville}
                </div>
                {evenement.places_disponibles !== null && (
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    {evenement.places_disponibles} places disponibles
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                {evenement.description}
              </p>

              {evenement.lien_inscription && (
                <a
                  href={evenement.lien_inscription}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  S'inscrire
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {evenements.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">
            Aucun événement programmé pour le moment
          </p>
        </div>
      )}
    </div>
  );
}
