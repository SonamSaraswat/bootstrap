import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../Context/AuthContext.jsx';

const AddBlog = () => {
  const navigate = useNavigate();
  const { isLoggedIn , user} = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: ''
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLoggedIn) {
      alert('Please log in to add a blog');
      return;
    }

  try {
  await axios.post('http://localhost:5000/api/blogs', {
    ...formData,
    id: user?.id // or user.id based on your context structure
  });
  navigate('/blogs/all');
} catch (err) {
  console.error('Failed to submit blog:', err);
  setError('Failed to post blog. Please try again.');
}
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2>Write a New Blog</h2>
        <p className="text-muted">Share your thoughts with the community.</p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '800px' }}>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Short Description</label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            className="form-control"
            id="content"
            name="content"
            rows="8"
            value={formData.content}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-success">
            Publish Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlog;
