import React from 'react';

const PrintBlogModal = ({ blog, onClose }) => {
  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>Print Blog</title></head><body>');
    printWindow.document.write(`<h1>${blog.title}</h1><p>${blog.content}</p>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Print Blog</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p>Do you want to print this blog?</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button className="btn btn-success" onClick={handlePrint}>Print</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintBlogModal;
