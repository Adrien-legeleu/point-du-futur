'use client';

import { Search, Bell, Menu } from 'lucide-react';
import { useState } from 'react';

interface AdminHeaderProps {
  user: any;
}

export default function AdminHeader({ user }: AdminHeaderProps) {
  const [notifications] = useState(3);

  return (
    <header className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="flex items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-primary-blue focus:ring-2 focus:ring-primary-blue/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* User info (optionnel) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">
                {user?.user_metadata?.full_name || user?.email || 'Admin'}
              </div>
              <div className="text-xs text-gray-500">Administrateur</div>
            </div>
            {user?.user_metadata?.avatar_url ? (
              <img
                src={user.user_metadata.avatar_url}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-primary-blue to-primary-green rounded-full flex items-center justify-center text-white font-bold">
                {(user?.email?.[0] || 'A').toUpperCase()}
              </div>
            )}
          </div>

          {/* Notifications */}
          <button className="relative w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <Bell className="w-5 h-5 text-gray-600" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-blue text-white text-xs font-bold rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>

          {/* Mobile menu */}
          <button className="lg:hidden w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}
