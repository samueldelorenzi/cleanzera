import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const { rows } = await sql`SELECT * FROM athletes WHERE id = ${Number(id)}`;
    if (rows.length === 0) {
      return NextResponse.json({ message: 'Athlete not found' }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
