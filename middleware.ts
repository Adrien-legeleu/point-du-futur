import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Si pas de session et tentative d'accès à /admin (sauf /admin/login)
  if (
    !session &&
    req.nextUrl.pathname.startsWith('/admin') &&
    req.nextUrl.pathname !== '/admin/login'
  ) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/admin/login';
    return NextResponse.redirect(redirectUrl);
  }

  // Si session et sur /admin/login, rediriger vers /admin
  if (session && req.nextUrl.pathname === '/admin/login') {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/admin';
    return NextResponse.redirect(redirectUrl);
  }

  return res;
}

export const config = {
  matcher: ['/admin/:path*'],
};
