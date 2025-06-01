import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardModal from './DashboardModal';

const Dashboard = () => {
  const [showDashboard, setShowDashboard] = useState(false);

  const links = [
    ["bi-people", "User's Info", "Open Dashboard", "#", () => setShowDashboard(true)],
    ["bi-journal-text", "Cart", "Go to Cart", "/Cart"],
    ["bi-credit-card", "Orders", "Go to Orders", "/OrdersPage"],
  ];

  return (
    <div className="container py-5">
      <h4 className="mb-4 text-secondary text-center">Quick Links</h4>
      <div className="row g-4 justify-content-center">
        {links.map(([icon, title, link, path, onClick], i) => (
          <div key={i} className="col-md-6 col-lg-4">
            <div className="card h-100 border-0 shadow-sm">
              <div className="card-body d-flex flex-column text-center">
                <div className="bg-light rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
                  <i className={`${icon} fs-4 text-primary`}></i>
                </div>
                <h5 className="card-title text-dark mb-2">{title}</h5>
                {onClick ? (
                  <span onClick={onClick} role="button" className="stretched-link text-decoration-none text-primary fw-semibold">
                    {link}
                  </span>
                ) : (
                  <Link to={path} className="stretched-link text-decoration-none text-primary fw-semibold">
                    {link}
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <DashboardModal show={showDashboard} onClose={() => setShowDashboard(false)} />
    </div>
  );
};

export default Dashboard;
