import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  const { name, cpf, birth_date, club, position } = await request.json();

  try {
    await sql`
      INSERT INTO athletes (name, cpf, birth_date, club, position)
      VALUES (${name}, ${cpf}, ${birth_date}, ${club}, ${position})
    `;
    return NextResponse.json({ message: 'Athlete created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { rows } = await sql`SELECT * FROM athletes`;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
