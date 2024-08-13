// pages/api/todos.js
import { NextApiRequest, NextApiResponse } from 'next';
import { openDb } from './db';

type ResponseData = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  const db = await openDb();

  await db.exec('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY, title TEXT)');

  if (req.method === 'GET') {
    const todos = await db.all('SELECT * FROM todos');
    res.status(200).json({ message: todos.toString() });
  } else if (req.method === 'POST') {
    const { title } = req.body;
    await db.run('INSERT INTO todos (title) VALUES (?)', [title]);
    res.status(201).json({ message: 'Todo created' });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
