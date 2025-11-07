'use client';

import { motion } from 'framer-motion';
import { Building2, GraduationCap, Briefcase, Heart } from 'lucide-react';

const partnerCategories = [
  {
    icon: Building2,
    title: 'Institutions',
    partners: [
      'Ville de Paris',
      'Région Île-de-France',
      "Ministère de l'Éducation",
      'Préfecture',
    ],
  },
  {
    icon: GraduationCap,
    title: 'Universités',
    partners: [
      'Université Paris-Sorbonne',
      'Sciences Po Paris',
      'Université Paris-Dauphine',
      'ESSEC Business School',
    ],
  },
  {
    icon: Briefcase,
    title: 'Entreprises',
    partners: ['TotalEnergies', 'BNP Paribas', 'Orange', 'Société Générale'],
  },
  {
    icon: Heart,
    title: 'Associations',
    partners: [
      'Article 1',
      'Frateli',
      'Nos Quartiers ont des Talents',
      'Mozaïk RH',
    ],
  },
];

export default function Partners() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Nos <span className="gradient-text">Partenaires</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ils nous font confiance et nous soutiennent dans notre mission
          </p>
        </motion.div>

        {/* Partners grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {partnerCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-[2rem] p-8 hover:shadow-lg transition-shadow"
              >
                {/* Category header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary-blue/20 to-primary-green/20 rounded-2xl flex items-center justify-center">
                    <Icon className="w-7 h-7 text-primary-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {category.title}
                  </h3>
                </div>

                {/* Partners list */}
                <ul className="space-y-3">
                  {category.partners.map((partner) => (
                    <li
                      key={partner}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <div className="w-2 h-2 bg-primary-blue rounded-full" />
                      {partner}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        {/* CTA to become partner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-primary-blue to-primary-green rounded-[2rem] text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Devenez partenaire
            </h3>
            <p className="text-white/90 mb-6 leading-relaxed">
              Vous souhaitez soutenir notre association et contribuer à
              l'égalité des chances ? Contactez-nous pour devenir partenaire
              officiel.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-blue rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Devenir partenaire
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
