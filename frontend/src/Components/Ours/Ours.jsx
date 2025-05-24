import React from 'react'

const Ours = () => {
  const services = [
    {
      title: 'Business Setup',
      desc: 'Conducting market research, writing a business plan, choosing a business structure, selecting a unique name, securing funding, and registering your business',
      icon: 'briefcase-fill',
    },
    {
      title: 'Registration 2',
      desc: 'Permanent registration is the final step in registering a vehicle with the Regional Transport Office (RTO), providing the vehicle with a unique number plate. This differs from temporary registration, which is a temporary measure for newly purchased vehicles until permanent registration is completed',
      icon: 'file-earmark-check-fill',
    },
    {
      title: 'Import Export',
      desc: "Exporting refers to the selling of goods and services from the home country to a foreign nation. Whereas, importing refers to the purchase of foreign products and bringing them into one's home country. Further, it is divided in two ways, which are, Direct. Indirect.",
      icon: 'box-seam',
    },
    {
      title: 'RCMC',
      desc: 'RCMC, or Registration-Cum-Membership Certificate, is a crucial document for Indian exporters, validating their registration with a specific Export Promotion Council (EPC) or Commodity Board and enabling them to benefit from various government schemes and concessions under the Foreign Trade Policy (FTP).',
      icon: 'patch-check-fill',
    },
    {
      title: 'Tax',
      desc: 'A mandatory financial charge or levy imposed on an individual or legal entity by a governmental organization to support government spending and public expenditures collectively or to regulate and reduce negative externalities.',
      icon: 'currency-exchange',
    },
    {
      title: 'IPR',
      desc: 'IPR stands for Intellectual Property Rights. These are legal rights granted to creators of original works, inventions, and ideas to protect their creations from being used or copied by others without permission. IPRs are crucial for businesses and individuals to protect their creations, encouraging innovation and investment.',
      icon: 'shield-lock-fill',
    },
  ]

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Our Services</h1>
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          {services.slice(0, 3).map(({ title, desc, icon }) => (
            <div
              key={title}
              className="mb-4 p-4 rounded border border-2 border-transparent"
              style={{
                borderColor: 'rgba(0, 123, 255, 0.2)', // subtle transparent blue border
                backgroundColor: 'rgba(0, 123, 255, 0.05)', // very light blue bg
                boxShadow: '0 4px 8px rgba(0,0,0,0.05)', // subtle shadow
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)'
              }}
            >
              <h3 className="d-flex align-items-center gap-2 mb-3">
                <i className={`bi bi-${icon} text-primary fs-4`}></i> {title}
              </h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>

        <div className="col-12 col-md-6">
          {services.slice(3, 6).map(({ title, desc, icon }) => (
            <div
              key={title}
              className="mb-4 p-4 rounded border border-2 border-transparent"
              style={{
                borderColor: 'rgba(0, 123, 255, 0.2)',
                backgroundColor: 'rgba(0, 123, 255, 0.05)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.boxShadow = '0 10px 15px rgba(0,0,0,0.15)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.05)'
              }}
            >
              <h3 className="d-flex align-items-center gap-2 mb-3">
                <i className={`bi bi-${icon} text-primary fs-4`}></i> {title}
              </h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Ours
