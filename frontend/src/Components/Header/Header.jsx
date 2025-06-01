import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import profileIcon from '../../assets/profile_icon.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import ServiceDropdown from '../ServiceDropdown/ServiceDropdown';
import { useAuth } from '../../Context/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { isLoggedIn, user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const [showMobileServices, setShowMobileServices] = useState(false);

  const handleProfileClick = () => {
    navigate('/Dashboard', { state: { user } });
    setMenuOpen(false);
  };


  const toggleMobileServices = () => {
  setShowMobileServices(!showMobileServices);
};

const handleLinkClick = () => {
  setMenuOpen(false);
  setShowMobileServices(false);
};

  // Update `isMobile` on resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      if (!mobile) setMenuOpen(false); // auto-close mobile menu on large screen
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="container-fluid py-3 px-4 bg-white border-bottom shadow-sm">
      <div className="d-flex justify-content-between align-items-center">

        {/* Logo */}
        <Link to="/">
          <img src={assets.logo} alt="Logo" className="logo" />
        </Link>

        {/* Hamburger icon - visible only on small screens */}
        {isMobile && (
          <button
            className="navbar-toggler border-0 bg-primary text-white"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="navbar-toggler-icon custom-toggler-icon"></span>
          </button>
        )}

        {/* Desktop Menu (centered) */}
        <ul className="nav gap-3 fw-medium fs-6 d-none d-lg-flex justify-content-center m-0">
          <li className="nav-item"><Link className="nav-link text-dark" to="/">HOME</Link></li>
          <li className="nav-item"><Link className="nav-link text-dark" to="/About">ABOUT US</Link></li>
          <li className="service-hover">
            <span className="service-title">SERVICES</span>
            <div className="custom-dropdown"><ServiceDropdown /></div>
          </li>
          <li className="nav-item"><a className="nav-link text-dark" href="#contact-us">CONTACT US</a></li>
          <li className="nav-item"><Link className="nav-link text-dark" to="/Refer">REFER TO EARN</Link></li>
        </ul>

        {/* Sign In/Profile (right side on large screens) */}
        <div className="d-none d-lg-block">
          {!isLoggedIn ? (
            <Link to="/Register">
              <button className="btn btn-primary custom-signin-btn">Sign In</button>
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

      {/* Mobile Menu (only show on mobile and when menuOpen is true) */}
     {isMobile && menuOpen && (
  <div className="d-lg-none mt-3">
    <ul className="nav flex-column gap-2 fw-medium fs-6">
      <li className="nav-item"><Link className="nav-link text-dark" to="/" onClick={handleLinkClick}>HOME</Link></li>
      <li className="nav-item"><Link className="nav-link text-dark" to="/About" onClick={handleLinkClick}>ABOUT US</Link></li>
      
      {/* Toggleable SERVICES menu */}
      <li className="nav-item">
        <button className="btn btn-link nav-link text-dark text-start p-0" onClick={toggleMobileServices}>
          SERVICES {showMobileServices ? '▲' : '▼'}
        </button>
        {showMobileServices && (
          <div className="mt-2">
            <ServiceDropdown />
          </div>
        )}
      </li>

      <li className="nav-item"><a className="nav-link text-dark" href="#contact-us" onClick={handleLinkClick}>CONTACT US</a></li>
      <li className="nav-item"><Link className="nav-link text-dark" to="/Refer" onClick={handleLinkClick}>REFER TO EARN</Link></li>

      <li className="nav-item mt-3">
        {!isLoggedIn ? (
          <Link to="/Register" onClick={handleLinkClick}>
            <button className="btn btn-primary w-100">Sign In</button>
          </Link>
        ) : (
          <div onClick={handleProfileClick} style={{ cursor: 'pointer' }}>
            <img
              src={profileIcon}
              alt="Profile"
              className="profile-icon"
              style={{ width: '35px', height: '35px', borderRadius: '50%' }}
            />
          </div>
        )}
      </li>
    </ul>
  </div>
)}

    </div>
  );
};

export default Header;
