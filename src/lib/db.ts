import pg from 'pg';

const { Client } = pg;

export function createDbClient() {
  return new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
}

export async function query(text: string, params?: unknown[]) {
  const client = createDbClient();
  try {
    await client.connect();
    const result = await client.query(text, params);
    return result;
  } finally {
    await client.end();
  }
}
