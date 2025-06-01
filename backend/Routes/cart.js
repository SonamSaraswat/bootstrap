// routes/cart.js
import express from "express";
import { db } from "../db.js";

const router = express.Router();

// POST /api/cart/add
router.post('/add', (req, res) => {
  const { user_id, category_id, category_name, price } = req.body;

  if (!user_id || !category_id || !category_name || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const sql = `INSERT INTO cart (user_id, category_id, category_name, price) VALUES (?, ?, ?, ?)`;

  db.query(sql, [user_id, category_id, category_name, price], (err, result) => {
    if (err) {
      console.error('DB insert error:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ message: 'Item added to cart successfully' });
  });
});



router.get('/:user_id', (req, res) => {
  const userId = req.params.user_id;

  const query = `
    SELECT id, user_id, category_id, category_name, price
    FROM cart
    WHERE user_id = ?
    ORDER BY id DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching cart:', err);
      return res.status(500).json({ error: 'Database error while fetching cart items' });
    }

    res.json(results);
  });
});



router.delete('/remove/:id', (req, res) => {
  const cartItemId = req.params.id;

  const sql = 'DELETE FROM cart WHERE id = ?';

  db.query(sql, [cartItemId], (err, result) => {
    if (err) {
      console.error('Error deleting cart item:', err);
      return res.status(500).json({ error: 'Database error deleting item' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json({ message: 'Item removed from cart' });
  });
});


router.get('/item/:cartItemId', (req, res) => {
  const { cartItemId } = req.params;
  const sql = 'SELECT * FROM cart WHERE id = ?';
  db.query(sql, [cartItemId], (err, results) => {
    if (err) {
      console.error('Error fetching cart item:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    if (results.length === 0) return res.status(404).json({ error: 'Cart item not found' });
    res.json(results[0]);
  });
});


export default router;
