import {db} from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


function generateUniqueReferralCode(callback) {
  function tryGenerate() {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    db.query('SELECT id FROM users WHERE referral_code = ?', [code], (err, results) => {
      if (err) return callback(err);

      if (results.length === 0) {
        return callback(null, code);
      } else {
        tryGenerate(); // Retry if code already exists
      }
    });
  }

  tryGenerate();
}
export const register=(req,res)=>{

    const q="SELECT *FROM users WHERE email=? OR username=?"
    db.query(q,[req.body.email, req.body.username], (err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json("User Already Exist")

        const salt=bcrypt.genSaltSync(10);
        const hash=bcrypt.hashSync(req.body.password, salt);
        generateUniqueReferralCode((err, referral_code) => {
      if (err) return res.status(500).json("Failed to generate referral code");

        const q= "INSERT INTO users(`username`, `email`, `password`, `role`, `referral_code`, `referred_by`) VALUES(?)"
        db.query(q,[ [req.body.username,req.body.email, hash, req.body.role || "user", referral_code, req.body.referred_by || null]], (err,data)=>{
            if(err) return res.json(err);
            return res.status(200).json("user has been Created")
        });
    });
});
}

export const login= (req,res)=>{

    const { email,username, password, referred_by } = req.body;

  // 1. Find user by email or username
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found");

    const user = data[0];

    // 2. Validate password
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect) return res.status(401).json("Invalid credentials");

     if (referred_by && !user.referred_by) {
      const referralCheck = "SELECT * FROM users WHERE referral_code = ?";
      db.query(referralCheck, [referred_by], (err, refData) => {
        if (err) return res.status(500).json(err);
        if (refData.length === 0) return res.status(400).json("Invalid referral code");

        // 4. Update referred_by for this user
        const updateQuery = "UPDATE users SET referred_by = ? WHERE id = ?";
        db.query(updateQuery, [referred_by, user.id], (err, result) => {
          if (err) return res.status(500).json("Failed to update referral");

          sendLoginResponse(user, res);
        });
      });
    } else {
      // Already has referral or not provided
      sendLoginResponse(user, res);
    }
  });
};

// Helper to send login response
function sendLoginResponse(user, res) {
  const token = jwt.sign({ id: user.id, role: user.role }, "jwtSecretKey", {
    expiresIn: "1d",
  });
  const { password, ...others } = user;
  return res.status(200).json({ token, user: others });
}

