'use client';

import { motion, useScroll } from 'framer-motion';
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
  const [visible, setVisible] = useState(true); // show/hide on scroll direction
  const { scrollY } = useScroll();
  const lastY = useRef<number>(0);
  const pathname = usePathname();

  // scroll state + direction
  useEffect(() => {
    const unsub = scrollY.on('change', (y) => {
      setIsScrolled(y > 12);

      const prev = lastY.current;
      const delta = y - prev;

      // seuils anti-jitter
      const down = delta > 4 && y > 64; // on descend
      const up = delta < -4; // on remonte

      if (down && visible) setVisible(false);
      else if (up && !visible) setVisible(true);

      lastY.current = y;
    });
    return () => unsub();
  }, [scrollY, visible]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname?.startsWith(href);

  return (
    <motion.header
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: visible ? 0 : -64, opacity: visible ? 1 : 0.98 }}
      transition={{ type: 'tween', duration: 0.22 }} // smooth!!
      className="sticky top-0 left-0 right-0 z-50"
      style={{ willChange: 'transform' }}
    >
      <nav
        className={[
          'w-full',
          'h-12 sm:h-12 md:h-[50px]',
          'bg-gradient-to-b from-white to-white supports-[backdrop-filter]:backdrop-blur-xl',

          isScrolled ? 'from-white to-white' : '',
        ].join(' ')}
      >
        <div className="mx-auto max-w-7xl h-full px-3 sm:px-4">
          <div className="h-full flex items-center justify-around">
            {/* Logo compact */}
            <Link href="/" className="flex items-center   gap-2">
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

                    {/* indicateur bleu Apple-like */}
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
                    {/* hover bg bleu très léger */}
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
              className="lg:hidden p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Menu"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.18 }}
            className="lg:hidden border-t border-black/5 bg-white/95"
          >
            <div className="mx-auto max-w-7xl px-3 sm:px-4 py-2">
              <div className="flex flex-col py-1">
                {navItems.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={[
                        'px-3 py-2 rounded-md text-[13px] font-medium transition-colors',
                        active
                          ? 'text-primary-700 bg-primary-50'
                          : 'text-gray-700 hover:text-primary-800 hover:bg-primary-50/50',
                      ].join(' ')}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-[13px] font-semibold text-white bg-primary-700 hover:bg-primary-800"
                >
                  <Heart className="w-4 h-4" />
                  Adhérer
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
