// app/admin/(protected)/layout.tsx
import { redirect } from 'next/navigation';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import AdminHeader from '@/components/admin/AdminHeader';
import AdminSidebar from '@/components/admin/ADminSideBar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // 🔐 Ici c'est OK de rediriger : on est UNIQUEMENT sur les routes protégées
  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex h-screen overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <AdminHeader user={session.user} />
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
