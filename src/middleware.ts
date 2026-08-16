import { defineMiddleware } from 'astro:middleware';
import { readSessionCookie, verifySessionToken } from './lib/session';

export const onRequest = defineMiddleware(async (context, next) => {
  const { pathname } = context.url;
  const isAdminPage = pathname === '/admin' || pathname.startsWith('/admin/');
  const isAdminApi = pathname.startsWith('/api/admin/');
  const isLogin = pathname === '/admin/login';

  if ((!isAdminPage && !isAdminApi) || isLogin) {
    return next();
  }

  const token = readSessionCookie(context.request);
  let valid = false;
  try {
    valid = verifySessionToken(token);
  } catch {
    valid = false;
  }

  if (!valid) {
    if (isAdminApi) {
      return new Response(JSON.stringify({ error: 'No autorizado' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return context.redirect('/admin/login');
  }

  return next();
});
