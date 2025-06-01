import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [year, setYear] = useState('2025');
  const [month, setMonth] = useState('1'); // January = 1
  const [entriesPerPage, setEntriesPerPage] = useState('10');
  const [searchTerm, setSearchTerm] = useState('');
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/order/all', {
        params: {
          year,
          month,
          page: currentPage,
          limit: entriesPerPage
        }
      });

      setOrders(res.data.data);
      setTotalOrders(res.data.total);
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [year, month, currentPage, entriesPerPage]);

  const filteredOrders = orders.filter(order =>
    Object.values(order).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(totalOrders / entriesPerPage);

  return (
    <div className="container py-4 bg-light min-vh-100">
      <h2 className="text-center mb-4 text-secondary">Orders</h2>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-6 mb-3">
          <label className="form-label">Select Year:</label>
          <select className="form-select" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Select Month:</label>
          <select className="form-select" value={month} onChange={(e) => setMonth(e.target.value)}>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('default', { month: 'long' })}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Controls */}
      <div className="row mb-3 align-items-center">
        <div className="col-md-4 d-flex align-items-center">
          <span className="me-2">Show</span>
          <select
            className="form-select w-auto mx-2"
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>entries</span>
        </div>
        <div className="col-md-4 offset-md-4">
          <div className="input-group">
            <label className="input-group-text" htmlFor="search">Search</label>
            <input
              type="text"
              className="form-control"
              id="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover bg-white">
          <thead className="table-light">
            <tr>
              <th>Order ID</th>
              <th>User ID</th>
              <th>User Name</th>
              <th>Category ID</th>
              <th>Category Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.order_id}</td>
                  <td>{order.user_id}</td>
                  <td>{order.user_name}</td>
                  <td>{order.category_id}</td>
                  <td>{order.category_name}</td>
                  <td>₹{order.price}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-primary" title="Details">
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger" title="Delete">
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="7" className="text-center py-3">No orders found</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>Showing {filteredOrders.length} of {totalOrders} entries</div>
        <div>
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >Previous</button>
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >Next</button>
        </div>
      </div>
    </div>
  );
};

export default Orders;
