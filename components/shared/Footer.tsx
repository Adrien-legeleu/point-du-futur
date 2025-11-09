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
    <footer className="relative bg-gradient-to-br from-trust-900 to-trust-800 text-white">
      {/* Pattern subtil */}
      <div className="absolute inset-0 opacity-5 bg-pattern-light" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-8">
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
                className="w-14 h-14 bg-gradient-to-br from-trust-500 to-future-500 rounded-2xl flex items-center justify-center shadow-lg"
              >
                <span className="text-white font-bold text-2xl">PF</span>
              </motion.div>
              <div>
                <div className="font-display font-bold text-2xl">
                  Pont du Futur
                </div>
                <div className="text-sm text-gray-300">
                  Construisons ensemble
                </div>
              </div>
            </Link>

            <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-sm">
              Association dédiée à l'accompagnement des jeunes issus des classes
              populaires et des étudiants étrangers vers la réussite.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="mailto:contact@pontdufutur.org"
                className="flex items-center gap-3 text-gray-300 hover:text-accent-400 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-accent-600/20 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">contact@pontdufutur.org</span>
              </a>

              <a
                href="tel:+33123456789"
                className="flex items-center gap-3 text-gray-300 hover:text-accent-400 transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-success/20 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">+33 1 23 45 67 89</span>
              </a>
              <div className="flex items-center gap-3 text-gray-300">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="text-sm">Paris, France</span>
              </div>
            </div>
          </div>

          {/* Links columns */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">
              L'Association
            </h3>
            <ul className="space-y-3">
              {footerLinks.association.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-6">Programmes</h3>
            <ul className="space-y-3">
              {footerLinks.programmes.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-success opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-lg mb-6">Ressources</h3>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm flex items-center gap-2 group"
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
            <h3 className="font-display font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-gray-300 text-sm mb-4">
              Reste informé de nos actualités et événements
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="ton@email.com"
                className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-accent-400 transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-accent-600 hover:bg-accent-500 rounded-lg font-semibold text-sm shadow-md transition-colors"
              >
                OK
              </motion.button>
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-t border-white/10">
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
                  className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 hover:border-accent-400 hover:bg-accent-600/20 flex items-center justify-center text-gray-300 hover:text-white transition-all"
                  aria-label={social.name}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              );
            })}
          </div>

          {/* Scroll to top */}
          <motion.button
            onClick={scrollToTop}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-11 h-11 rounded-xl bg-accent-600 hover:bg-accent-500 flex items-center justify-center text-white shadow-md transition-all"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Pont du Futur. Tous droits réservés.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/mentions-legales"
                className="text-gray-300 hover:text-white transition-colors text-xs"
              >
                Mentions Légales
              </Link>
              <Link
                href="/confidentialite"
                className="text-gray-300 hover:text-white transition-colors text-xs"
              >
                Confidentialité
              </Link>
              <Link
                href="/cgu"
                className="text-gray-300 hover:text-white transition-colors text-xs"
              >
                CGU
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-300">
              <span>Fait avec</span>
              <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
