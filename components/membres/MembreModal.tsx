'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, MapPin, Calendar, Clock, User } from 'lucide-react';

interface MembreModalProps {
  membre: any;
  onClose: () => void;
}

export default function MembreModal({ membre, onClose }: MembreModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-[2rem] p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Détails du membre
            </h2>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Identity */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Identité
              </h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Nom complet:</span>
                  <p className="font-semibold text-gray-900 mt-1">
                    {membre.prenom} {membre.nom}
                  </p>
                </div>
                {membre.age && (
                  <div>
                    <span className="text-gray-600">Âge:</span>
                    <p className="font-semibold text-gray-900 mt-1">
                      {membre.age} ans
                    </p>
                  </div>
                )}
                {membre.ville && (
                  <div>
                    <span className="text-gray-600">Ville:</span>
                    <p className="font-semibold text-gray-900 mt-1 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {membre.ville}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4">Contact</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4 text-primary-blue" />

                  <a
                    href={`mailto:${membre.email}`}
                    className="hover:text-primary-blue transition-colors"
                  >
                    {membre.email}
                  </a>
                </div>
                {membre.telephone && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-primary-green" />
                    <a
                      href={`tel:${membre.telephone}`}
                      className="hover:text-primary-green transition-colors"
                    >
                      {membre.telephone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Situation */}
            {membre.situation && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">Situation</h3>
                <p className="text-gray-700 text-sm">{membre.situation}</p>
              </div>
            )}

            {/* Motivation */}
            {membre.motivation && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">Motivation</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {membre.motivation}
                </p>
              </div>
            )}

            {/* Disponibilité */}
            {membre.disponibilite && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Disponibilité
                </h3>
                <p className="text-gray-700 text-sm">{membre.disponibilite}</p>
              </div>
            )}

            {/* Date d'inscription */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Date d'inscription
              </h3>
              <p className="text-gray-700 text-sm">
                {new Date(membre.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex gap-3">
            <a
              href={`mailto:${membre.email}`}
              className="flex-1 py-3 bg-primary-blue text-white rounded-xl font-semibold text-center hover:bg-primary-blue/90 transition-colors"
            >
              Envoyer un email
            </a>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
            >
              Fermer
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
