import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
    window.location.reload();
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 mb-5">
        <div className="card-body">
          <h2 className="text-center text-primary fw-bold mb-4">
            Welcome to Your Dashboard
          </h2>

          {user ? (
            <div className="row justify-content-center">
              <div className="col-md-8">
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
                <div className="text-center">
                  <button onClick={handleLogout} className="btn btn-outline-danger px-4">
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="alert alert-warning text-center">
              No user data found. Please login again.
            </div>
          )}
        </div>
      </div>

      <h4 className="mb-4 text-secondary text-center">Quick Links</h4>
      <div className="row g-4 justify-content-center">
        {[
          ["bi-people", "Users", "Go to Users", "/Users"],
          ["bi-journal-text", "Orders", "Go to Orders", "/Orders"],
          ["bi-credit-card", "Payments", "Go to Payments", "/Payments"],
        ].map(([icon, title, link, linkpath], i) => (
          <div key={i} className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body d-flex flex-column text-center">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className={`${icon} fs-4 text-primary`}></i>
                </div>
                <h5 className="card-title text-dark mb-2">{title}</h5>
                <Link to={linkpath} className="stretched-link text-decoration-none text-primary fw-semibold">
                  {link}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
