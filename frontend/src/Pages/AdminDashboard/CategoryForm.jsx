import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminAddCategory = ({ onCategoryAdded }) => {
  const [level, setLevel] = useState('main');
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [parentOptions, setParentOptions] = useState([]);
  const [selectedParentName, setSelectedParentName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories/flat')
      .then(response => {
        setParentOptions(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const getValidParents = () => {
    const levelOrder = ['main', 'sub', 'subsub', 'subsubsub'];
    const parentLevelIndex = levelOrder.indexOf(level) - 1;
    const validParentLevel = levelOrder[parentLevelIndex];
    return parentOptions.filter(cat => cat.level === validParentLevel);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/create', {
        level,
        name,
        slug,
        parent_name: selectedParentName || null
      });
      alert('Category created successfully');
      setName('');
      setSlug('');
      setSelectedParentName('');
      setLevel('main');
      onCategoryAdded();
    } catch (err) {
      console.error(err);
      alert('Error creating category');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mt-3" style={{ maxWidth: 400 }}>
      <h4 className="mb-4">Add New Category</h4>

      {/* Category Level */}
      <div className="mb-3">
        <label htmlFor="levelSelect" className="form-label">Category Level</label>
        <select
          id="levelSelect"
          className="form-select"
          value={level}
          onChange={e => setLevel(e.target.value)}
          required
        >
          <option value="main">Main</option>
          <option value="sub">Sub</option>
          <option value="subsub">Sub-Sub</option>
          <option value="subsubsub">Sub-Sub-Sub</option>
        </select>
      </div>

      {/* Name */}
      <div className="mb-3">
        <label htmlFor="nameInput" className="form-label">Category Name</label>
        <input
          type="text"
          id="nameInput"
          className="form-control"
          placeholder="Category Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>

      {/* Slug */}
      <div className="mb-3">
        <label htmlFor="slugInput" className="form-label">Slug (URL-friendly)</label>
        <input
          type="text"
          id="slugInput"
          className="form-control"
          placeholder="slug-url"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          required
        />
      </div>

      {/* Parent Selection (except for main) */}
      {level !== 'main' && (
        <div className="mb-3">
          <label htmlFor="parentSelect" className="form-label">Select Parent Category</label>
          <select
            id="parentSelect"
            className="form-select"
            value={selectedParentName}
            onChange={e => setSelectedParentName(e.target.value)}
            required
          >
            <option value="">Select Parent Category</option>
            {getValidParents().map(parent => (
              <option key={parent.id} value={parent.name}>
                {parent.name} ({parent.level})
              </option>
            ))}
          </select>
        </div>
      )}

      <button type="submit" className="btn btn-primary w-100">Create Category</button>
    </form>
  );
};

export default AdminAddCategory;
