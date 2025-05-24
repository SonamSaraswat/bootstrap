import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // Needed for carousel functionality

import img1 from "../../assets/big3.jpg";
import img2 from "../../assets/big4.jpg";
import img3 from "../../assets/big5.jpg";

const Container = () => {

  
  return (
    <div className="container-fluid px-0">
      <div className="position-relative w-100">
        <div
          id="carouselExample"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          data-bs-interval="3000" // ← This is sufficient
        >
          {/* Indicators */}
          <div className="carousel-indicators">
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                type="button"
                data-bs-target="#carouselExample"
                data-bs-slide-to={idx}
                className={idx === 0 ? "active" : ""}
                aria-current={idx === 0 ? "true" : undefined}
                aria-label={`Slide ${idx + 1}`}
              ></button>
            ))}
          </div>

          {/* Slides */}
          <div className="carousel-inner">
            {[img1, img2, img3].map((img, idx) => (
              <div
                key={idx}
                className={`carousel-item ${idx === 0 ? "active" : ""}`}
              >
                <img
                  src={img}
                  className="d-block w-100"
                  style={{ height: "500px", objectFit: "cover" }}
                  alt={`Slide ${idx + 1}`}
                />
              </div>
            ))}
          </div>

          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Overlay */}
        <div
          className="position-absolute bottom-0 w-100 text-white text-center px-3 py-4"
          style={{
            backgroundColor: "rgba(12, 75, 200, 0.9)",
            zIndex: 10,
          }}
        >
          <h2 className="fw-bold fs-3 mb-2">Welcome to Monitrix</h2>
          <p className="fs-5 mb-2">"Your Trusted Business Partner!"</p>
          <p className="fs-6 mb-0">
            At Monitrix, we make business registration, taxation, and compliance easy for entrepreneurs, startups,
            and enterprises across India and internationally.
            <br />
            Whether you’re starting a new business or managing taxes, our expert team ensures a hassle-free,
            fast, and reliable experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Container;
