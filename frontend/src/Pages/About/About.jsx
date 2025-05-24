import React, { useState } from 'react';
import { assets } from '../../assets/assets';

const About = () => {
  const [activeTab, setActiveTab] = useState("who");

  return (
    <div className="container py-5">

      {/* Founder Section */}
      <div className="row align-items-center mb-5">
        <div className="col-md-4 text-center">
          <img src={assets.sir} alt="Founder" className="img-fluid rounded-circle mb-3" style={{ maxWidth: '250px' }} />
          <p className="fw-semibold">Managing Director & Founder<br />Monitrix Corporate Services Pvt. Ltd.</p>
        </div>
        <div className="col-md-8">
          <h1 className="mb-3">Sunder Pal</h1>
          <p>
            With over a decade of expertise in taxation, compliance, and business consulting,
            Sunder Pal is the visionary behind Monitrix Corporate Services Pvt. Ltd.
          </p>
          <p>
            As the Managing Director, he has built Monitrix into a trusted name in the industry,
            offering cost-effective and reliable tax solutions to startups, MSMEs, and established enterprises.
          </p>
        </div>
      </div>

      {/* Services Section */}
      <div className="mb-5">
        <h2 className="mb-3">We</h2>
        <ul className="list-group list-group-flush mb-3">
          <li className="list-group-item">Empower businesses with hassle-free tax solutions</li>
          <li className="list-group-item">Ensure 100% compliance while maximizing financial efficiency</li>
          <li className="list-group-item">Educate entrepreneurs on smart tax-saving strategies</li>
        </ul>
        <p className="d-flex align-items-center">
          <i className="bi bi-envelope-fill me-2 text-primary" style={{ fontSize: '24px' }}></i>
          <strong>Need expert tax guidance? Get in touch with Monitrix today!</strong>
        </p>
      </div>

      {/* Team Section */}
      <div className="mb-5">
        <h2 className="mb-4">Our Expert Team</h2>
        <div className="row g-4">
          {[
            { name: "Mukta Balan", desc: "Specializes in regulatory compliance, taxation, and corporate governance." },
            { name: "Vaibhav Verma", desc: "Specializes in accounting and bookkeeping for businesses of all sizes." },
            { name: "Khushi Singal", desc: "Excels in business analysis and setting up new ventures." },
            { name: "Muskaan", desc: "Specializes in marketing strategies and business planning." }
          ].map((member, idx) => (
            <div className="col-md-6" key={idx}>
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{member.name}</h5>
                  <p className="card-text">{member.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Section */}
      <div className="row justify-content-center">
        <div className="col-md-10">
          <div className="d-flex justify-content-center mb-4">
            <div className="btn-group" role="group">
              {["who", "why", "mission"].map((tab, i) => (
                <button
                  key={i}
                  type="button"
                  className={`btn ${activeTab === tab ? "btn-primary" : "btn-outline-primary"} px-4`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab === "who" && "Who We Are"}
                  {tab === "why" && "Why To Choose Us"}
                  {tab === "mission" && "Mission, Vision & Goals"}
                </button>
              ))}
            </div>
          </div>

          <div className="tab-content p-4 border rounded-4 bg-light">
            {activeTab === "who" && (
              <div className="row">
                <div className="col-md-2 text-center mb-4">
                  <i className="bi bi-people-fill text-primary" style={{ fontSize: '4rem' }}></i>
                </div>
                <div className="col-md-10">
                  <div className="text-primary mb-2">PROVIDING BEST FINANCIAL & BUSINESS REGISTRATION SOLUTION!</div>
                  <h2>Who We Are</h2>
                  <p>At Monitrix Corporate Services Pvt. Ltd., we are more than just a tax consultancy—we are your trusted financial partners. With 10+ years of expertise, we specialize in GST compliance, ITR filing, company registration, and corporate tax solutions.</p>
                  <ul className="list-unstyled">
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2" />Our mission is to simplify taxation for businesses by offering cost-effective, reliable, and hassle-free financial services. Whether you are a startup, MSME, or an established enterprise, we provide tailored solutions to help you stay compliant, save taxes, and focus on growth.</li>
                    <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2" />Driven by a team of experienced professionals and led by Mr. Sunder Pal (Managing Director), Monitrix is committed to delivering transparency, accuracy, and excellence in every service we offer.</li>
                    <li><i className="bi bi-check-circle-fill text-primary me-2" />Empowering businesses with the right financial strategies.</li>
                  </ul>
                  <button className="btn btn-primary mt-3 px-4">LET'S SIMPLIFY COMPLIANCE TOGETHER!</button>
                </div>
              </div>
            )}

            {activeTab === "why" && (
              <div className="row">
                <div className="col-md-2 text-center mb-4">
                  <i className="bi bi-patch-check-fill text-success" style={{ fontSize: '4rem' }}></i>
                </div>
                <div className="col-md-10">
                  <h2>WE ARE HERE TO GROW YOUR BUSINESS</h2>
                  <p>Meet Our Founder – Sunder Pal, The Visionary Behind Monitrix → With 10+ years of experience in taxation and corporate compliance, Sunder Pal has helped countless businesses navigate complex tax laws with ease.</p>
                  <ul className="list-unstyled mt-3">
                    {[
                      ["Expert Guidance:", "Led by Mr. Sunder Pal (Managing Director), a seasoned tax consultant with a decade of experience."],
                      ["Hassle-Free Services:", "End-to-end support for smooth compliance."],
                      ["Affordable & Reliable:", "Quality tax solutions at competitive prices.."]
                    ].map(([title, desc], idx) => (
                      <li key={idx} className="mb-2">
                        <i className="bi bi-check-circle-fill text-primary me-2" />
                        <strong>{title}:</strong> {desc}
                      </li>
                    ))}
                  </ul>
                  <button className="btn btn-primary mt-3 px-4">CONTACT US TODAY</button>
                </div>
              </div>
            )}

            {activeTab === "mission" && (
              <div className="row">
                <div className="col-md-2 text-center mb-4">
                  <i className="bi bi-bar-chart-fill text-info" style={{ fontSize: '4rem' }}></i>
                </div>
                <div className="col-md-10">
                  <h2>Seamless, affordable financial services for all businesses</h2>
                   <p>At Monitrix, we envision a future where businesses—regardless of their size—can operate without the burden of complex tax regulations. Our goal is to create an ecosystem of financial transparency where companies can focus on their growth and innovation, while we take care of their tax compliance needs.</p>
                  <div className="mb-3">
                    <h5 className="text-primary">Mission</h5>
                    <p>To empower businesses with expert financial solutions that simplify GST, taxation, and corporate compliance—ensuring stress-free growth and success."</p>
                   
                  </div>
                  <div className="mb-3">
                    <h5 className="text-primary">Our Vision</h5>
                    <p>Our vision is to be a leading chartered accountant firm globally, renowned for our innovation, excellence, and unwavering commitment to client success. We aspire to continuously expand our knowledge base, embrace cutting-edge technologies, and foster a culture of continuous improvement.</p>
                  </div>
                  <h5 className="text-primary">Our Goals</h5>
                  <p>We are driven by our commitment to the financial well-being of our clients, and we strive to make a positive and lasting impact on the businesses we serve.</p>
                  <ul className="list-unstyled">
                    <li><i className="bi bi-check-circle-fill text-primary me-2" />Empower 10,000+ businesses by 2025</li>
                    <li><i className="bi bi-check-circle-fill text-primary me-2" />Expand service offerings</li>
                    <li><i className="bi bi-check-circle-fill text-primary me-2" />Leverage technology for ease</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
