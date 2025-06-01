import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from "react-router-dom";
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-vh-100 bg-white">
      {/* Top Info Bar */}
      <div className="border-bottom py-2 bg-light">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center gap-4 text-muted">
            <span><i className="bi bi-telephone me-2"></i>+91-1662-355590</span>
            <span><i className="bi bi-telephone me-2"></i>+91 881800 88600</span>
          </div>
          <div className="d-flex align-items-center text-muted">
            <span className="me-3"><i className="bi bi-clock me-2"></i>Mon-Sat</span>
            <span>8:00 AM - 9:00 PM</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="py-3" style={{ background: "linear-gradient(to right, #e6f2ff, #cce5ff)" }}>
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo */}
          <div className="d-flex align-items-center">
            <i className="bi bi-building fs-1 text-primary me-3"></i>
            <div>
              <h4 className="mb-0 text-primary">Monitrix</h4>
              <small className="text-primary-emphasis">Corporate Services Pvt. Ltd.</small>
            </div>
          </div>

          {/* Navigation */}
          <ul className="nav d-none d-md-flex">
            {[
              ["dashboard", "Dashboard",],
              ["users", "Users",'/Users'],
              ["search", "Search",'/UsersSearch'],
              ["blogs", "Blogs",'/AdminBlogs'],
              ["orders", "Orders",'/Orders'],
              ["categories", "Categories",'/Admin'],
            ].map(([key, label,linkpath]) => (
              <li key={key} className="nav-item">
                <Link to={linkpath}><button
                  className={`nav-link ${activeTab === key ? "text-primary fw-bold" : "text-secondary"}`}
                  onClick={() => setActiveTab(key)}
                >
                  {label}
                </button></Link>
              </li>
            ))}
            <li className="nav-item">
              <button  onClick={handleLogout} className="nav-link text-secondary d-flex align-items-center">
                <i className="bi bi-box-arrow-right me-1"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-5">
        <h1 className="text-center text-secondary mb-5">Our Services</h1>

        <div className="row g-4 mb-4">
          {[
            ["bi-people", "Users", "Go to Users","/Users"],
            ["bi-search", "Search", "Search Users","/UsersSearch"],
            ["bi-journal-text", "Orders", "Go to Orders","/Orders"],
            ["bi-credit-card", "Payments", "Go to Payments","/Payement"],
          ].map(([icon, title, link, linkpath], i) => (
            <div key={i} className="col-md-6 col-lg-3">
              <div className="card h-100 text-center border">
                <div className="card-body d-flex flex-column align-items-center">
                  <div className="bg-light p-3 rounded-circle mb-3">
                    <i className={`${icon} fs-4 text-secondary`}></i>
                  </div>
                  <h5 className="card-title text-secondary mb-3">{title}</h5>
                  <Link to= {linkpath} className="text-primary mt-auto">{link}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row g-4">
          {[
            ["bi-tags", "Categories", "Go to Categories","/Admin"],
            ["bi-rss", "Blogs", "Go to Blogs","/AdminBlogs"],
          ].map(([icon, title, link, linkpath], i) => (
            <div key={i} className="col-md-6 col-lg-3">
              <div className="card h-100 text-center border">
                <div className="card-body d-flex flex-column align-items-center">
                  <div className="bg-light p-3 rounded-circle mb-3">
                    <i className={`${icon} fs-4 text-secondary`}></i>
                  </div>
                  <h5 className="card-title text-secondary mb-3">{title}</h5>
                  <Link to={linkpath} className="text-primary mt-auto">{link}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
