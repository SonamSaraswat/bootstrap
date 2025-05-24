import express from 'express';
const router = express.Router();
import {db} from '../db.js';

// Get all blogs
router.get('/', (req, res) => {
  db.query('SELECT * FROM blogs ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Get blog by ID
router.get('/:blog_id', (req, res) => {
  db.query('SELECT * FROM blogs WHERE blog_id = ?', [req.params.blog_id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results[0]);
  });
});

// Create a new blog
router.post('/', (req, res) => {
  const { title, content, description, id } = req.body;

  // ✅ Removed image_url because it's not provided
  const sql = 'INSERT INTO blogs (title, content, description, id) VALUES (?, ?, ?, ?)';
  db.query(sql, [title, content, description, id], (err, result) => {
    if (err) {
      console.error('DB insert error:', err);
      return res.status(500).send('Error inserting blog into database');
    }
    if (!title || !content || !description || !id) {
  return res.status(400).send('Missing required fields');
}
    res.json({ message: 'Blog created successfully', blog_id: result.insertId });
  });
});


export default router;
