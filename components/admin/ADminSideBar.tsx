'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Heart,
  FileText,
  Calendar,
  Handshake,
  Mail,
  Settings,
  LogOut,
  Briefcase,
} from 'lucide-react';

const menuItems = [
  {
    title: 'Tableau de bord',
    icon: LayoutDashboard,
    href: '/admin',
  },
  {
    title: 'Articles',
    icon: FileText,
    href: '/admin/articles',
  },
  {
    title: 'Membres',
    icon: Users,
    href: '/admin/membres',
  },
  {
    title: 'Mentors',
    icon: Heart,
    href: '/admin/mentors',
  },
  {
    title: 'Bénévoles',
    icon: Briefcase,
    href: '/admin/benevoles',
  },
  {
    title: 'Événements',
    icon: Calendar,
    href: '/admin/evenements',
  },
  {
    title: 'Partenaires',
    icon: Handshake,
    href: '/admin/partenaires',
  },
  {
    title: 'Candidatures',
    icon: Mail,
    href: '/admin/candidatures',
    badge: 8,
  },
  {
    title: 'Paramètres',
    icon: Settings,
    href: '/admin/parametres',
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-primary-green rounded-xl flex items-center justify-center">
            <span className="text-xl font-bold">PF</span>
          </div>
          <div>
            <div className="font-bold text-lg">Pont du Futur</div>
            <div className="text-xs text-gray-400">Administration</div>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link key={index} href={item.href}>
              <motion.div
                whileHover={{ x: 4 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors relative ${
                  isActive
                    ? 'bg-white/10 text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.title}</span>
                {item.badge && (
                  <span className="ml-auto w-6 h-6 bg-primary-blue rounded-full flex items-center justify-center text-xs font-bold">
                    {item.badge}
                  </span>
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-primary-green rounded-full flex items-center justify-center">
            👨‍💼
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-sm truncate">Admin User</div>
            <div className="text-xs text-gray-400">admin@pontdufutur.org</div>
          </div>
        </div>
        <button className="w-full mt-2 flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:text-white hover:bg-white/5 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
