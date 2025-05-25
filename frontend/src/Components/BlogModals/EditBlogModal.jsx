import React, { useState } from 'react';

const EditBlogModal = ({ blog, onClose, onSave }) => {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [description, setDescription] = useState(blog.description || ''); // Added

  const handleSubmit = () => {
    if (!title || !content || !description) {
      alert("All fields are required");
      return;
    }

    const updatedBlog = {
      blog_id: blog.blog_id,
      title,
      content,
      description
    };

    onSave(updatedBlog);
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Blog</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <label className="form-label">Title</label>
            <input
              className="form-control mb-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label className="form-label">Description</label>
            <input
              className="form-control mb-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <label className="form-label">Content</label>
            <textarea
              className="form-control"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
            />
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlogModal;
