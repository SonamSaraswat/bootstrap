import express  from 'express';
const router = express.Router();
import { db } from '../db.js';

const tableMap = {
    main: 'main_categories',
    sub: 'sub_categories',
    subsub: 'sub_sub_categories',
    subsubsub: 'sub_sub_sub_categories'
};

// GET Content
router.get('/content/:level/:slug', (req, res) => {
    const { level, slug } = req.params;
    const table = tableMap[level];
    if (!table) return res.status(400).send('Invalid level');

    const query = `SELECT name, content FROM ${table} WHERE slug = ? LIMIT 1`;
    db.query(query, [slug], (err, results) => {
        if (err) return res.status(500).send('DB error');
        if (results.length === 0) return res.status(404).send('Not found');
        res.json(results[0]);
    });
});

// POST Content (Admin Save)
router.post('/content', (req, res) => {
    const { level, slug, content } = req.body;
    const table = tableMap[level];
    if (!table) return res.status(400).send('Invalid level');

    const query = `UPDATE ${table} SET content = ? WHERE slug = ?`;
    db.query(query, [content, slug], (err) => {
        if (err) return res.status(500).send('DB error');
        res.send('Content updated');
    });
});


router.get('/service/:slug', (req, res) => {
  const { slug } = req.params;

  const queries = [
    `SELECT content FROM main_categories WHERE slug = ?`,
    `SELECT content FROM sub_categories WHERE slug = ?`,
    `SELECT content FROM sub_sub_categories WHERE slug = ?`,
    `SELECT content FROM sub_sub_sub_categories WHERE slug = ?`
  ];

  const tryNext = (index) => {
    if (index >= queries.length) return res.json({ content: null });

    db.query(queries[index], [slug], (err, result) => {
      if (err) return res.status(500).send("DB error");
      if (result.length > 0) return res.json(result[0]); // return the content found
      tryNext(index + 1); // try the next level
    });
  };

  tryNext(0);
});


export default router

