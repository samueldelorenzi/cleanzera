import { NextResponse } from 'next/server';
import { createDbClient } from '@/lib/db';
import { URL } from 'url';

export async function POST(request: Request) {
  const { athlete_id, test_date, test_type, result, laboratory } = await request.json();
  const client = createDbClient();

  try {
    await client.connect();
    const queryResult = await client.query(
      'INSERT INTO tests (athlete_id, test_date, test_type, result, laboratory) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [athlete_id, test_date, test_type, result, laboratory]
    );
    return NextResponse.json(queryResult.rows[0], { status: 201 });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to create test' }, { status: 500 });
  } finally {
    await client.end();
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const athleteId = url.searchParams.get('athlete_id');
  const client = createDbClient();

  try {
    await client.connect();
    if (athleteId) {
      const { rows } = await client.query(
        `SELECT t.*, a.name as athlete_name FROM tests t 
         JOIN athletes a ON t.athlete_id = a.id 
         WHERE t.athlete_id = $1 
         ORDER BY t.test_date DESC`,
        [Number(athleteId)]
      );
      return NextResponse.json(rows);
    }
    
    const { rows } = await client.query(
      `SELECT t.*, a.name as athlete_name FROM tests t 
       JOIN athletes a ON t.athlete_id = a.id 
       ORDER BY t.test_date DESC`
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch tests' }, { status: 500 });
  } finally {
    await client.end();
  }
}
