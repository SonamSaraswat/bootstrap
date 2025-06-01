import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="container mt-5 mb-5 text-center">
      <div className="card shadow p-5">
        <h1 className="text-success mb-4">
          <i className="bi bi-check-circle-fill"></i> Payment Successful!
        </h1>
        <p className="lead">Thank you for your purchase. Your order has been placed successfully.</p>
        <p className="text-muted">You can view your order details in the <Link to="/Dashboard">My Orders</Link> section.</p>
        <Link to="/" className="btn btn-primary mt-3">
          <i className="bi bi-house-door-fill"></i> Go to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;
