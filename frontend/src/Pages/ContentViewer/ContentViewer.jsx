import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ContentViewer = () => {
  const { level, slug } = useParams();
  const [content, setContent] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
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
  }, [level, slug]);

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
                border: '1px solid rgba(0, 0, 0, 0.1)', // subtle transparent border
                backgroundColor: 'rgba(0, 123, 255, 0.05)',// very light blue background
                maxWidth: '320px',   // reduced width
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
                onClick={() => alert(`Added to cart: ₹${price}`)}
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
