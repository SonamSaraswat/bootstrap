import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Single.css';

const SingleBlog = () => {
  const { blog_id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log("Fetching blog with ID:", blog_id);
    axios.get(`http://localhost:5000/api/blogs/${blog_id}`)
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Blog not found.');
        setLoading(false);
      });
  }, [blog_id]);

  if (loading) return <p>Loading blog...</p>;
  if (error) return <p>{error}</p>;
  if (!blog) return <p>No blog found.</p>;

  return (
    <div className="container my-5 single-blog">
      <h1 className="mb-3">{blog.title}</h1>

      {blog.description && (
        <p className="text-muted fst-italic mb-4">
          {blog.description}
        </p>
      )}

      <div className="mb-3 text-secondary">
        <small>
          Created on: {new Date(blog.created_at).toLocaleString()}
        </small>
        {blog.updated_at && (
          <small className="ms-3">
            Last updated: {new Date(blog.updated_at).toLocaleString()}
          </small>
        )}
      </div>

      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default SingleBlog;
