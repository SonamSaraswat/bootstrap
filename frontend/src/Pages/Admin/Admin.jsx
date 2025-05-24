import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

  // Fetch full nested tree
 useEffect(() => {
  axios.get('http://localhost:5000/api/categories/all')
    .then(res => {
      // Convert nested subcategories objects to arrays recursively
     const convertToArrays = (nodes) => {
  if (!Array.isArray(nodes)) {
    console.warn('Expected array but got:', nodes);
    return []; // or handle accordingly
  }
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
}, []);

  // When selectedNode changes, fetch its content from backend
  useEffect(() => {
    if (!selectedNode) return;
    const { slug, level } = selectedNode;
    axios.get(`http://localhost:5000/api/content/content/${level}/${slug}`)
      .then(res => setEditorContent(res.data.content || ''))
      .catch(() => setEditorContent(''));
  }, [selectedNode]);

  // Toggle expand/collapse of a node by id
  const toggleNode = (id) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Recursive Tree Renderer
  const renderTree = (nodes, depth = 0) => {
    if (!nodes || nodes.length === 0) return null;

    return nodes.map(node => {
      const isExpanded = expandedNodes[node.id] || false;
      const level = levelMap[depth];

      // Determine children key based on depth
      let children = [];
      if (depth === 0) children = node.subcategories;
      else if (depth === 1) children = node.subsubcategories;
      else if (depth === 2) children = node.subsubsubcategories;
      else children = [];

      return (
        <div key={node.id} style={{ marginLeft: depth * 20, borderLeft: '1px solid #ccc', paddingLeft: 10, marginTop: 5 }}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            {children.length > 0 && (
              <button onClick={() => toggleNode(node.id)} style={{ marginRight: 5 }}>
                {isExpanded ? '-' : '+'}
              </button>
            )}
            <div 
              onClick={() => setSelectedNode({ slug: node.slug, level })}
              style={{ fontWeight: selectedNode?.slug === node.slug ? 'bold' : 'normal' }}
              title={`Click to edit ${level} - ${node.name}`}
            >
              {node.name} <small style={{ color: '#666' }}>({level})</small>
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

    axios.post('http://localhost:5000/api/content/content', {
      slug,
      level,
      content: editorContent
    }).then(() => {
      alert('Content saved successfully!');
    }).catch(() => {
      alert('Error saving content.');
    });
  };

  return (
    <div style={{ display: 'flex', gap: 40, padding: 20 }}>
      <div style={{ width: '40%', border: '1px solid #ddd', padding: 10, height: '80vh', overflowY: 'auto' }}>
        <h2>Category Tree</h2>
        {renderTree(treeData)}
      </div>

      <div style={{ width: '60%', display: 'flex', flexDirection: 'column' }}>
        <h2>Content Editor</h2>
        {selectedNode ? (
          <>
            <div>
              <strong>Editing:</strong> {selectedNode.slug} ({selectedNode.level})
            </div>
            <ReactQuill theme="snow" value={editorContent} onChange={setEditorContent} style={{ height: '70vh', marginBottom: 10 }} />
            <button onClick={handleSave} style={{ padding: '10px 20px', fontSize: 16 }}>Save Content</button>
          </>
        ) : (
          <div>Select a category or service from the tree to edit content</div>
        )}
      </div>
    </div>
  );
};

export default AdminTreeEditor;
