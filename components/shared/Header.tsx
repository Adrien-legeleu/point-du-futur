'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X, Heart, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Accueil', href: '/' },
  { name: 'À Propos', href: '/about' },
  { name: 'Nos Actions', href: '/nos-actions' },
  { name: 'Actualités', href: '/actualites' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <>
      {/* Spacer pour éviter que le contenu passe sous le header */}
      <div className="h-20" />

      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
          isScrolled ? 'w-[95%] max-w-6xl' : 'w-[95%] max-w-7xl'
        }`}
      >
        <nav
          className={`relative rounded-2xl transition-all duration-500 ${
            isScrolled
              ? 'bg-white/80 backdrop-blur-xl shadow-2xl border border-gray-200/50'
              : 'bg-white/70 backdrop-blur-md shadow-xl border border-white/20'
          }`}
        >
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative"
                >
                  <div className="w-11 h-11 bg-gradient-to-br from-primary-blue via-primary-green to-primary-orange rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-shadow">
                    <span className="text-white font-bold text-xl">P</span>
                  </div>
                  <motion.div
                    className="absolute -top-1 -right-1"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4 text-primary-orange" />
                  </motion.div>
                </motion.div>
                <div className="hidden sm:block">
                  <div className="font-display font-bold text-lg text-gray-900">
                    Pont du Futur
                  </div>
                  <div className="text-xs text-gray-500 -mt-0.5">
                    Relier les parcours
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-2">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="relative group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                          active
                            ? 'text-primary-blue bg-primary-blue/10'
                            : 'text-gray-700 hover:text-primary-blue hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                        {active && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-primary-blue/10 rounded-xl -z-10"
                            transition={{
                              type: 'spring',
                              stiffness: 300,
                              damping: 30,
                            }}
                          />
                        )}
                      </motion.div>
                    </Link>
                  );
                })}
              </div>

              {/* CTA Button */}
              <div className="hidden lg:flex items-center gap-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href="/contact"
                    className="relative inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary-blue via-primary-green to-primary-blue bg-size-200 bg-pos-0 hover:bg-pos-100 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Heart className="w-4 h-4" />
                      Adhérer
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-green to-primary-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </Link>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-gray-900" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-900" />
                )}
              </motion.button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden border-t border-gray-200/50 backdrop-blur-xl"
            >
              <div className="px-6 py-4 space-y-2">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-3 rounded-xl font-medium transition-all ${
                        active
                          ? 'text-primary-blue bg-primary-blue/10'
                          : 'text-gray-700 hover:text-primary-blue hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-primary-blue to-primary-green text-white rounded-xl font-semibold shadow-lg mt-4"
                >
                  <Heart className="w-4 h-4" />
                  Adhérer
                </Link>
              </div>
            </motion.div>
          )}

          {/* Glow effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
            style={{
              background:
                'radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.1), transparent 70%)',
            }}
          />
        </nav>
      </motion.header>
    </>
  );
}
