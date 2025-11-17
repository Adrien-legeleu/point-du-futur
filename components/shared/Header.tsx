'use client';

import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

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
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();
  const lastY = useRef<number>(0);
  const pathname = usePathname();

  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // scroll state + direction
  useEffect(() => {
    const unsub = scrollY.on('change', (y) => {
      setIsScrolled(y > 12);

      const prev = lastY.current;
      const delta = y - prev;

      const down = delta > 4 && y > 64;
      const up = delta < -4;

      if (down && visible) setVisible(false);
      else if (up && !visible) setVisible(true);

      lastY.current = y;
    });
    return () => unsub();
  }, [scrollY, visible]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: 0, opacity: 1 }}
        animate={{ y: visible ? 0 : -64, opacity: visible ? 1 : 0.98 }}
        transition={{ type: 'tween', duration: 0.22 }}
        className="sticky top-0 left-0 right-0 z-50"
        style={{ willChange: 'transform' }}
      >
        <nav
          className={[
            'w-full',
            'h-12 sm:h-12 md:h-[50px]',
            'bg-gradient-to-b  from-[#ffffff] to-[#fafafa] supports-[backdrop-filter]:backdrop-blur-xl',
            isScrolled ? 'from-[#ffffff] to-[#fcfcfc]' : '',
          ].join(' ')}
        >
          <div className="mx-auto max-w-7xl h-full px-3 sm:px-4">
            <div className="h-full flex items-center justify-between">
              {/* Logo compact */}
              <Link
                href="/"
                className="flex items-center gap-2 relative z-[60]"
              >
                <Image
                  src="/logo/logo.png"
                  className="object-cover"
                  alt="Logo"
                  width={60}
                  height={70}
                />
              </Link>

              {/* Desktop nav (compact + bleu) */}
              <div className="hidden lg:flex items-center gap-1">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="relative block px-3 py-2"
                    >
                      <span
                        className={[
                          'text-[12px] font-[450] tracking-[-0.01em]',
                          active
                            ? 'text-primary-700'
                            : 'text-gray-700 hover:text-primary-800',
                        ].join(' ')}
                      >
                        {item.name}
                      </span>

                      {active && (
                        <motion.span
                          layoutId="blueActiveBar"
                          className="absolute left-1/2 right-2 bottom-[4px] w-2 h-0.5 rounded-full bg-primary-600"
                          transition={{
                            type: 'spring',
                            stiffness: 500,
                            damping: 34,
                          }}
                        />
                      )}
                      <span className="pointer-events-none absolute inset-0 rounded-md opacity-0 hover:opacity-100 transition-opacity bg-primary-50/50" />
                    </Link>
                  );
                })}
              </div>

              {/* CTA compact desktop */}
              <div className="hidden lg:flex items-center">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-semibold text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                  <Heart className="w-3.5 h-3.5" />
                  Adhérer
                </Link>
              </div>

              {/* Burger mobile */}
              <button
                onClick={() => setIsOpen((v) => !v)}
                className="lg:hidden p-2 rounded-md bg-zinc-50 hover:bg-zinc-100 transition-colors relative z-[60]"
                aria-label="Menu"
              >
                {isOpen ? (
                  <X className="w-5 h-5 text-primary-600/80" />
                ) : (
                  <Menu className="w-5 h-5 text-primary-600/80" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu full screen */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-[55] bg-white/90 backdrop-blur-xl"
          >
            {/* Header fixe dans le menu */}
            <div className="absolute top-0 left-0 right-0 h-12 sm:h-12 md:h-[50px] bg-transparent z-[60]">
              <div className="mx-auto max-w-7xl h-full px-3 sm:px-4">
                <div className="h-full flex items-center justify-between">
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2"
                  >
                    <Image
                      src="/logo/logo.png"
                      className="object-cover"
                      alt="Logo"
                      width={60}
                      height={70}
                    />
                  </Link>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-md bg-zinc-50 hover:bg-zinc-100 text-primary-600/80 transition-colors"
                    aria-label="Fermer le menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Contenu du menu centré */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="h-full flex flex-col  items-start justify-center px-6 pt-12 pb-6"
            >
              {/* Navigation links centrés */}
              <div
                className="flex flex-col overflow-y-auto  w-full gap-1 mb-8"
                style={{ scrollbarWidth: 'none' }}
              >
                {navItems.map((item, index) => {
                  const active = isActive(item.href);
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + index * 0.05 }}
                      className="flex "
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={[
                          'block px-6 py-3 w-full text-left  text-lg  pt-6 pb-8 font-semibold transition-all text-center',
                          active
                            ? 'text-primary-700 border-b-2 border-primary-200'
                            : 'text-neutral-700 hover:text-primary-700 border-b-1 border-neutral-200/60',
                        ].join(' ')}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA Button centré */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-sm"
              >
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl text-lg font-semibold text-white bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg"
                >
                  <Heart className="w-5 h-5" />
                  Adhérer
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
