'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useState } from 'react';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Étudiante en droit',
    text: "Grâce à Pont du Futur, j'ai trouvé un mentor qui m'a aidée à décrocher mon stage de rêve. Aujourd'hui, je suis en Master 2 et je vise une grande carrière.",
    avatar: '👩‍🎓',
  },
  {
    name: 'Ahmed K.',
    role: 'Étudiant étranger en informatique',
    text: "En arrivant en France, je me sentais perdu. L'association m'a accueilli, accompagné et m'a permis de m'intégrer rapidement. Merci infiniment !",
    avatar: '👨‍💻',
  },
  {
    name: 'Marie L.',
    role: 'Mentor bénévole',
    text: "Devenir mentor a été une expérience incroyable. Voir ces jeunes réussir et s'épanouir, c'est la plus belle des récompenses.",
    avatar: '👩‍🏫',
  },
];

export default function Stories() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-24 md:py-32 bg-pattern-light">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
            Leurs <span className="text-accent-600">Histoires</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Découvrez les témoignages de ceux qui ont vécu l'expérience Pont du
            Futur
          </p>
        </motion.div>

        {/* Testimonials carousel */}
        <div className="max-w-4xl mx-auto">
          {/* Active testimonial */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            className="relative p-10 md:p-12 rounded-[3rem] bg-white shadow-lg border border-gray-100"
          >
            {/* Quote icon */}
            <div className="absolute top-8 left-8 w-16 h-16 bg-accent-600/10 rounded-2xl flex items-center justify-center">
              <Quote className="w-8 h-8 text-accent-600/30" />
            </div>

            {/* Content */}
            <div className="relative z-10">
              <p className="text-2xl md:text-3xl font-light text-gray-700 leading-relaxed mb-8">
                "{testimonials[activeIndex].text}"
              </p>

              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-accent-600/10 flex items-center justify-center text-3xl">
                  {testimonials[activeIndex].avatar}
                </div>

                {/* Info */}
                <div>
                  <div className="font-bold text-lg text-gray-900">
                    {testimonials[activeIndex].name}
                  </div>
                  <div className="text-gray-600">
                    {testimonials[activeIndex].role}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-10 bg-accent-600'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
