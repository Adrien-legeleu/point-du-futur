'use client';

import { motion, useScroll } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Accueil', href: '/' },
  { name: 'À Propos', href: '/about' },
  { name: 'Nos Actions', href: '/actions' },
  { name: 'Actualités', href: '/actualites' },
  { name: 'Événements', href: '/evenements' },
  { name: 'Membres', href: '/membres' },
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
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled ? 'w-[95%] max-w-6xl' : 'w-[95%] max-w-7xl'
        }`}
      >
        <nav
          className={`relative rounded-2xl transition-all duration-300 ${
            isScrolled
              ? 'bg-white/95 backdrop-blur-xl shadow-xl border border-gray-200'
              : 'bg-white/90 backdrop-blur-lg shadow-lg border border-gray-100'
          }`}
        >
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 bg-primary-900 rounded-xl flex items-center justify-center shadow-md group-hover:shadow-lg transition-all"
                >
                  <span className="text-white font-bold text-xl">PF</span>
                </motion.div>
                <div className="hidden sm:block">
                  <div className="font-display font-bold text-lg text-primary-900">
                    Pont du Futur
                  </div>
                  <div className="text-xs text-gray-500 -mt-0.5">
                    Relier les parcours
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="relative group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                          active
                            ? 'text-accent-600 bg-accent-50 shadow-sm'
                            : 'text-gray-700 hover:text-primary-900 hover:bg-gray-50'
                        }`}
                      >
                        {item.name}
                        {active && (
                          <motion.div
                            layoutId="activeTab"
                            className="absolute inset-0 bg-accent-50 rounded-xl -z-10 border border-accent-100"
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-900 hover:bg-primary-800 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all"
                  >
                    <Heart className="w-4 h-4" />
                    Adhérer
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
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-gray-200 bg-white/95"
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
                          ? 'text-accent-600 bg-accent-50'
                          : 'text-gray-700 hover:text-primary-900 hover:bg-gray-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary-900 hover:bg-primary-800 text-white rounded-xl font-semibold shadow-md mt-4 transition-colors"
                >
                  <Heart className="w-4 h-4" />
                  Adhérer
                </Link>
              </div>
            </motion.div>
          )}
        </nav>
      </motion.header>
    </>
  );
}
