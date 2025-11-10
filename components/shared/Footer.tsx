'use client';

import { motion } from 'framer-motion';
import {
  Heart,
  Mail,
  MapPin,
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUp,
} from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  association: [
    { name: 'Notre Histoire', href: '/about' },
    { name: 'Nos Actions', href: '/actions' },
    { name: 'Notre Équipe', href: '/about#team' },
    { name: 'Nos Partenaires', href: '/about#partners' },
  ],
  programmes: [
    { name: 'Mentorat', href: '/actions#mentorat' },
    { name: 'Orientation', href: '/actions#orientation' },
    { name: 'Séminaires', href: '/actions#seminaires' },
    { name: 'Colloques', href: '/actions#colloques' },
  ],
  ressources: [
    { name: 'Actualités', href: '/actualites' },
    { name: 'Devenir Membre', href: '/contact' },
    { name: 'Devenir Mentor', href: '/contact' },
    { name: 'Devenir Partenaire', href: '/contact' },
  ],
};

const socialLinks = [
  {
    name: 'Facebook',
    icon: Facebook,
    href: 'https://facebook.com/pontdufutur',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/pontdufutur',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com/pontdufutur',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/company/pontdufutur',
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-b from-primary-100 via-primary-100 to-white text-gray-700 ">
      {/* Pattern très subtil */}
      <div className="absolute inset-0 opacity-30 bg-pattern-light" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand column - 2 cols */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="inline-flex items-center gap-3 mb-6 group"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-2xl">PF</span>
              </motion.div>
              <div>
                <div className="font-display font-bold text-2xl text-primary-800">
                  Pont du Futur
                </div>
                <div className="text-sm text-gray-500">
                  Construisons ton avenir, ensemble.
                </div>
              </div>
            </Link>

            <p className="text-gray-600 text-sm leading-relaxed mb-6 max-w-sm">
              Pont du Futur accompagne les jeunes issus des classes populaires
              et les étudiant·e·s étranger·e·s dans leur parcours académique et
              professionnel, en France.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="mailto:contact@pontdufutur.org"
                className="flex items-center gap-3 text-gray-600 hover:text-primary-700 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/80 border border-gray-200 flex items-center justify-center group-hover:border-accent-400 transition-colors">
                  <Mail className="w-4 h-4 text-primary-600" />
                </div>
                <span className="text-sm">contact@pontdufutur.org</span>
              </a>

              <a
                href="tel:+33123456789"
                className="flex items-center gap-3 text-gray-600 hover:text-primary-700 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/80 border border-gray-200 flex items-center justify-center group-hover:border-accent-400 transition-colors">
                  <Phone className="w-4 h-4 text-primary-600" />
                </div>
                <span className="text-sm">+33 1 23 45 67 89</span>
              </a>

              <div className="flex items-center gap-3 text-gray-600">
                <div className="w-9 h-9 rounded-lg bg-white/80 border border-gray-200 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-primary-600" />
                </div>
                <span className="text-sm">Paris, France</span>
              </div>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-primary-700">
              L’Association
            </h3>
            <ul className="space-y-3">
              {footerLinks.association.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary-700 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-primary-700">
              Programmes
            </h3>
            <ul className="space-y-3">
              {footerLinks.programmes.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary-700 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-success opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-primary-700">
              Ressources
            </h3>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-primary-700 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-warning opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6 text-primary-700">
              Newsletter
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Reçois nos actualités, ateliers et opportunités directement dans
              ta boîte mail.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="ton@email.com"
                className="flex-1 px-4 py-2 rounded-lg bg-white/80 border border-gray-200 text-gray-800 placeholder-gray-400 text-sm focus:outline-none focus:border-primary-400 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-500 rounded-lg font-semibold text-sm text-white shadow-md transition-colors"
              >
                OK
              </motion.button>
            </div>
          </div>
        </div>

        {/* Social + scroll top */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-t border-gray-200/70">
          <div className="flex gap-3">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-11 h-11 rounded-xl bg-white/80 border border-gray-200 hover:border-primary-400 hover:bg-primary-50 flex items-center justify-center text-gray-500 hover:text-primary-700 transition-all"
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-11 h-11 rounded-xl bg-primary-600 hover:bg-primary-500 flex items-center justify-center text-white shadow-md transition-all"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-200/70">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Pont du Futur. Tous droits réservés.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/mentions-legales"
                className="text-gray-500 hover:text-primary-700 transition-colors text-xs"
              >
                Mentions légales
              </Link>
              <Link
                href="/confidentialite"
                className="text-gray-500 hover:text-primary-700 transition-colors text-xs"
              >
                Confidentialité
              </Link>
              <Link
                href="/cgu"
                className="text-gray-500 hover:text-primary-700 transition-colors text-xs"
              >
                CGU
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Fait avec</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
