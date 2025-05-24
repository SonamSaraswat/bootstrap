import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ContentViewer = () => {
  const { level, slug } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    fetch(`http://localhost:5000/api/content/${level}/${slug}`)
      .then(res => res.json())
      .then(data => {
        setContent(data.content || '<p>No content available.</p>');
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
          <h5 className="card-title text-capitalize mb-3">
          </h5>
          {loading && <div className="alert alert-info">Loading...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && !error && (
            <div
              className="card-text"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      
    </div>
  );
};

export default ContentViewer;
