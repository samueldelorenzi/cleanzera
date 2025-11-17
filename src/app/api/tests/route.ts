import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { URL } from 'url';

export async function POST(request: Request) {
  const { athlete_id, test_date, test_type, result, laboratory } = await request.json();

  try {
    await sql`
      INSERT INTO tests (athlete_id, test_date, test_type, result, laboratory)
      VALUES (${athlete_id}, ${test_date}, ${test_type}, ${result}, ${laboratory})
    `;
    return NextResponse.json({ message: 'Test created successfully' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const athleteId = url.searchParams.get('athlete_id');

  if (athleteId) {
    try {
      const { rows } = await sql`SELECT * FROM tests WHERE athlete_id = ${Number(athleteId)}`;
      return NextResponse.json(rows);
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }

  try {
    const { rows } = await sql`SELECT * FROM tests`;
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
