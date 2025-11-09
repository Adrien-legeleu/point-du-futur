// app/admin/(protected)/layout.tsx
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect('/admin/login');
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white p-4 mb-4 rounded">
        <h2 className="text-xl font-bold">
          Connecté en tant que: {session.user.email}
        </h2>
      </div>
      <div className="bg-white p-4 rounded">{children}</div>
    </div>
  );
}
