import { NextResponse } from 'next/server';
import { createDbClient } from '@/lib/db';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = createDbClient();

  try {
    await client.connect();
    const { rows } = await client.query('SELECT * FROM athletes WHERE id = $1', [Number(id)]);
    if (rows.length === 0) {
      return NextResponse.json({ message: 'Athlete not found' }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch athlete' }, { status: 500 });
  } finally {
    await client.end();
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = createDbClient();

  try {
    await client.connect();
    const { name, cpf, birth_date, club, position } = await request.json();
    
    const { rows } = await client.query(
      'UPDATE athletes SET name = $1, cpf = $2, birth_date = $3, club = $4, position = $5 WHERE id = $6 RETURNING *',
      [name, cpf, birth_date, club, position, Number(id)]
    );
    
    if (rows.length === 0) {
      return NextResponse.json({ message: 'Athlete not found' }, { status: 404 });
    }
    
    return NextResponse.json(rows[0]);
  } catch (error: unknown) {
    console.error('Database error:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
      return NextResponse.json({ error: 'CPF já cadastrado' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to update athlete' }, { status: 500 });
  } finally {
    await client.end();
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = createDbClient();

  try {
    await client.connect();
    const { rowCount } = await client.query('DELETE FROM athletes WHERE id = $1', [Number(id)]);
    
    if (rowCount === 0) {
      return NextResponse.json({ message: 'Athlete not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Athlete deleted successfully' });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to delete athlete' }, { status: 500 });
  } finally {
    await client.end();
  }
}
