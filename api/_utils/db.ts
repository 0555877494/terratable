import { neon } from '@neondatabase/serverless';

export async function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set');
  }
  return neon(process.env.DATABASE_URL);
}

export type Db = Awaited<ReturnType<typeof getDb>>;
