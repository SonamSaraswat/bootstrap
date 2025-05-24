import express from "express";
import { db } from "../db.js";
import bcrypt from "bcryptjs";
const router = express.Router();

// GET /api/users?search=term
router.get('/', (req, res) => {
  const search = req.query.search || '';
  const year = req.query.year;
  const month = req.query.month;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  let whereClause = `WHERE (username LIKE ? OR email LIKE ?)`;
  const params = [`%${search}%`, `%${search}%`];

  if (year && month) {
    whereClause += ` AND YEAR(created_at) = ? AND MONTH(created_at) = ?`;
    params.push(year, parseInt(month)); // make sure month is number (1-12)
  }

  const dataQuery = `
    SELECT id, username, email, referral_code, referred_by, created_at, updated_at
    FROM users
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;

  const countQuery = `
    SELECT COUNT(*) AS total
    FROM users
    ${whereClause}
  `;

  // Add limit & offset for main data query
  const dataParams = [...params, limit, offset];

  // First get total count
  db.query(countQuery, params, (countErr, countResult) => {
    if (countErr) return res.status(500).json({ error: countErr.message });

    const total = countResult[0].total;

    // Now fetch paginated results
    db.query(dataQuery, dataParams, (dataErr, results) => {
      if (dataErr) return res.status(500).json({ error: dataErr.message });

      return res.status(200).json({
        total,
        page,
        limit,
        users: results
      });
    });
  });
});


// GET /api/users/search?email=user@example.com
router.get('/search', (req, res) => {
  const { email } = req.query;
  if (!email) return res.status(400).json({ error: "Email is required" });

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(results[0]);
  });
});

// Get single user
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM users WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(results[0]);
  });
});

// Update user
router.put('/:id', (req, res) => {
  const { username, email, referral_code, referred_by } = req.body;

  const query = `
    UPDATE users 
    SET username = ?, email = ?, referral_code = ?, referred_by = ?, updated_at = NOW()
    WHERE id = ?
  `;
  const values = [username, email, referral_code, referred_by, req.params.id];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Update error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'User updated successfully' });
  });
});

// Delete user
// Delete user
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM users WHERE id = ?', [req.params.id], (err, result) => {
    if (err) {
      console.error("Delete error:", err);
      return res.status(500).json({ error: err.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  });
});

function generateUniqueReferralCode(callback) {
  function tryGenerate() {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    db.query('SELECT id FROM users WHERE referral_code = ?', [code], (err, results) => {
      if (err) return callback(err);
      if (results.length === 0) return callback(null, code);
      else tryGenerate(); // Retry if exists
    });
  }
  tryGenerate();
}

router.post("/add", async (req, res) => {
  const { username, email, password, referred_by, role } = req.body;

  // Check if user already exists
  db.query("SELECT * FROM users WHERE email = ? OR username = ?", [email, username], async (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length > 0) return res.status(409).json("User already exists");

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate referral code
    generateUniqueReferralCode((err, referral_code) => {
      if (err) return res.status(500).json("Failed to generate referral code");

      const q = `
        INSERT INTO users (username, email, password, role, referral_code, referred_by, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())
      `;
      const values = [
        username,
        email,
        hashedPassword,
        role || "user",
        referral_code,
        referred_by || null,
      ];

      db.query(q, values, (err, result) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json({ message: "User added successfully" });
      });
    });
  });
});

export default router;
