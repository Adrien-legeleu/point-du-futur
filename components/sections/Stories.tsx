'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';
import { useEffect, useState } from 'react';

const testimonials = [
  {
    name: 'Sarah M.',
    role: 'Étudiante en droit',
    text: 'Grâce à Pont du Futur, j’ai rencontré une mentore qui m’a guidée pas à pas : CV, lettres, entretiens… J’ai décroché mon stage de rêve et aujourd’hui je prépare mon Master 2 plus sereine.',
    avatar: '👩‍🎓',
  },
  {
    name: 'Ahmed K.',
    role: 'Étudiant étranger en informatique',
    text: 'En arrivant en France, je ne connaissais personne et je ne comprenais pas le système. L’association m’a aidé pour les démarches, les cours, mais surtout à me sentir à ma place ici.',
    avatar: '👨‍💻',
  },
  {
    name: 'Marie L.',
    role: 'Mentor bénévole',
    text: 'Être mentor, c’est donner un peu de son temps, mais recevoir énormément en retour. Voir les jeunes gagner en confiance et atteindre leurs objectifs, c’est ce qui me motive à continuer.',
    avatar: '👩‍🏫',
  },
];

export default function Stories() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play toutes les 3 secondes
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const activeTestimonial = testimonials[activeIndex];

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
          <h2 className="text-4xl md:text-6xl font-bold mb-4 text-primary-700">
            Leurs <span className="text-primary-500">histoires</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Derrière chaque accompagnement, il y a un visage, un parcours, une
            histoire. Voici quelques témoignages de jeunes et de mentors de Pont
            du Futur.
          </p>
        </motion.div>

        {/* Testimonials carousel */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Active testimonial */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
              className="relative p-10 md:p-12 rounded-3xl bg-white shadow-2xl shadow-black/8 border border-gray-100"
            >
              {/* Quote icon */}
              <div className="absolute top-8 left-8 w-16 h-16 bg-accent-600/10 rounded-2xl flex items-center justify-center">
                <Quote className="w-8 h-8 text-accent-600/30" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <p className="text-2xl md:text-3xl font-light text-gray-700 leading-relaxed mb-8">
                  « {activeTestimonial.text} »
                </p>

                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-accent-600/10 flex items-center justify-center text-3xl">
                    {activeTestimonial.avatar}
                  </div>

                  {/* Info */}
                  <div>
                    <div className="font-bold text-lg text-gray-900">
                      {activeTestimonial.name}
                    </div>
                    <div className="text-gray-600">
                      {activeTestimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation dots */}
          <div className="flex justify-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-10 bg-accent-600'
                    : 'w-3 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Afficher le témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
