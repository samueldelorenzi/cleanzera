import { NextResponse } from 'next/server';
import { createDbClient } from '@/lib/db';

export async function GET() {
  const client = createDbClient();

  try {
    await client.connect();
    
    const athletesCount = await client.query('SELECT COUNT(*) FROM athletes');
    const testsCount = await client.query('SELECT COUNT(*) FROM tests');
    const positiveTests = await client.query("SELECT COUNT(*) FROM tests WHERE result = 'Positivo'");
    const negativeTests = await client.query("SELECT COUNT(*) FROM tests WHERE result = 'Negativo'");
    
    const recentTests = await client.query(`
      SELECT t.*, a.name as athlete_name 
      FROM tests t 
      JOIN athletes a ON t.athlete_id = a.id 
      ORDER BY t.test_date DESC 
      LIMIT 10
    `);
    
    const testsByType = await client.query(`
      SELECT test_type, COUNT(*) as count 
      FROM tests 
      GROUP BY test_type
    `);
    
    const testsByResult = await client.query(`
      SELECT result, COUNT(*) as count 
      FROM tests 
      GROUP BY result
    `);

    return NextResponse.json({
      summary: {
        totalAthletes: parseInt(athletesCount.rows[0].count),
        totalTests: parseInt(testsCount.rows[0].count),
        positiveTests: parseInt(positiveTests.rows[0].count),
        negativeTests: parseInt(negativeTests.rows[0].count),
      },
      recentTests: recentTests.rows,
      testsByType: testsByType.rows,
      testsByResult: testsByResult.rows,
    });
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to generate report' }, { status: 500 });
  } finally {
    await client.end();
  }
}
