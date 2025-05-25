import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AdminAddCategory from '../AdminDashboard/CategoryForm';

const levelMap = {
  0: 'main',
  1: 'sub',
  2: 'subsub',
  3: 'subsubsub'
};

const AdminTreeEditor = () => {
  const [treeData, setTreeData] = useState([]);
  const [expandedNodes, setExpandedNodes] = useState({});
  const [selectedNode, setSelectedNode] = useState(null);
  const [editorContent, setEditorContent] = useState('');
  const [price, setPrice] = useState('');

  const fetchTreeData = () => {
    axios.get('http://localhost:5000/api/categories/all')
      .then(res => {
        const convertToArrays = (nodes) => {
          if (!Array.isArray(nodes)) return [];
          return nodes.map(node => ({
            ...node,
            subcategories: node.subcategories ? convertToArrays(Object.values(node.subcategories)) : [],
            subsubcategories: node.subsubcategories ? convertToArrays(Object.values(node.subsubcategories)) : [],
            subsubsubcategories: node.subsubsubcategories ? convertToArrays(Object.values(node.subsubsubcategories)) : []
          }));
        };

        setTreeData(convertToArrays(res.data));
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchTreeData();
  }, []);

  useEffect(() => {
    if (!selectedNode) return;
    const { slug, level } = selectedNode;
    axios.get(`http://localhost:5000/api/content/${level}/${slug}`)
      .then(res => {
        setEditorContent(res.data.content || '');
        setPrice(res.data.price || '');
      })
      .catch(() => {
        setEditorContent('');
        setPrice('');
      });
  }, [selectedNode]);

  const toggleNode = (id) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const renderTree = (nodes, depth = 0) => {
    if (!nodes || nodes.length === 0) return null;

    return nodes.map(node => {
      const isExpanded = expandedNodes[node.id] || false;
      const level = levelMap[depth];
      let children = [];

      if (depth === 0) children = node.subcategories;
      else if (depth === 1) children = node.subsubcategories;
      else if (depth === 2) children = node.subsubsubcategories;

      return (
        <div
          key={node.id}
          className="ms-3 border-start ps-3 my-2"
          style={{ cursor: 'pointer' }}
        >
          <div className="d-flex align-items-center">
            {children.length > 0 && (
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary me-2"
                onClick={() => toggleNode(node.id)}
                aria-label={isExpanded ? 'Collapse' : 'Expand'}
              >
                {isExpanded ? '−' : '+'}
              </button>
            )}
            <div
              onClick={() => setSelectedNode({ slug: node.slug, level })}
              className={selectedNode?.slug === node.slug ? 'fw-bold' : ''}
              title={`Click to edit ${level} - ${node.name}`}
            >
              {node.name} <small className="text-muted">({level})</small>
            </div>
          </div>
          {isExpanded && renderTree(children, depth + 1)}
        </div>
      );
    });
  };

  const handleSave = () => {
    if (!selectedNode) return alert('Select a node to save content');
    const { slug, level } = selectedNode;

    axios.post('http://localhost:5000/api/content', {
      slug,
      level,
      content: editorContent,
      price: price || 0
    }).then(() => {
      alert('Content saved successfully!');
    }).catch(() => {
      alert('Error saving content.');
    });
  };

  return (
    <div className="container-fluid py-3">
      <div className="row">
        {/* Left column: Tree + Add Category form */}
        <div className="col-md-5 border rounded p-3" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
          <h2>Category Tree</h2>
          {renderTree(treeData)}

          <hr />

          <h4 className="mt-4">Add New Category</h4>
          <AdminAddCategory onCategoryAdded={fetchTreeData} />
        </div>

        {/* Right column: Content Editor */}
        <div className="col-md-7 d-flex flex-column">
          <h2>Content Editor</h2>
          {selectedNode ? (
            <>
              <div className="mb-2">
                <strong>Editing:</strong> {selectedNode.slug} ({selectedNode.level})
              </div>

              <div className="mb-3">
                <label htmlFor="priceInput" className="form-label">Price (₹)</label>
                <input
                  type="number"
                  className="form-control"
                  id="priceInput"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="Enter price for this category/service"
                />
              </div>



              <ReactQuill
                theme="snow"
                value={editorContent}
                onChange={setEditorContent}
                style={{ height: '70vh', marginBottom: '3rem' }}
              />
              <button
                className="btn btn-primary align-self-start"
                onClick={handleSave}
              >
                Save Content
              </button>
            </>
          ) : (
            <div className="text-muted fst-italic">Select a category or service from the tree to edit content</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminTreeEditor;
