'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

const AddToCalendarButton: any = 'add-to-calendar-button';

type EvenementModalProps = {
  evenement: {
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
    type: string;
    places_disponibles: number | null;
    image_url: string | null;
    lien_inscription: string | null;
  };
  isOpen: boolean;
  onClose: () => void;
};

export default function EvenementModal({
  evenement,
  isOpen,
  onClose,
}: EvenementModalProps) {
  const calendarButtonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && calendarButtonRef.current) {
      // Import dynamique du script add-to-calendar-button
      const script = document.createElement('script');
      script.src =
        'https://cdn.jsdelivr.net/npm/add-to-calendar-button@2/dist/module/index.js';
      script.type = 'module';
      script.async = true;
      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const getTypeColor = (type: string) => {
    const colors = {
      seminaire: 'bg-blue-100 text-blue-700',
      colloque: 'bg-purple-100 text-purple-700',
      atelier: 'bg-green-100 text-green-700',
      rencontre: 'bg-orange-100 text-orange-700',
      conference: 'bg-red-100 text-red-700',
    };
    return colors[type as keyof typeof colors] || colors.seminaire;
  };

  // Format pour add-to-calendar-button
  const startDate = evenement.date_debut;
  const startTime = evenement.heure_debut || '09:00';
  const endDate = evenement.date_fin || evenement.date_debut;
  const endTime = evenement.heure_fin || '18:00';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        >
          {/* Header avec image */}
          <div className="relative h-64 w-full rounded-t-3xl overflow-hidden">
            {evenement.image_url ? (
              <Image
                src={evenement.image_url}
                alt={evenement.titre}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary-500 to-accent-500" />
            )}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
            <div className="absolute bottom-4 left-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(
                  evenement.type
                )}`}
              >
                {evenement.type}
              </span>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {evenement.titre}
            </h2>

            {/* Infos clés */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Date</div>
                  <div className="font-semibold text-gray-900">
                    {formatDate(evenement.date_debut)}
                  </div>
                </div>
              </div>

              {evenement.heure_debut && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Horaire</div>
                    <div className="font-semibold text-gray-900">
                      {evenement.heure_debut}
                      {evenement.heure_fin && ` - ${evenement.heure_fin}`}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Lieu</div>
                  <div className="font-semibold text-gray-900">
                    {evenement.lieu}, {evenement.ville}
                  </div>
                  {evenement.adresse && (
                    <div className="text-sm text-gray-600">
                      {evenement.adresse}
                    </div>
                  )}
                </div>
              </div>

              {evenement.places_disponibles !== null && (
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Places</div>
                    <div className="font-semibold text-gray-900">
                      {evenement.places_disponibles} disponibles
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {evenement.description}
              </p>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row gap-3">
              {evenement.lien_inscription && (
                <a
                  href={evenement.lien_inscription}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  S'inscrire
                  <ArrowRight className="w-5 h-5" />
                </a>
              )}

              <div ref={calendarButtonRef}>
                <AddToCalendarButton
                  name={evenement.titre}
                  description={evenement.description}
                  startDate={startDate}
                  startTime={startTime}
                  endDate={endDate}
                  endTime={endTime}
                  timeZone="Europe/Paris"
                  location={`${evenement.lieu}, ${evenement.ville}${
                    evenement.adresse ? ', ' + evenement.adresse : ''
                  }`}
                  options="Google,Apple,Outlook.com"
                  buttonStyle="round"
                  trigger="click"
                  hideIconButton={true}
                  inline={true}
                  size="3"
                  label="Ajouter au calendrier"
                  lightMode="bodyScheme"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
