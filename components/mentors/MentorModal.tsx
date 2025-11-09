'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Clock,
  User,
  Briefcase,
  Award,
  Users,
} from 'lucide-react';

interface MentorModalProps {
  mentor: any;
  onClose: () => void;
}

export default function MentorModal({ mentor, onClose }: MentorModalProps) {
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
              Détails du mentor
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
                    {mentor.prenom} {mentor.nom}
                  </p>
                </div>
                {mentor.age && (
                  <div>
                    <span className="text-gray-600">Âge:</span>
                    <p className="font-semibold text-gray-900 mt-1">
                      {mentor.age} ans
                    </p>
                  </div>
                )}
                {mentor.ville && (
                  <div>
                    <span className="text-gray-600">Ville:</span>
                    <p className="font-semibold text-gray-900 mt-1 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {mentor.ville}
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
                  <Mail className="w-4 h-4 text-trust" />
                  <a
                    href={`mailto:${mentor.email}`}
                    className="hover:text-trust transition-colors"
                  >
                    {mentor.email}
                  </a>
                </div>
                {mentor.telephone && (
                  <div className="flex items-center gap-2 text-gray-700">
                    <Phone className="w-4 h-4 text-future" />
                    <a
                      href={`tel:${mentor.telephone}`}
                      className="hover:text-future transition-colors"
                    >
                      {mentor.telephone}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Expérience */}
            {mentor.experience && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Expérience professionnelle
                </h3>
                <p className="text-gray-700 text-sm">{mentor.experience}</p>
              </div>
            )}

            {/* Compétences */}
            {mentor.competences && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Compétences
                </h3>
                <p className="text-gray-700 text-sm">{mentor.competences}</p>
              </div>
            )}

            {/* Motivation */}
            {mentor.motivation && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2">Motivation</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {mentor.motivation}
                </p>
              </div>
            )}

            {/* Disponibilité */}
            {mentor.disponibilite && (
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Disponibilité
                </h3>
                <p className="text-gray-700 text-sm">{mentor.disponibilite}</p>
              </div>
            )}

            {/* Mentorés */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Capacité de mentorat
              </h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-700">
                  <strong className="text-gray-900">
                    {mentor.mentees_count}
                  </strong>{' '}
                  mentoré(s) actuel(s) sur{' '}
                  <strong className="text-gray-900">
                    {mentor.max_mentees}
                  </strong>{' '}
                  maximum
                </span>
              </div>
              {mentor.mentees_count >= mentor.max_mentees && (
                <p className="mt-2 text-xs text-orange-600 font-semibold">
                  ⚠️ Capacité maximale atteinte
                </p>
              )}
            </div>

            {/* Date d'inscription */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Date d'inscription
              </h3>
              <p className="text-gray-700 text-sm">
                {new Date(mentor.created_at).toLocaleDateString('fr-FR', {
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
              href={`mailto:${mentor.email}`}
              className="flex-1 py-3 bg-trust text-white rounded-xl font-semibold text-center hover:bg-trust/90 transition-colors"
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
