import React from 'react'
import { models } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const SModels = () => {
  const navigate = useNavigate()

  const handleClick = (item) => {
    if (item.id === 1) {
      navigate('/Solar', { state: item })
    } else if (item.id === 2) {
      navigate('/Society', { state: item })
    } else if (item.id === 3) {
      navigate('/Itr', { state: item })
    } else if (item.id === 4) {
      navigate('/Gst', { state: item })
    } else if (item.id === 5) {
      navigate('/Nsic', { state: item })
    }
  }

  return (
    <div className="container my-40">
      <div className="text-center mb-5">
        <h1 className="mb-3 fw-normal">Have a look on our Services and Pricing!!</h1>
        <p className="lead fs-6">
          It’s a gift for all startups for decreasing business maintenance cost, because we provide a low cost record
          maintenance and as monitoring your business for better utilization of your sources. We deliver it through our
          expertise. Your HRD, financial, administration and banking etc documents, all of these we prepare for you.
        </p>
      </div>

      <div className="row g-4">
        {models.map((item) => (
          <div className="col-12 col-md-6 col-lg-4" key={item.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={item.img}
                className="card-img-top"
                alt={item.title}
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{item.title}</h5>
                <p className="card-text text-muted flex-grow-1">{item.price}</p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => handleClick(item)}
                >
                  Explore More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SModels
