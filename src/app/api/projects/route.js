import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const query = sql`SELECT * FROM projects;`;
  try {
    const result = await query;
    return NextResponse.json({ rows: result.rows }, { status: 200});
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
