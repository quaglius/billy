import type { APIRoute } from 'astro';
import {
  credentialsMatch,
  createSessionToken,
  sessionCookieHeader,
} from '../../lib/session';

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  const username = String(form.get('username') ?? '');
  const password = String(form.get('password') ?? '');

  if (!credentialsMatch(username, password)) {
    return new Response(null, {
      status: 303,
      headers: { Location: '/admin/login?error=1' },
    });
  }

  const token = createSessionToken(username);
  return new Response(null, {
    status: 303,
    headers: {
      Location: '/admin',
      'Set-Cookie': sessionCookieHeader(token),
    },
  });
};
