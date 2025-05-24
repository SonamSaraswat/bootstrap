import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(res.data);
        if (user !== null) {
          console.log('Auth status:', isLoggedIn);
          console.log('User:', user);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };
    fetchBlogs();
  }, [user]);

  const handleReadMore = (id) => {
    navigate(`/blogs/${id}`);
  };

  const handleViewAll = () => {
    navigate('/blogs/all');
  };

  const handleAddBlog = () => {
    if (!isLoggedIn) {
      alert('Please log in to write a blog');
      return;
    }
    navigate('/blogs/new');
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h1>Read Our Latest Blogs</h1>
        <p className="lead">Explore our blogs on finance, trends, and more!</p>
      </div>

      <div className="row g-4">
        {blogs.slice(0, 3).map((item) => (
          <div className="col-12 col-md-6 col-lg-4" key={item.blog_id}>
            <div className="card h-100 shadow-sm bg-light">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text text-muted">
                  {item.description?.length > 100
                    ? item.description.slice(0, 100) + '...'
                    : item.description}
                </p>
                <small className="text-secondary mb-2">
                  Posted on: {new Date(item.created_at).toLocaleDateString()}
                </small>
                <button
                  className="btn btn-outline-primary mt-auto"
                  onClick={() => handleReadMore(item.blog_id)}
                >
                  Read more
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <button className="btn btn-primary" onClick={handleViewAll}>
          View More
        </button>
        <button className="btn btn-success" onClick={handleAddBlog}>
          Add Blog
        </button>
      </div>
    </div>
  );
};

export default Blogs;
