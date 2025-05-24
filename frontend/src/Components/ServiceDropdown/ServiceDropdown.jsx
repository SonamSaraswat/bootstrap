import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './ServiceDropdown.css';

const ServiceDropdown = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/categories/all")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="dropdown-grid">
      {categories.slice(0, 6).map((main) => (
        <div className="dropdown-column" key={main.id}>
          <Link to={`/content/main/${main.slug}`} className="main-category">
            {main.name}
          </Link>

          {main.subcategories?.slice(0, 5).map((sub) => (
            <Link
              key={sub.id}
              to={`/content/sub/${sub.slug}`}
              className="sub-category"
            >
              {sub.name}
            </Link>
          ))}
        </div>
      ))}

      <div className="dropdown-footer">
        <Link to="/servicess" className="view-more-btn">More</Link>
      </div>
    </div>
  );
};

export default ServiceDropdown;
