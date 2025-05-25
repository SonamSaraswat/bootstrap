import React, { useState, useEffect } from 'react';
import './Servicess.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { Link } from 'react-router-dom';

const Servicess = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories/all')
      .then(res => {
        console.log("Fetched categories:", res.data);
        setCategories(res.data);
      })
      .catch(err => console.error("Error fetching categories", err));
  }, []);

  return (
    <div className='service'>
      <div className="serv-head"></div>
      <h2 className='service-heading'>Monitrix Provide Services</h2>
      <p className='service-para'>
        In service we provide our best for your financial and legal supporting role for your business up-liftment, Business-Mentor, Documentation. <br />
        You can find all as per your requirement in our service tab. we provide services in pan india through online.
      </p>

      <div className="service-container">
        <img className="service-image" src={assets.services} alt="services" />
        <ul className="service-items">
          {
            categories.map(category => (
              <li className="s-items dropdown" key={category.id}>
                <Link to={`/content/main/${category.slug}`}>{category.name}</Link>

                {category.subcategories?.length > 0 && (
                  <ul className="dropdown-menu">
                    {category.subcategories.map(sub => (
                      <li key={sub.id} className="dropdown-item">
                        <Link to={`/content/sub/${sub.slug}`} onClick={() => console.log("SUB SLUG:", sub.slug)}>{sub.name}</Link>

                        {sub.subsubcategories?.length > 0 && (
                          <ul className="dropdown-submenu">
                            {sub.subsubcategories.map(subsub => (
                              <li key={subsub.id} className="dropdown-subitem">
                                <Link to={`/content/subsub/${subsub.slug}`} onClick={() => console.log("SUB SUB SLUG:", subsub.slug)}>{subsub.name}</Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))
          }

        </ul>

        {/*  */}
      </div>


      <hr />
    </div>
  );
};

export default Servicess;
