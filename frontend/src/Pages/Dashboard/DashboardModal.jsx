// src/components/DashboardModal.jsx
import React from 'react';
import { useAuth } from '../../Context/AuthContext';

const DashboardModal = ({ show, onClose }) => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    onClose(); // Close modal
    window.location.href = '/'; // Navigate home
  };

  if (!show) return null;

  return (
    <div className="modal d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">User Dashboard</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {user ? (
              <div className="list-group mb-4 shadow-sm">
                <div className="list-group-item d-flex justify-content-between">
                  <strong>Username:</strong> <span>{user.username}</span>
                </div>
                <div className="list-group-item d-flex justify-content-between">
                  <strong>Email:</strong> <span>{user.email}</span>
                </div>
                <div className="list-group-item d-flex justify-content-between">
                  <strong>Referral Code:</strong> <span>{user.referral_code}</span>
                </div>
                <div className="list-group-item d-flex justify-content-between">
                  <strong>Referred By:</strong> <span>{user.referred_by || '—'}</span>
                </div>
              </div>
            ) : (
              <div className="alert alert-warning text-center">
                No user data found. Please login again.
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Close</button>
            <button className="btn btn-outline-danger" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardModal;
