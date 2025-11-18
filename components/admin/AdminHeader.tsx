'use client';

import { Menu, Bell } from 'lucide-react';
import { useState } from 'react';

interface AdminHeaderProps {
  user: any;
  onMenuClick: () => void;
}

export default function AdminHeader({ user, onMenuClick }: AdminHeaderProps) {
  const [notifications] = useState(3);

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-8 py-4 sticky top-0 z-30">
      <div className="flex items-center justify-between">
        {/* Menu burger + titre */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
            Administration
          </h1>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* User info */}
          <div
            className="
        flex items-center gap-3"
          >
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-900">
                {user?.user_metadata?.full_name || user?.email || 'Admin'}
              </div>
              <div className="text-xs text-gray-500">Administrateur</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
