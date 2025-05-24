import React from 'react';

const ViewUserModal = ({ user, onClose }) => {
  if (!user) return null;

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">User Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Referral Code:</strong> {user.referral_code}</p>
            <p><strong>Referred By:</strong> {user.referred_by || "—"}</p>
            <p><strong>Created At:</strong> {user.created_at}</p>
            <p><strong>Updated At:</strong> {user.updated_at}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUserModal;
