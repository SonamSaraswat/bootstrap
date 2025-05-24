import React, { useState, useEffect, useRef } from 'react';
import axios from "axios";


import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Ensure Bootstrap's JS is included
import { Link } from 'react-router-dom';

const AdminBlogs = () => {
  const [year, setYear] = useState('2025');
  const [month, setMonth] = useState('January');
  const [entriesPerPage, setEntriesPerPage] = useState('10');
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);

 

  const fetchBlogs = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/getblogs`, {
        params: {
          search: searchTerm,
          year: year,
          month: month
        }
      });
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [searchTerm, year, month]);





  return (
    <>
      <div className="container py-4 bg-light min-vh-100">
        <h2 className="text-center mb-4 text-secondary">Blogs</h2>

        {/* Filters */}
        <div className="row mb-4">
          <div className="col-md-6 mb-3">
            <label className="form-label">Select Year:</label>
            <select className="form-select" value={year} onChange={(e) => setYear(e.target.value)}>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Select Month:</label>
            <select className="form-select" value={month} onChange={(e) => setMonth(e.target.value)}>
              {[
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ].map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Blog Button */}
        <div className="mb-3 text-end">
          <Link to="/blogs/new"><button className="btn btn-primary">
            <i className="bi bi-person-plus me-2"></i>Add Blog
          </button></Link>
        </div>

        {/* Table Controls */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-4 d-flex align-items-center">
            <span className="me-2">Show</span>
            <select
              className="form-select w-auto mx-2"
              value={entriesPerPage}
              onChange={(e) => setEntriesPerPage(e.target.value)}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
            <span>entries</span>
          </div>
          <div className="col-md-4 offset-md-4">
            <div className="input-group">
              <label className="input-group-text" htmlFor="search">Search</label>
              <input
                type="text"
                className="form-control"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
              />
            </div>
          </div>
        </div>

        {/* Blogs Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover bg-white">
            <thead className="table-light">
              <tr>
                <th>Blog ID</th>
                <th>Title</th>
                <th>Created On</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <tr key={blog.blog_id}>
                    <td>{blog.blog_id}</td>
                    <td>{blog.title}</td>
                    <td>{blog.created_at?.split("T")[0]}</td>
                    <td>{blog.updated_at?.split("T")[0]}</td>
                    <td>
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary" title="Details" >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-success" title="Edit" >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-danger" title="Delete" >
                          <i className="bi bi-trash"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-secondary" title="Print" >
                          <i className="bi bi-printer"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-3">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination (static for now) */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <div>Showing 0 to 0 of 0 entries</div>
          <div>
            <button className="btn btn-outline-secondary btn-sm me-2" disabled>Previous</button>
            <button className="btn btn-outline-secondary btn-sm" disabled>Next</button>
          </div>
        </div>
      </div>

    </>
  );
};

export default AdminBlogs;
