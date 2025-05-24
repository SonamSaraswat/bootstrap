import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 5; // Number of blogs per page

  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/blogs');
        setBlogs(res.data);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      }
    };
    fetchBlogs();
  }, []);

  const handleReadMore = (blog_id) => {
    navigate(`/blogs/${blog_id}`);
  };

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">
        <i className="bi bi-journals me-2"></i>All Blogs
      </h1>

      <div className="row justify-content-center">
        <div className="col-md-8">
          {currentBlogs.map((item) => (
            <div
              key={item.blog_id}
              className="card mb-4 shadow-sm border border-light bg-light bg-opacity-75"
            >
              <div className="card-body">
                <h5 className="card-title">
                  <i className="bi bi-book me-2 text-primary"></i>
                  {item.title}
                </h5>
                {item.description && (
                  <p className="card-text text-muted">{item.description}</p>
                )}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  <small className="text-secondary">
                    <i className="bi bi-calendar-event me-1"></i>
                    {new Date(item.created_at).toLocaleDateString()}
                  </small>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => handleReadMore(item.blog_id)}
                  >
                    <i className="bi bi-arrow-right-circle me-1"></i>Read more
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <nav className="d-flex justify-content-center mt-4">
              <ul className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    <button
                      onClick={() => paginate(index + 1)}
                      className="page-link"
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBlogs;
