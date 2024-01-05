import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const query = sql`SELECT * FROM timeline_items;`;
  console.log('Executing query:', query);
  try {
    const result = await query;
    console.log('Query result:', result);
    return NextResponse.json({ rows: result.rows }, { status: 200, headers: {
      'Cache-Control': 'no-store, must-revalidate',
    }, });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
