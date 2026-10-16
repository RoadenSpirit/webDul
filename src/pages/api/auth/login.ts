import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { username, password } = await request.json();
    if (username === 'riveron' && password === 'alvaroesmihijofavorito') {
      return new Response(JSON.stringify({ ok: true, token: 'auth_riveron_session_token' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': 'admin_auth=riveron_logged_in; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400'
        }
      });
    }
    return new Response(JSON.stringify({ ok: false, error: 'Credenciales inválidas' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ ok: false, error: e.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
