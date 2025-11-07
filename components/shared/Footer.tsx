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
} from 'lucide-react';
import Link from 'next/link';

const footerLinks = {
  association: [
    { name: 'Notre Mission', href: '#mission' },
    { name: 'Nos Actions', href: '#actions' },
    { name: 'Notre Impact', href: '#impact' },
    { name: 'Témoignages', href: '#stories' },
  ],
  ressources: [
    { name: 'Devenir Membre', href: '#contact' },
    { name: 'Devenir Mentor', href: '#mentor' },
    { name: 'Devenir Partenaire', href: '#partenaire' },
    { name: 'FAQ', href: '#faq' },
  ],
  legal: [
    { name: 'Mentions Légales', href: '#mentions' },
    { name: 'Politique de Confidentialité', href: '#confidentialite' },
    { name: 'CGU', href: '#cgu' },
  ],
};

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
  { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-500' },
  {
    name: 'Instagram',
    icon: Instagram,
    href: '#',
    color: 'hover:text-pink-600',
  },
  { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
        {/* Main footer content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-blue to-primary-green rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <div>
                  <div className="font-display font-bold text-xl">
                    Pont du Futur
                  </div>
                  <div className="text-sm text-gray-400">
                    Construisons ensemble
                  </div>
                </div>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                Association à but non lucratif dédiée à l'accompagnement des
                jeunes issus des classes populaires et des étudiants étrangers.
              </p>

              {/* Contact info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-4 h-4 text-primary-blue" />
                  contact@pontdufutur.org
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-4 h-4 text-primary-green" />
                  +33 1 23 45 67 89
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-4 h-4 text-primary-orange" />
                  Paris, France
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links columns */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="font-display font-bold text-lg mb-4">
              L'Association
            </h3>
            <ul className="space-y-3">
              {footerLinks.association.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-blue transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="font-display font-bold text-lg mb-4">Ressources</h3>
            <ul className="space-y-3">
              {footerLinks.ressources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-green transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-display font-bold text-lg mb-4">Légal</h3>
            <ul className="space-y-3 mb-6">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Social links */}
            <div>
              <h4 className="font-semibold mb-3">Suivez-nous</h4>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center ${social.color} transition-colors`}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Pont du Futur. Tous droits réservés.
            </p>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Fait avec</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>pour l'égalité des chances</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
