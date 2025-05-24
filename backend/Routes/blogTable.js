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


export default router;