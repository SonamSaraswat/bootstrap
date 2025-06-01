// routes/order.js
import express from "express";
import { db } from "../db.js";

const router = express.Router();

router.post('/buy-now', (req, res) => {
  const { user_id, category_id, category_name, price } = req.body;

  if (!user_id || !category_id || !category_name || !price) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Step 1: Insert into orders
  const insertOrderSql = `INSERT INTO orders (user_id, total_amount, status) VALUES (?, ?, 'pending')`;

  db.query(insertOrderSql, [user_id, price], (err, orderResult) => {
    if (err) {
      console.error('❌ Error inserting into orders:', err);
      return res.status(500).json({ error: 'Failed to create order' });
    }

    const orderId = orderResult.insertId;

    // Step 2: Insert into order_items
    const insertItemSql = `
      INSERT INTO order_items (order_id, category_id, category_name, price)
      VALUES (?, ?, ?, ?)
    `;
          console.log("Inserting into order_items with:", {
  order_id: orderId,
  category_id,
  category_name,
  price,
});

    db.query(insertItemSql, [orderId, category_id, category_name, price], (err, itemResult) => {
      if (err) {
        console.error('❌ Error inserting into order_items:', err);
        return res.status(500).json({ error: 'Failed to add order item' });
      }


      // Step 3: Remove from cart
      const deleteCartSql = `
        DELETE FROM cart WHERE user_id = ? AND category_id = ?
      `;

      db.query(deleteCartSql, [user_id, category_id], (err, deleteResult) => {
        if (err) {
          console.warn('⚠️ Order created but failed to remove from cart:', err);
          // Send success even if cart cleanup fails
        }
        console.log("Deleting from cart:", { user_id, category_id });

        return res.json({
          message: 'Order placed successfully',
          order_id: orderId
        });
      });
    });
  });
});


// GET /api/order/all?year=2025&month=5&page=1&limit=10
router.get('/all', (req, res) => {
  const { year, month, page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  const sql = `
    SELECT 
      oi.order_id,
      o.user_id,
      u.username AS user_name,
      oi.category_id,
      oi.category_name,
      oi.price,
      o.created_at
    FROM order_items oi
    JOIN orders o ON oi.order_id = o.id
    JOIN users u ON o.user_id = u.id
    WHERE YEAR(o.created_at) = ? AND MONTH(o.created_at) = ?
    ORDER BY o.created_at DESC
    LIMIT ? OFFSET ?
  `;

  db.query(sql, [year, month, parseInt(limit), parseInt(offset)], (err, results) => {
    if (err) {
      console.error('Error fetching order items:', err);
      return res.status(500).json({ error: 'Failed to fetch orders' });
    }

    // Total count query
    const countSql = `
      SELECT COUNT(*) AS total
      FROM order_items oi
      JOIN orders o ON oi.order_id = o.id
      WHERE YEAR(o.created_at) = ? AND MONTH(o.created_at) = ?
    `;

    db.query(countSql, [year, month], (err2, countResults) => {
      if (err2) {
        console.error('Error counting orders:', err2);
        return res.status(500).json({ error: 'Failed to count orders' });
      }

      const total = countResults[0].total;
      return res.json({ data: results, total });
    });
  });
});

// GET /api/order/user/:userId
router.get('/user/:userId', (req, res) => {
  const { userId } = req.params;

  const sql = `
    SELECT 
      o.id AS order_id,
      o.total_amount,
      o.status,
      o.created_at,
      oi.category_id,
      oi.category_name,
      oi.price
    FROM orders o
    JOIN order_items oi ON o.id = oi.order_id
    WHERE o.user_id = ?
    ORDER BY o.created_at DESC
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('❌ Error fetching user orders:', err);
      return res.status(500).json({ error: 'Failed to fetch user orders' });
    }

    return res.json({ orders: results });
  });
});


export default router;
