import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'rgb(40, 116, 252)' }} className="text-white pt-4 pb-2" id="contact-us">
      <div className="container">
        <div className="row">

          {/* About Section */}
          <div className="col-md-4 mb-3">
            <h4 className="fw-bold">Monitrix</h4>
            <p className="small">
              At Monitrix Corporate Services Private Limited, we are the architects of financial success.
              With a team of dedicated and experienced Chartered Accountants (CAs), we provide exceptional financial and corporate solutions.
              <br />
              <strong>Excellence in Every Financial Calculation</strong><br />
              Crafting Your Financial Success Story.
            </p>
            <button className="btn btn-light btn-sm mt-2">Refer to Earn</button>
          </div>

          {/* Useful Links */}
          <div className="col-md-4 mb-3">
            <h4 className="fw-bold">Useful Links</h4>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="https://www.gst.gov.in/" className="text-white text-decoration-none">
                  <i className="bi bi-link-45deg me-2"></i>Govt GST Portal
                </a>
              </li>
              <li className="mb-2">
                <a href="https://www.incometax.gov.in/iec/foportal/" className="text-white text-decoration-none">
                  <i className="bi bi-link-45deg me-2"></i>Income Tax Portal
                </a>
              </li>
              <li className="mb-2">
                <a href="https://www.mca.gov.in/content/mca/global/en/home.html" className="text-white text-decoration-none">
                  <i className="bi bi-link-45deg me-2"></i>MCA
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-md-4 mb-3">
            <h4 className="fw-bold">Connect With Us</h4>
            <p className="mb-2">
              <i className="bi bi-geo-alt-fill me-2"></i>
              <strong>Office Address</strong><br />
              259 1st Floor, Green Square Market, Hisar-125001
            </p>
            <p className="mb-2">
              <i className="bi bi-clock-fill me-2"></i>
              <strong>Working Hours</strong><br />
              8:00am – 9:00pm (Mon – Sat) <br />
              Sun & Holiday Closed
            </p>
            <p className="mb-2">
              <strong>Contact Us</strong><br />
              <i className="bi bi-telephone-fill me-2"></i> +91-1662-355590 <br />
              <i className="bi bi-telephone-fill me-2"></i> +91 881800 88600 <br />
              <i className="bi bi-envelope-fill me-2"></i> info@mymonitrix.com
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center pt-2 border-top border-light mt-3">
          <small>
            &copy; 2025 Monitrix Corporate Services Private Limited. All Rights Reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
