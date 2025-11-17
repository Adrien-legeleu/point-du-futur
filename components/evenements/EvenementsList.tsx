'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import EvenementModal from './EvenementModal';

type Evenement = {
  id: string;
  titre: string;
  description: string;
  date_debut: string;
  date_fin: string | null;
  heure_debut: string | null;
  heure_fin: string | null;
  lieu: string;
  ville: string;
  adresse: string | null;
  type: 'seminaire' | 'colloque' | 'atelier' | 'rencontre' | 'conference';
  places_max: number | null;
  places_disponibles: number | null;
  image_url: string | null;
  lien_inscription: string | null;
  status: string;
};

type Props = {
  evenements: Evenement[];
};

export default function EvenementsList({ evenements }: Props) {
  const [selectedEvenement, setSelectedEvenement] = useState<Evenement | null>(
    null
  );

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

  const getTypeLabel = (type: string) => {
    const labels = {
      seminaire: 'Séminaire',
      colloque: 'Colloque',
      atelier: 'Atelier',
      rencontre: 'Rencontre',
      conference: 'Conférence',
    };
    return labels[type as keyof typeof labels] || type;
  };

  if (!evenements || evenements.length === 0) {
    return (
      <section className="py-20 px-6 bg-gradient-to-b from-primary-50 to-zinc-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
            <Calendar className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Aucun événement programmé
          </h2>
          <p className="text-gray-600 max-w-md mx-auto">
            Nous préparons de nouveaux événements passionnants. Revenez bientôt
            !
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="py-20 px-6 bg-gradient-to-b from-primary-50 to-zinc-50">
        <div className="max-w-7xl mx-auto">
          <div className="columns-2 lg:columns-3 gap-8 space-y-8">
            {evenements.map((evenement, index) => (
              <motion.div
                key={evenement.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="break-inside-avoid mb-8"
              >
                <div
                  className="group cursor-pointer"
                  onClick={() => setSelectedEvenement(evenement)}
                >
                  {evenement.image_url && (
                    <div className="relative w-full overflow-hidden rounded-2xl bg-gray-100 mb-4">
                      <Image
                        src={evenement.image_url}
                        alt={evenement.titre}
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeBadge(
                            evenement.type
                          )}`}
                        >
                          {getTypeLabel(evenement.type)}
                        </span>
                      </div>
                    </div>
                  )}

                  <div>
                    <h3 className="sm:text-2xl text-xl md:text-3xl font-bold text-primary-600/90 mb-3 group-hover:text-primary-700 transition-colors">
                      {evenement.titre}
                    </h3>

                    <div className="space-y-2 sm:text-sm text-xs text-neutral-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                        <span>{formatDate(evenement.date_debut)}</span>
                      </div>

                      {evenement.heure_debut && (
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 flex-shrink-0" />
                          <span>{evenement.heure_debut}</span>
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span>
                          {evenement.lieu}, {evenement.ville}
                        </span>
                      </div>

                      {evenement.places_disponibles !== null && (
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 flex-shrink-0" />
                          <span>
                            {evenement.places_disponibles} places disponibles
                          </span>
                        </div>
                      )}
                    </div>

                    <p className="text-neutral-600 text-sm line-clamp-3 mb-4">
                      {evenement.description}
                    </p>

                    <div className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all">
                      Voir les détails
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedEvenement && (
        <EvenementModal
          evenement={selectedEvenement}
          isOpen={!!selectedEvenement}
          onClose={() => setSelectedEvenement(null)}
        />
      )}
    </>
  );
}
