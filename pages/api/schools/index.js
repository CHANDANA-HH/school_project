
import pool from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const [rows] = await pool.query('SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY id DESC');
    res.status(200).json({ schools: rows });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'DB error' });
  }
}
