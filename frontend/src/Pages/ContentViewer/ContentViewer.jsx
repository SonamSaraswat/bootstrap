import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext'; // adjust path as needed

const ContentViewer = () => {
  const { level, slug } = useParams();
  const { user, isLoggedIn } = useAuth();

  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');

    // Fetch content
    fetch(`http://localhost:5000/api/content/${level}/${slug}`)
      .then(res => res.json())
      .then(data => {
        setContent(data.content || '<p>No content available.</p>');
        setPrice(data.price || '');
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load content.');
        setLoading(false);
        console.error("Error fetching content:", err);
      });

    // Fetch category ID and name
    fetch(`http://localhost:5000/api/categories/${level}/${slug}`)
      .then(res => res.json())
      .then(data => {
        setCategoryId(data.category_id);
        setCategoryName(data.category_name);
      })
      .catch(err => {
        console.error("Error fetching category info:", err);
      });

  }, [level, slug]);

  const handleAddToCart = () => {
    if (!isLoggedIn || !user?.id) {
      alert("Please log in to add items to cart.");
      return;
    }

    if (!categoryId || !price) {
      alert("Missing category or price info.");
      return;
    }

    fetch("http://localhost:5000/api/cart/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.id,
        category_id: categoryId,
        category_name: categoryName,
        price: price
      })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || "Item added to cart!");
      })
      .catch(err => {
        console.error("Error adding to cart:", err);
        alert("Failed to add to cart.");
      });
  };

  return (
    <div className="container mt-4">
      <div className="card-body">
        {loading && <div className="alert alert-info">Loading...</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <>
            <div
              className="card-text"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            <div
              className="d-flex align-items-center gap-3 my-3 p-3 rounded"
              style={{
                border: '1px solid rgba(0, 0, 0, 0.1)',
                backgroundColor: 'rgba(0, 123, 255, 0.05)',
                maxWidth: '320px',
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            >
              <p
                className="mb-0 fw-semibold text-primary"
                style={{ fontSize: '1.2rem' }}
              >
                <strong>Total Cost:</strong> ₹{price}
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ContentViewer;
