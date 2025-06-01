import dotenv from 'dotenv';
dotenv.config();
import { db } from "../db.js";

import express from 'express';
import Razorpay from 'razorpay';
import crypto from 'crypto';

const router = express.Router();

// Initialize Razorpay with keys from env and log to verify
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID ? 'Loaded' : 'NOT FOUND');
console.log("Razorpay Key Secret:", process.env.RAZORPAY_SECRET ? 'Loaded' : 'NOT FOUND');

// Create Razorpay Order
router.post('/create-razorpay-order', async (req, res) => {
  const { user_id, amount, cartItemId, category_id, category_name } = req.body;

  console.log('Received order creation request:', req.body);

  if (!user_id || !amount || !cartItemId) {
    console.error('Missing required fields:', { user_id, amount, cartItemId });
    return res.status(400).json({ error: 'Missing required fields: user_id, amount, or cartItemId' });
  }

  try {
    const options = {
      amount: Number(amount), // Ensure amount is a number
      currency: 'INR',
      receipt: `receipt_order_${Date.now()}`,
      payment_capture: 1,
    };

    console.log('Creating Razorpay order with options:', options);

    const order = await razorpay.orders.create(options);

    console.log('Razorpay order created successfully:', order);

    return res.json({
      success: true,
      razorpayOrderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.error('Failed to create Razorpay order:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create Razorpay order',
      details: error.message || error.toString(),
    });
  }
});

// Verify Razorpay Payment


// ✅ Verify Razorpay Payment
// ✅ Verify Razorpay Payment
router.post('/verify-payment', (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    user_id,
    amount,         // in paisa (number)
    price,          // in rupees (number) — ensure this is passed
    category_id,
    category_name,
    cartItemId,
  } = req.body;

  // Basic validation for required fields
  if (!user_id || !amount || !price || !category_id || !category_name || !cartItemId) {
    return res.status(400).json({ success: false, message: 'Missing required payment/order fields' });
  }

  // Verify signature
  const generatedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generatedSignature !== razorpay_signature) {
    return res.status(400).json({ success: false, message: 'Signature mismatch' });
  }

  const amountInRupees = Number(price); // Use price from client directly for order total

  // Insert into payments
  const insertPaymentSql = `
    INSERT INTO payments (user_id, razorpay_order_id, razorpay_payment_id, amount, status)
    VALUES (?, ?, ?, ?, 'paid')
  `;

  db.query(insertPaymentSql, [user_id, razorpay_order_id, razorpay_payment_id, amountInRupees], (err) => {
    if (err) {
      console.error('Error inserting into payments:', err);
      return res.status(500).json({ success: false, message: 'Failed to insert payment record' });
    }

    // Insert into orders
    const insertOrderSql = `
      INSERT INTO orders (user_id, total_amount, status)
      VALUES (?, ?, 'paid')
    `;

    db.query(insertOrderSql, [user_id, amountInRupees], (err, orderResult) => {
      if (err) {
        console.error('Error inserting into orders:', err);
        return res.status(500).json({ success: false, message: 'Failed to create order' });
      }

      const orderId = orderResult.insertId;

      // Insert into order_items
      const insertItemSql = `
        INSERT INTO order_items (order_id, category_id, category_name, price)
        VALUES (?, ?, ?, ?)
      `;

      db.query(insertItemSql, [orderId, category_id, category_name, price], (err) => {
        if (err) {
          console.error('Error inserting into order_items:', err);
          return res.status(500).json({ success: false, message: 'Failed to add order item' });
        }

        // Delete from cart
        const deleteCartSql = `DELETE FROM cart WHERE id = ? AND user_id = ?`;

        db.query(deleteCartSql, [cartItemId, user_id], (err) => {
          if (err) {
            console.warn('Failed to remove item from cart:', err);
            // Proceed anyway
          }

          return res.json({ success: true, message: 'Payment verified, order created, and cart updated' });
        });
      });
    });
  });
});



router.get('/', (req, res) => {
  const { year, month, search, limit = 10, offset = 0 } = req.query;
  const monthNum = new Date(`${month} 1, ${year}`).getMonth() + 1;

  let sql = `
    SELECT * FROM payments 
    WHERE YEAR(created_at) = ? AND MONTH(created_at) = ?
  `;
  const params = [year, monthNum];

  if (search) {
    sql += ` AND (user_id LIKE ? OR razorpay_order_id LIKE ? OR razorpay_payment_id LIKE ?)`;
    const s = `%${search}%`;
    params.push(s, s, s);
  }

  const countSql = `SELECT COUNT(*) as total FROM (${sql}) as filtered`;

  db.query(countSql, params, (err, countResult) => {
    if (err) return res.status(500).json({ error: 'Failed to count results' });

    const total = countResult[0].total;

    sql += ` ORDER BY created_at ASC LIMIT ? OFFSET ?`;
    params.push(Number(limit), Number(offset));

    db.query(sql, params, (err, results) => {
      if (err) return res.status(500).json({ error: 'Failed to fetch payments' });

      res.json({ payments: results, total }); // Adjusted key from 'data' to 'payments'
    });
  });
});

export default router;
