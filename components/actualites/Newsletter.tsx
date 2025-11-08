'use client';

import { motion } from 'framer-motion';
import { Mail, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Connecter à l'API newsletter
    setIsSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-primary-blue via-primary-green to-primary-orange p-12 md:p-16 text-white"
        >
          {/* Background decorations */}
          <div className="absolute inset-0 opacity-20">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                rotate: [90, 0, 90],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="absolute -bottom-20 -left-20 w-64 h-64 bg-white rounded-full blur-3xl"
            />
          </div>

          <div className="relative z-10 text-center">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6"
            >
              <Mail className="w-8 h-8" />
            </motion.div>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Reste informé de nos actualités
            </h2>

            {/* Subtitle */}
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              Reçois nos derniers articles, événements et témoignages
              directement dans ta boîte mail
            </p>

            {/* Form */}
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ton@email.com"
                    className="flex-1 px-6 py-4 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white/50 transition-all"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-white text-primary-blue rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    S'inscrire
                  </motion.button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-3 py-4"
              >
                <Sparkles className="w-6 h-6 text-white" />
                <p className="text-lg font-semibold">
                  Merci ! Tu es maintenant inscrit(e) à notre newsletter 🎉
                </p>
              </motion.div>
            )}

            {/* Privacy note */}
            <p className="mt-6 text-white/70 text-sm">
              En t'inscrivant, tu acceptes de recevoir nos emails. Tu peux te
              désinscrire à tout moment.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
