import React from 'react';

const DeleteUserModal = ({ userId, onClose, onDelete }) => {
  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-sm">
        <div className="modal-content">
          <div className="modal-body">
            <p>Are you sure you want to delete user ID <strong>{userId}</strong>?</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary btn-sm" onClick={onClose}>Cancel</button>
            <button className="btn btn-danger btn-sm" onClick={() => onDelete(userId)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUserModal;
