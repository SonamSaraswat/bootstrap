import React from 'react';

const ViewBlogModal = ({ blog, onClose }) => {
  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Blog Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>Title:</strong> {blog.title}</p>
            <p><strong>Content:</strong> {blog.content}</p>
            <p><strong>Created At:</strong> {blog.created_at}</p>
            <p><strong>Updated At:</strong> {blog.updated_at}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBlogModal;
