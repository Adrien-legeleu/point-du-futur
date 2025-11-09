// app/admin/logout/route.ts
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();

  const url = new URL('/admin/login', request.url);
  return NextResponse.redirect(url);
}
