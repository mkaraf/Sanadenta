import { WorkerMailer } from 'worker-mailer';

/**
 * Cloudflare Worker for sanadenta.cz.
 *
 * Static pages are served straight from the assets directory (see `run_worker_first` in
 * wrangler.jsonc): this Worker only runs for /api/* requests. It handles the contact form
 * on /faq/ — validates the fields, verifies the Cloudflare Turnstile token and sends the
 * message to the clinic through its own Seznam mailbox (SMTP), with Reply-To set to the visitor.
 *
 * Secrets (Cloudflare dashboard → Workers → sanadenta → Settings → Variables and secrets,
 * or `.dev.vars` locally): SMTP_PASSWORD, TURNSTILE_SECRET_KEY.
 * Plain variables (wrangler.jsonc "vars"): CONTACT_TO, SMTP_HOST, SMTP_PORT, SMTP_USER, SITE_ORIGIN.
 */

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  SMTP_PASSWORD?: string;
  TURNSTILE_SECRET_KEY?: string;
  CONTACT_TO: string;
  SMTP_HOST: string;
  SMTP_PORT: string;
  SMTP_USER: string;
  SITE_ORIGIN: string;
}

const MAX_BODY_BYTES = 20_000;
const LIMITS = { name: 100, email: 200, phone: 40, subject: 150, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Result = { ok: true } | { ok: false; error: string; status: number };

const fail = (status: number, error: string): Result => ({ ok: false, status, error });

async function handleContact(request: Request, env: Env): Promise<Result> {
  if (request.method !== 'POST') return fail(405, 'Nepodporovaná metoda.');

  // Only accept submissions from our own pages (blocks cross-site form posts).
  const origin = request.headers.get('Origin');
  const allowed = [env.SITE_ORIGIN, new URL(request.url).origin];
  if (origin && !allowed.includes(origin)) return fail(403, 'Neplatný původ požadavku.');

  if (Number(request.headers.get('Content-Length') || 0) > MAX_BODY_BYTES) {
    return fail(413, 'Zpráva je příliš dlouhá.');
  }

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return fail(400, 'Neplatný formulář.');
  }
  const field = (name: string) => String(form.get(name) ?? '').trim();

  // Honeypot: a hidden field real visitors never fill in. Pretend success so bots move on.
  if (field('website')) return { ok: true };

  const data = {
    name: field('name'),
    email: field('email'),
    phone: field('phone'),
    subject: field('subject'),
    message: field('message'),
  };

  if (!data.name || !data.email || !data.subject || !data.message) {
    return fail(400, 'Vyplňte prosím jméno, e-mail, předmět a zprávu.');
  }
  if (!EMAIL_RE.test(data.email)) return fail(400, 'Zadejte prosím platnou e-mailovou adresu.');
  for (const [key, max] of Object.entries(LIMITS)) {
    if (data[key as keyof typeof data].length > max) return fail(400, 'Některé pole je příliš dlouhé.');
  }

  if (!env.TURNSTILE_SECRET_KEY || !env.SMTP_PASSWORD) {
    console.error('Contact form is not configured: missing TURNSTILE_SECRET_KEY or SMTP_PASSWORD.');
    return fail(503, 'Formulář je dočasně nedostupný. Napište nám prosím přímo e-mailem.');
  }

  // Verify the Turnstile anti-spam token.
  const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({
      secret: env.TURNSTILE_SECRET_KEY,
      response: field('cf-turnstile-response'),
      remoteip: request.headers.get('CF-Connecting-IP') ?? '',
    }),
  });
  const verdict = (await verify.json().catch(() => ({}))) as { success?: boolean };
  if (!verdict.success) return fail(400, 'Ověření proti spamu se nezdařilo. Zkuste to prosím znovu.');

  const text = [
    `Jméno: ${data.name}`,
    `E-mail: ${data.email}`,
    `Telefon: ${data.phone || '—'}`,
    `Předmět: ${data.subject}`,
    '',
    data.message,
    '',
    '—',
    'Odesláno z kontaktního formuláře na www.sanadenta.cz/faq/',
  ].join('\n');

  try {
    // Send from the clinic's own mailbox to itself; Reply-To lets the clinic answer the visitor directly.
    await WorkerMailer.send(
      {
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT),
        secure: true,
        credentials: { username: env.SMTP_USER, password: env.SMTP_PASSWORD },
        authType: ['plain', 'login'],
        socketTimeoutMs: 10_000,
        responseTimeoutMs: 10_000,
      },
      {
        from: { name: 'SanaDenta web', email: env.SMTP_USER },
        to: { email: env.CONTACT_TO },
        reply: { name: data.name, email: data.email },
        subject: `Dotaz z webu: ${data.subject}`,
        text,
      }
    );
  } catch (error) {
    console.error('SMTP send failed', error instanceof Error ? error.message : error);
    return fail(502, 'Zprávu se nepodařilo odeslat. Zkuste to prosím později nebo nám napište e-mailem.');
  }

  return { ok: true };
}

function respond(request: Request, result: Result): Response {
  const status = result.ok ? 200 : result.status;
  const headers = { 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };

  // The page submits via fetch() and asks for JSON; anything else gets a minimal HTML page.
  if ((request.headers.get('Accept') ?? '').includes('application/json')) {
    return Response.json(result.ok ? { ok: true } : { ok: false, error: result.error }, { status, headers });
  }
  const message = result.ok ? 'Děkujeme, Vaše zpráva byla odeslána.' : result.error;
  const html = `<!doctype html><html lang="cs"><meta charset="utf-8"><meta name="robots" content="noindex"><title>SanaDenta</title><p>${message}</p><p><a href="/faq/">Zpět na stránku Dotazy</a></p></html>`;
  return new Response(html, { status, headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8' } });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/contact' || pathname === '/api/contact/') {
      return respond(request, await handleContact(request, env));
    }
    if (pathname.startsWith('/api/')) {
      return new Response('Not found', { status: 404 });
    }
    return env.ASSETS.fetch(request);
  },
};
