import express from "express";
import { db } from "../db.js";
const router = express.Router();

router.get('/', (req, res) => {
  const search = req.query.search || '';
  const year = req.query.year;
  const month = req.query.month;

  let q = `
    SELECT blog_id, title, created_at, updated_at
    FROM blogs
    WHERE (title LIKE ?)
  `;
  const params = [`%${search}%`];

  if (year && month) {
    const monthNum = String(new Date(`${month} 1, 2000`).getMonth() + 1).padStart(2, '0');
    q += ` AND DATE_FORMAT(created_at, '%Y-%m') = ?`;
    params.push(`${year}-${monthNum}`);
  }

  q += ` ORDER BY created_at DESC`;

  db.query(q, params, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json(results);
  });
});


router.get('/:blog_id', (req, res) => {
  db.query('SELECT * FROM blogs WHERE blog_id = ?', [req.params.blog_id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send('Blog not found');
    res.json(results[0]);
  });
});



//update
router.put('/:blog_id', (req, res) => {
  const { title, content, description } = req.body;

  if (!title || !content || !description) {
    return res.status(400).send('Missing fields to update');
  }

  const sql = 'UPDATE blogs SET title = ?, content = ?, description = ?, updated_at = NOW() WHERE blog_id = ?';
  db.query(sql, [title, content, description, req.params.blog_id], (err, result) => {
    if (err) return res.status(500).send('Error updating blog');
    res.json({ message: 'Blog updated successfully' });
  });
});

router.delete('/:blog_id', (req, res) => {
  db.query('DELETE FROM blogs WHERE blog_id = ?', [req.params.blog_id], (err, result) => {
    if (err) return res.status(500).send('Error deleting blog');
    res.json({ message: 'Blog deleted successfully' });
  });
});


export default router;