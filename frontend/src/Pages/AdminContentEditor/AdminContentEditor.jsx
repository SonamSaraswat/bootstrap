import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdminContentEditor = () => {
  const { level, slug } = useParams(); // ✅ This gets the URL params
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!level || !slug) return;
    fetch(`http://localhost:5000/api/content/${level}/${slug}`)
      .then(res => res.json())
      .then(data => setContent(data.content || ''))
      .catch(err => console.error("Fetch error:", err));
  }, [level, slug]);

  const handleSave = async () => {
    try {
      await fetch(`http://localhost:5000/api/content`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level, slug, content }),
      });
      alert("Saved!");
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save content.");
    }
  };

  return (
    <div>
      <h2>Edit Content for {slug} ({level})</h2>
      <ReactQuill value={content} onChange={setContent}/>
      <button
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
};

export default AdminContentEditor;
