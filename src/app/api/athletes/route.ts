import { NextResponse } from 'next/server';
import { createDbClient } from '@/lib/db';

export async function POST(request: Request) {
  const client = createDbClient();
  
  try {
    await client.connect();
    const { name, cpf, birth_date, club, position } = await request.json();
    
    const result = await client.query(
      'INSERT INTO athletes (name, cpf, birth_date, club, position) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, cpf, birth_date, club, position]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: unknown) {
    console.error('Database error:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
      return NextResponse.json({ error: 'CPF já cadastrado' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create athlete' }, { status: 500 });
  } finally {
    await client.end();
  }
}

export async function GET() {
  const client = createDbClient();
  
  try {
    await client.connect();
    const { rows } = await client.query('SELECT * FROM athletes ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch athletes' }, { status: 500 });
  } finally {
    await client.end();
  }
}
