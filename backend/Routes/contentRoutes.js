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
// GET Content
router.get('/content/:level/:slug', (req, res) => {
  const { level, slug } = req.params;
  const table = tableMap[level];
  if (!table) return res.status(400).send('Invalid level');

  const query = `SELECT name, content, price FROM ${table} WHERE slug = ? LIMIT 1`;
  db.query(query, [slug], (err, results) => {
    if (err) return res.status(500).send('DB error');
    if (results.length === 0) return res.status(404).send('Not found');
    res.json(results[0]);
  });
});


// POST Content (Admin Save)
// POST Content (Admin Save)
router.post('/content', (req, res) => {
  const { level, slug, content, price } = req.body;
  const table = tableMap[level];
  if (!table) return res.status(400).send('Invalid level');

  const query = `UPDATE ${table} SET content = ?, price = ? WHERE slug = ?`;
  db.query(query, [content, price, slug], (err) => {
    if (err) return res.status(500).send('DB error');
    res.send('Content and price updated');
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


//24/05/2025
router.post('/create', async (req, res) => {
  const { level, name, slug, parent_name } = req.body;

  try {
    // Map levels to tables and parent columns
    const map = {
      main: { table: 'main_categories', parentColumn: null, parentTable: null },
      sub: { table: 'sub_categories', parentColumn: 'main_category_id', parentTable: 'main_categories' },
      subsub: { table: 'sub_sub_categories', parentColumn: 'sub_category_id', parentTable: 'sub_categories' },
      subsubsub: { table: 'sub_sub_sub_categories', parentColumn: 'sub_sub_category_id', parentTable: 'sub_sub_categories' },
    };

    if (!map[level]) {
      return res.status(400).json({ error: 'Invalid level specified' });
    }

    const { table, parentColumn, parentTable } = map[level];

    let parent_id = null;

    if (level !== 'main') {
      // Get parent id by name from the parentTable
      const parentRows = await new Promise((resolve, reject) => {
        db.query(
          `SELECT id FROM ${parentTable} WHERE name = ?`,
          [parent_name],
          (err, results) => {
            if (err) reject(err);
            else resolve(results);
          }
        );
      });

      if (!parentRows.length) {
        return res.status(400).json({ error: 'Parent category not found' });
      }

      parent_id = parentRows[0].id;
    }

    // Build insert query and values
    let sql, values;
    if (level === 'main') {
      sql = `INSERT INTO ${table} (name, slug) VALUES (?, ?)`;
      values = [name, slug];
    } else {
      sql = `INSERT INTO ${table} (name, slug, ${parentColumn}) VALUES (?, ?, ?)`;
      values = [name, slug, parent_id];
    }

    await new Promise((resolve, reject) => {
      db.query(sql, values, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });

    res.json({ success: true, message: 'Category created successfully' });

  } catch (error) {
    console.error('Error in create route:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




export default router

