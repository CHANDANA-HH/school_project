import pool from '../../../lib/db';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = { api: { bodyParser: false } };

const uploadDir = path.join(process.cwd(), 'public', 'schoolImages');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  ensureDir(uploadDir);

  const form = formidable({ multiples: false, keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('formidable parse error', err);
      return res.status(400).json({ error: 'Error parsing form' });
    }

    try {
      
      const name = fields.name?.toString() || '';
      const address = fields.address?.toString() || '';
      const city = fields.city?.toString() || '';
      const state = fields.state?.toString() || '';
      const contact = fields.contact?.toString() || '';
      const email_id = fields.email_id?.toString() || '';

      if (!name || !address || !city || !state || !contact || !email_id) {
        return res.status(422).json({ error: 'Missing required fields' });
      }

      
      const file = Array.isArray(files.image) ? files.image[0] : files.image;
      if (!file) return res.status(422).json({ error: 'Image is required' });

      
      const oldPath = file.filepath || file.path;
      const origName = file.originalFilename || file.name || 'upload';
      const ext = path.extname(origName) || '';
      const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}${ext}`;
      const newPath = path.join(uploadDir, fileName);

      fs.renameSync(oldPath, newPath); 

      const imagePath = `/schoolImages/${fileName}`; 

      const sql = `INSERT INTO schools (name, address, city, state, contact, image, email_id)
                   VALUES (?, ?, ?, ?, ?, ?, ?)`;
      await pool.execute(sql, [name, address, city, state, contact, imagePath, email_id]);

      return res.status(201).json({ success: true, image: imagePath });
    } catch (e) {
      console.error(e);
      return res.status(500).json({ error: 'Server error' });
    }
  });
}
