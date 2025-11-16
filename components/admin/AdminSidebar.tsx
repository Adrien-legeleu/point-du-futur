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
} from 'lucide-react';

export default function AdminSidebar() {
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
    <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-6 border-b border-gray-200">
        <Link href="/admin" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">PF</span>
          </div>
          <div>
            <div className="font-bold text-gray-900">Pont du Futur</div>
            <div className="text-xs text-gray-500">Administration</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </nav>

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
  );
}
