import React from 'react'
import { assets } from '../../assets/assets'

const Values = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Monitrix's Core Values</h1>
      <p className="text-center mb-5">
        We are driven by our commitment to the financial well-being of our clients, and we strive to make a positive and lasting impact on the businesses we serve. Our vision is to be a leading chartered accountant firm globally, renowned for our innovation, excellence, and unwavering commitment to client success. We aspire to continuously expand our knowledge base, embrace cutting-edge technologies, and foster a culture of continuous improvement.
      </p>
      <div className="row align-items-center">
        <div className="col-md-6 text-center mb-4 mb-md-0">
          <img
            src={assets.values}
            alt="values"
            className="img-fluid rounded"
            style={{ maxHeight: '350px', objectFit: 'contain' }}
          />
        </div>
        <div className="col-md-6">
          <div className="row gy-4">
            <div className="col-12">
              <h4>Branding & Visibility</h4>
              <p>Our strategic approach ensures long-term brand growth and customer loyalty.</p>
            </div>
            <div className="col-12">
              <h4>Manage Projects</h4>
              <p>Our expertise drives timely delivery and optimal results.</p>
            </div>
            <div className="col-12">
              <h4>Tech based Solution</h4>
              <p>Our solutions drive digital transformation for business growth.</p>
            </div>
            <div className="col-12">
              <h4>Ensuring regulatory adherence.</h4>
              <p>Our expertise minimizes risks and legal challenges.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Values
