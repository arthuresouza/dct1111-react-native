export const dynamic = 'force-static'

import { NextRequest } from 'next/server';
import { openDb } from './db';

export async function GET() {
  const db = await openDb();
  const todos = await db.all('SELECT * FROM todos');
  return Response.json(todos)
}

export async function POST(request: Request) {
  const { email, text } = await request.json();
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO messages (email, text) VALUES (?, ?)',
    [email, text]
  );
  return Response.json({ id: result.lastID, email, text });
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('query');
  const { email, text } = await request.json();
  const db = await openDb();
  await db.run(
    'UPDATE messages SET email = ?, text = ? WHERE id = ?',
    [email, text, id]
  );
  return Response.json({ id, email, text });
}

export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('query');
  const db = await openDb();
  await db.run('DELETE FROM messages WHERE id = ?', [id]);
  return Response.json('Deleted')
}
