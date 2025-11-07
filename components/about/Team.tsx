'use client';

import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';

const team = [
  {
    name: 'Mamadou Niang',
    role: 'Fondateur & Président',
    bio: "Étudiant en science politique, passionné par l'égalité des chances.",
    avatar: '👨🏾‍💼',
    linkedin: '#',
    email: 'mamadou@pontdufutur.org',
  },
  {
    name: 'Sarah Martin',
    role: 'Directrice des Programmes',
    bio: 'Experte en accompagnement éducatif et développement de projets.',
    avatar: '👩🏼‍💼',
    linkedin: '#',
    email: 'sarah@pontdufutur.org',
  },
  {
    name: 'Ahmed Kazi',
    role: 'Responsable Mentorat',
    bio: 'Ancien mentoré devenu mentor, il coordonne les binômes.',
    avatar: '👨🏽‍💼',
    linkedin: '#',
    email: 'ahmed@pontdufutur.org',
  },
  {
    name: 'Léa Dubois',
    role: 'Responsable Communication',
    bio: 'Spécialiste des réseaux sociaux et de la stratégie digitale.',
    avatar: '👩🏻‍💼',
    linkedin: '#',
    email: 'lea@pontdufutur.org',
  },
  {
    name: 'Karim Benzema',
    role: 'Trésorier',
    bio: 'Gestion financière et recherche de financements.',
    avatar: '👨🏽‍💼',
    linkedin: '#',
    email: 'karim@pontdufutur.org',
  },
  {
    name: 'Emma Chen',
    role: 'Responsable Partenariats',
    bio: 'Développement des relations entreprises et institutions.',
    avatar: '👩🏻‍💼',
    linkedin: '#',
    email: 'emma@pontdufutur.org',
  },
];

export default function Team() {
  return (
    <section className="py-24 md:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Notre <span className="gradient-text">Équipe</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Des personnes passionnées, dévouées et engagées pour la réussite des
            jeunes
          </p>
        </motion.div>

        {/* Team grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-blue/5 to-primary-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10 p-8 text-center">
                {/* Avatar */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary-blue/20 to-primary-green/20 rounded-full flex items-center justify-center text-5xl"
                >
                  {member.avatar}
                </motion.div>

                {/* Name & Role */}
                <h3 className="text-xl font-bold mb-1 text-gray-900">
                  {member.name}
                </h3>
                <div className="text-sm font-semibold text-primary-blue mb-3">
                  {member.role}
                </div>

                {/* Bio */}
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  {member.bio}
                </p>

                {/* Social links */}
                <div className="flex justify-center gap-3">
                  <motion.a
                    href={member.linkedin}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-primary-blue/10 rounded-xl flex items-center justify-center text-primary-blue hover:bg-primary-blue hover:text-white transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                  <motion.a
                    href={`mailto:${member.email}`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 bg-primary-green/10 rounded-xl flex items-center justify-center text-primary-green hover:bg-primary-green hover:text-white transition-all"
                  >
                    <Mail className="w-5 h-5" />
                  </motion.a>
                </div>
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 rounded-[2rem] border-2 border-transparent group-hover:border-primary-blue/20 transition-all duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>

        {/* CTA to join team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block p-8 bg-gradient-to-r from-primary-blue/10 to-primary-green/10 rounded-[2rem] border border-primary-blue/20">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">
              Envie de nous rejoindre ?
            </h3>
            <p className="text-gray-600 mb-6">
              Nous recherchons toujours des bénévoles motivés pour accompagner
              les jeunes.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-blue to-primary-green text-white rounded-full font-semibold shadow-lg"
            >
              <Mail className="w-5 h-5" />
              Nous contacter
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
