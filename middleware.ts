import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return req.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            req.cookies.set(name, value)
          );
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

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

  return response;
}

export const config = {
  matcher: ['/admin/:path*'],
};
