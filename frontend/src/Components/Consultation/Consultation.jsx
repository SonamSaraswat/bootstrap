import React from 'react'


const Consultation = () => {
  return (
    <div className="container my-5">
      <div className="bg-primary p-4 rounded text-center shadow-sm text-light">
        <p className="fs-4 fst-italic mb-3">
          “You don’t need to worry – Monitrix is here for you, buddy!”
        </p>
        <p className="mb-2 fw-semibold">Need Help? Call Now :</p>
        <div className="d-flex justify-content-center gap-4 mb-3 flex-wrap">
          <span className="d-flex align-items-center gap-2">
            <i className="bi bi-telephone-fill fs-5 text-primary"></i>
            +91-1662-355590
          </span>
          <span className="d-flex align-items-center gap-2">
            <i className="bi bi-telephone-fill fs-5 text-primary"></i>
            +91 881800 88600
          </span>
        </div>
        <p className="mb-0">
          OR Write to{' '}
          <a href="mailto:info@mymonitrix.com" className="text-decoration-none text-light">
            info@mymonitrix.com
          </a>
        </p>
      </div>
    </div>
  )
}

export default Consultation
