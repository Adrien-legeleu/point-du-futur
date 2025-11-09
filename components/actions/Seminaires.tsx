'use client';

import { motion } from 'framer-motion';
import {
  Calendar,
  Users,
  MapPin,
  Clock,
  Star,
  CheckCircle,
} from 'lucide-react';

const upcomingSeminars = [
  {
    title: 'Entrepreneuriat et innovation sociale',
    date: '15 Décembre 2024',
    time: '14h - 17h',
    location: 'Paris 13ème',
    speakers: ['2 entrepreneurs', '1 investisseur'],
    spots: '30 places',
  },
  {
    title: 'Réussir ses études supérieures',
    date: '20 Janvier 2025',
    time: '10h - 13h',
    location: 'En ligne',
    speakers: ['3 étudiants experts', '2 professeurs'],
    spots: '50 places',
  },
  {
    title: 'Carrières internationales',
    date: '10 Février 2025',
    time: '14h - 18h',
    location: 'Paris 15ème',
    speakers: ['4 professionnels'],
    spots: '40 places',
  },
];

const pastThemes = [
  'Intelligence artificielle et emplois de demain',
  'Leadership et développement personnel',
  'Finance et inclusion économique',
  'Métiers de la santé et du social',
  'Transition écologique et nouveaux métiers',
  'Diversité et inclusion en entreprise',
];

export default function Seminaires() {
  return (
    <section id="seminaires" className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-blue/10 text-primary-blue font-medium mb-6"
          >
            <Calendar className="w-4 h-4" />
            Événements inspirants
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-gray-900"
          >
            <span className="text-primary-900">Séminaires</span> thématiques
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            Des séminaires bimestriels avec des intervenants de qualité pour
            t'inspirer, te former et élargir tes horizons.
          </motion.p>
        </div>

        {/* Upcoming seminars */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
            <Star className="w-6 h-6 text-primary-blue" />
            Prochains séminaires
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingSeminars.map((seminar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover-lift"
              >
                {/* Header stripe */}
                <div className="h-2 bg-primary-900" />

                <div className="p-6">
                  {/* Title */}
                  <h4 className="text-xl font-bold text-gray-900 mb-4">
                    {seminar.title}
                  </h4>

                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4 text-primary-blue" />
                      {seminar.date}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4 text-primary-green" />
                      {seminar.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4 text-primary-orange" />
                      {seminar.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4 text-primary-blue" />
                      {seminar.speakers.join(', ')}
                    </div>
                  </div>

                  {/* Spots badge */}
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-primary-blue/10 text-primary-blue rounded-full text-sm font-medium">
                      {seminar.spots}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-4 py-2 bg-primary-900 text-white rounded-full text-sm font-semibold shadow-md hover-lift"
                    >
                      S'inscrire
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* What to expect section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left - Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] p-8 shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              📚 Ce que tu vas gagner
            </h3>
            <ul className="space-y-4">
              {[
                'Rencontrer des professionnels inspirants',
                'Découvrir des secteurs et métiers variés',
                "Échanger avec d'autres jeunes motivés",
                'Poser tes questions directement aux intervenants',
                'Élargir ton réseau professionnel',
                'Repartir avec des ressources et contacts utiles',
              ].map((benefit, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-primary-blue flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right - Past themes */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-[2rem] p-8 border border-gray-200 shadow-md"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              🎯 Thématiques abordées
            </h3>
            <div className="flex flex-wrap gap-3">
              {pastThemes.map((theme, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm hover:shadow-md transition-all cursor-default"
                >
                  {theme}
                </motion.span>
              ))}
            </div>

            <div className="mt-8 p-4 bg-white rounded-xl">
              <p className="text-sm text-gray-600 italic">
                💡 Tu as une idée de thématique ? N'hésite pas à nous la
                proposer !
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary-900 rounded-[2rem] p-8 text-white text-center shadow-lg"
        >
          <h3 className="text-2xl font-bold mb-8">
            Nos séminaires en chiffres
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: '24', label: 'Séminaires organisés', suffix: '+' },
              { value: '1200', label: 'Participants', suffix: '+' },
              { value: '60', label: 'Intervenants experts', suffix: '+' },
              { value: '4.8', label: 'Note moyenne', suffix: '/5' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl font-bold mb-1">
                  {stat.value}
                  <span className="text-2xl">{stat.suffix}</span>
                </div>
                <div className="text-white/90 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
