import express from 'express';
const router = express.Router();
import {db} from '../db.js'; // your MySQL connection

// Update content dynamically based on level and slug
router.post('/content', (req, res) => {
  const { level, slug, content } = req.body;
  console.log("Request body is:", req.body);

  let tableName;
  switch (level) {
    case 'main':
      tableName = 'main_categories';
      break;
    case 'sub':
      tableName = 'sub_categories';
      break;
    case 'sub-sub':
      tableName = 'sub_sub_categories';
      break;
    case 'service':
      tableName = 'services';
      break;
    default:
      return res.status(400).json({ message: 'Invalid level' });
  }

  const query = `UPDATE ${tableName} SET content = ? WHERE slug = ?`;

  db.query(query, [content, slug], (err, result) => {
    if (err) {
      console.error('❌ Error updating content:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    res.json({ message: 'Content updated successfully' });
  });
});

// Get content dynamically
router.get('/content/:level/:slug', (req, res) => {
    console.log("request body is")
  const { level, slug } = req.params;

  let tableName;
  switch (level) {
    case 'main':
      tableName = 'main_categories';
      break;
    case 'sub':
      tableName = 'sub_categories';
      break;
    case 'sub-sub':
      tableName = 'sub_sub_categories';
      break;
    case 'service':
      tableName = 'services';
      break;
    default:
      return res.status(400).json({ message: 'Invalid level' });
  }

  const query = `SELECT content FROM ${tableName} WHERE slug = ?`;

  db.query(query, [slug], (err, results) => {
    if (err) {
      console.error('❌ Error fetching content:', err);
      return res.status(500).json({ message: 'Database error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json({ content: results[0].content });
  });
});

export default router;
