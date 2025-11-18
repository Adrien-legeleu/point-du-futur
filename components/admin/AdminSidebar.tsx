'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  Heart,
  Briefcase,
  Handshake,
  Mail,
  Settings,
  LogOut,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname();

  const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/articles', label: 'Articles', icon: FileText },
    { href: '/admin/evenements', label: 'Événements', icon: Calendar },
    { href: '/admin/membres', label: 'Membres', icon: Users },
    { href: '/admin/mentors', label: 'Mentors', icon: Heart },
    { href: '/admin/benevoles', label: 'Bénévoles', icon: Briefcase },
    { href: '/admin/partenaires', label: 'Partenaires', icon: Handshake },
    { href: '/admin/demandes', label: 'Demandes', icon: Mail },
    { href: '/admin/parametres', label: 'Paramètres', icon: Settings },
  ];

  return (
    <>
      {/* Overlay mobile uniquement */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - visible sur desktop, animée sur mobile */}
      <aside
        className={`
          lg:relative lg:translate-x-0
          fixed inset-y-0 left-0 z-50 w-64 
          bg-white border-r border-gray-200 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="p-3.5 border-b border-zinc-50 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div>
              <div className="font-bold text-gray-900">Pont du Futur</div>
              <div className="text-xs text-gray-500">Administration</div>
            </div>
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => {
                  if (window.innerWidth < 1024) onClose();
                }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive
                    ? 'bg-primary-600/80 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200">
          <a
            href="/admin/logout"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Déconnexion</span>
          </a>
        </div>
      </aside>
    </>
  );
}
