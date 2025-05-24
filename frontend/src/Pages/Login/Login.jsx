import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import profileIcon from '../../assets/profile_icon.png';
import { useAuth } from '../../Context/AuthContext';

const Login = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
    referred_by: ''
  });
  const navigate = useNavigate();
  const [err, setError] = useState(null);
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useAuth(); // ✅ use context

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setSuccess('');

  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', inputs);
    const user = res.data.user;

    setSuccess('Login successful!');
    login(user); // ✅ update context and localStorage together

    if (user.role === 'admin') {
      navigate('/AdminDashboard');
    } else {
      navigate('/');
    }
  } catch (err) {
    console.error('Login failed:', err.response?.data || err.message);
    setError(err.response?.data || 'Something went wrong.');
  }
};
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <img src={profileIcon} alt="Profile Icon" width="60" height="60" />
          <h3 className="mt-2">Login</h3>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" className="form-control" name="username" id="username" onChange={handleChange} required />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name="password" id="password" onChange={handleChange} required />
          </div>

         
          <button type="submit" className="btn btn-primary w-100">Login</button>

          {err && <div className="alert alert-danger mt-3">{err}</div>}
          {success && <div className="alert alert-success mt-3">{success}</div>}
        </form>

        <div className="text-center mt-3">
          <small>
            Don't have an account? <Link to="/register">Register</Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Login;
