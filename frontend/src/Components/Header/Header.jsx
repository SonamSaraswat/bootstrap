import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import profileIcon from '../../assets/profile_icon.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import ServiceDropdown from '../ServiceDropdown/ServiceDropdown';
import { useAuth } from '../../Context/AuthContext'; // ✅ import context

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth(); // ✅ get auth state

  const handleProfileClick = () => {
    navigate('/Dashboard', { state: { user } }); // use context user
  };

  return (
    <div className="container-fluid py-3 px-4 bg-white border-bottom shadow-sm">
      <div className="d-flex justify-content-between align-items-center">
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="logo" />
        </Link>

        <ul className="nav gap-3 fw-medium fs-6">
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/">HOME</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/About">ABOUT US</Link>
          </li>
          <li className="service-hover">
            <span className="service-title">SERVICES</span>
            <div className="custom-dropdown">
              <ServiceDropdown />
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link text-dark" href="#contact-us">CONTACT US</a>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-dark" to="/Refer">REFER TO EARN</Link>
          </li>
        </ul>

        {!isLoggedIn ? (
          <Link to="/Register">
            <button className="btn custom-signin-btn btn-primary">Sign In</button>
          </Link>
        ) : (
          <div className="profile-container" onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
            <img
              src={profileIcon}
              alt="Profile"
              className="profile-icon"
              style={{ width: '35px', height: '35px', borderRadius: '50%' }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
