import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Heading = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Appointment'); 
  };

  return (
    <div className="container-fluid bg-light py-4">
      <div className="row align-items-center justify-content-between">
        <div className="col-md-8">
          <p className="h5 mb-0 text-primary fw-semibold">
            India’s Largest Financial Services Platform for Your Business
          </p>
        </div>
        <div className="col-md-4 text-md-end mt-3 mt-md-0">
          <button className="btn btn-primary px-4 py-2" onClick={handleClick}>
            BOOK APPOINTMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Heading;
