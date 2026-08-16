import type { APIRoute } from 'astro';
import { clearSessionCookieHeader } from '../../lib/session';

export const POST: APIRoute = async () => {
  return new Response(null, {
    status: 303,
    headers: {
      Location: '/admin/login',
      'Set-Cookie': clearSessionCookieHeader(),
    },
  });
};
