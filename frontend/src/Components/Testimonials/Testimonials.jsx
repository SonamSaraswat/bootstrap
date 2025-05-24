import React, { useRef, useState, useEffect } from 'react';

import t1 from '../../assets/t1.jpeg';
import t2 from '../../assets/t2.jpeg';
import t3 from '../../assets/t3.jpeg';
import t4 from '../../assets/t4.png';
import t5 from '../../assets/t5.png';
import t6 from '../../assets/t6.jpeg';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Happy Client',
      image: t1,
      text: 'It’s a pleasure to work with people who know the meaning of quality and efficiency.',
    },
    {
      name: 'Happy Client',
      image: t2,
      text: 'Because of my association with Monitrix, I have been able to grow in my personal and professional life.',
    },
    {
      name: 'Happy Client',
      image: t3,
      text: "I've been a Monitrix Client for the past 6-7 years. They are the only brand I rely on.",
    },
    {
      name: 'Happy Client',
      image: t4,
      text: 'Very responsive and polite. Their expertise in tax planning is commendable!',
    },
    {
      name: 'Happy Client',
      image: t5,
      text: 'Smooth provide an excellent service—professional, knowledgeable, and always responsive.',
    },
    {
      name: 'Happy Client',
      image: t6,
      text: 'I had a great experience with Monitrix. The service was quick, and the billing was transparent.',
    },
  ];

  const [current, setCurrent] = useState(0);
  const length = testimonials.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [length]);

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  return (
    <div className="container my-5">
      <div className="text-center mb-4">
        <h2 className="fw-medium">Client Testimonials</h2>
        <p className="text-muted">Read Our Valued Client's Testimonials</p>
      </div>

      <div className="position-relative">
        <button className="btn btn-outline-secondary position-absolute top-50 start-0 translate-middle-y" onClick={prevSlide}>
          &#10094;
        </button>

        <div className="row justify-content-center">
          {testimonials.map((item, index) => (
            <div
              key={index}
              className={`col-md-4 col-sm-10 text-center d-${index === current ? 'block' : 'none'}`}
            >
              <div className="card shadow-sm p-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="card-img-top rounded-circle mx-auto"
                  style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text text-muted">{item.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn btn-outline-secondary position-absolute top-50 end-0 translate-middle-y" onClick={nextSlide}>
          &#10095;
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
