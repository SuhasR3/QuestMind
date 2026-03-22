import { createClient } from '@insforge/sdk';

let client;

/**
 * Single browser client for InsForge (auth, database, etc.).
 * Requires VITE_INSFORGE_URL and VITE_INSFORGE_ANON_KEY.
 */
export function getInsforgeClient() {
  if (client) return client;

  const baseUrl = import.meta.env.VITE_INSFORGE_URL;
  const anonKey = import.meta.env.VITE_INSFORGE_ANON_KEY;

  if (!baseUrl || !anonKey) {
    throw new Error(
      'Missing VITE_INSFORGE_URL or VITE_INSFORGE_ANON_KEY. Copy .env.example to .env and set your project URL and anonymous key.'
    );
  }

  client = createClient({ baseUrl, anonKey });
  return client;
}
