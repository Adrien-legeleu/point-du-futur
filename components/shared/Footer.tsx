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
    { name: 'Nos Actions', href: '/nos-actions' },
    { name: 'Notre Équipe', href: '/about#team' },
    { name: 'Nos Partenaires', href: '/about#partners' },
  ],
  programmes: [
    { name: 'Mentorat', href: '/nos-actions#mentorat' },
    { name: 'Orientation', href: '/nos-actions#orientation' },
    { name: 'Séminaires', href: '/nos-actions#seminaires' },
    { name: 'Colloques', href: '/nos-actions#colloques' },
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
    color: 'hover:bg-blue-600',
  },
  {
    name: 'Twitter',
    icon: Twitter,
    href: 'https://twitter.com/pontdufutur',
    color: 'hover:bg-sky-500',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    href: 'https://instagram.com/pontdufutur',
    color: 'hover:bg-pink-600',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: 'https://linkedin.com/company/pontdufutur',
    color: 'hover:bg-blue-700',
  },
];

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-blue rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary-green rounded-full blur-3xl" />
      </div>

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
                whileHover={{ rotate: 10, scale: 1.1 }}
                className="w-14 h-14 bg-gradient-to-br from-primary-blue via-primary-green to-primary-orange rounded-2xl flex items-center justify-center shadow-2xl"
              >
                <span className="text-white font-bold text-2xl">P</span>
              </motion.div>
              <div>
                <div className="font-display font-bold text-2xl">
                  Pont du Futur
                </div>
                <div className="text-sm text-gray-400">
                  Construisons ensemble
                </div>
              </div>
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Association dédiée à l'accompagnement des jeunes issus des classes
              populaires et des étudiants étrangers vers la réussite.
            </p>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="mailto:contact@pontdufutur.org"
                className="flex items-center gap-3 text-gray-400 hover:text-primary-blue transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary-blue/20 transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-sm">contact@pontdufutur.org</span>
              </a>

              <a
                href="tel:+33123456789"
                className="flex items-center gap-3 text-gray-400 hover:text-primary-green transition-colors group"
              >
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-primary-green/20 transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-sm">+33 1 23 45 67 89</span>
              </a>
              <div className="flex items-center gap-3 text-gray-400">
                <div className="w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center">
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
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-blue opacity-0 group-hover:opacity-100 transition-opacity" />
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
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-green opacity-0 group-hover:opacity-100 transition-opacity" />
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
                    className="text-gray-400 hover:text-white transition-colors text-sm flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-display font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Reste informé de nos actualités et événements
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="ton@email.com"
                className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-primary-blue transition-colors"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-primary-blue to-primary-green rounded-lg font-semibold text-sm shadow-lg"
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
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all ${social.color}`}
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
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-primary-blue to-primary-green flex items-center justify-center text-white shadow-lg hover:shadow-2xl transition-all"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Pont du Futur. Tous droits réservés.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
              <Link
                href="/mentions-legales"
                className="text-gray-400 hover:text-white transition-colors text-xs"
              >
                Mentions Légales
              </Link>
              <Link
                href="/confidentialite"
                className="text-gray-400 hover:text-white transition-colors text-xs"
              >
                Confidentialité
              </Link>
              <Link
                href="/cgu"
                className="text-gray-400 hover:text-white transition-colors text-xs"
              >
                CGU
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Fait avec</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
