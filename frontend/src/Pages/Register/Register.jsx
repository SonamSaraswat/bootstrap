import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Register = () => {
  const generateReferralCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
    referralCode: generateReferralCode(),
    referredBy: '',
  });

  const navigate = useNavigate();
  const [err, setErr] = useState(null);

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", formData);
      navigate("/Login");
    } catch (err) {
      setErr(err.response?.data || "Registration failed");
    }
  };

  return (
  <div className="container min-vh-80 d-flex justify-content-center align-items-center">
    <div className="w-80" style={{ maxWidth: '500px' }}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Register</h3>
        <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label>
                <input required type="text" className="form-control" placeholder="Username" name="username" onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input required type="email" className="form-control" placeholder="Email" name="email" onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input required type="password" className="form-control" placeholder="Password" name="password" onChange={handleChange} />
              </div>

            {/* <div className="mb-3">
                <label className="form-label">Role</label>
                <select className="form-select" name="role" value={formData.role} onChange={handleChange}>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>*/} 

              <div className="mb-3">
                <label className="form-label">Referred By (Referral ID)</label>
                <input type="text" className="form-control" placeholder="Referral Code" name="referredBy" onChange={handleChange} />
              </div>

              <div className="mb-3">
                <label className="form-label">Your Referral Code</label>
                <input type="text" className="form-control" value={formData.referralCode} disabled />
                <div className="form-text">Share this code with others to refer them.</div>
              </div>

              {err && <div className="alert alert-danger">{err}</div>}

              <div className="d-grid mb-3">
                <button className="btn btn-primary" type="submit">Register</button>
              </div>

              <p className="text-center">
                Already have an account? <Link to="/Login">Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
  );
};

export default Register;
