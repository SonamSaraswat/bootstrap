import React, { useState } from 'react';

const Users = () => {
  const [year, setYear] = useState('2025');
  const [month, setMonth] = useState('January');
  const [entriesPerPage, setEntriesPerPage] = useState('10');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="container py-4 bg-light min-vh-100">
      <h2 className="text-center mb-4 text-secondary">Payments</h2>

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
            {[
              'January', 'February', 'March', 'April', 'May', 'June',
              'July', 'August', 'September', 'October', 'November', 'December'
            ].map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Add New Patient Button */}
      <div className="mb-3 text-end">
        <button className="btn btn-primary">
          <i className="bi bi-person-plus me-2"></i>Add New Payement
        </button>
      </div>

      {/* Table Controls */}
      <div className="row mb-3 align-items-center">
        <div className="col-md-4 d-flex align-items-center">
          <span className="me-2">Show</span>
          <select
            className="form-select w-auto mx-2"
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(e.target.value)}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
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

      {/* Patients Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover bg-white">
          <thead className="table-light">
            <tr>
              <th>Id <span className="ms-1">↕</span></th>
              <th>User Name <span className="ms-1">↕</span></th>
              <th>Mobile Number <span className="ms-1">↕</span></th>
              <th>Total Amount <span className="ms-1">↕</span></th>
              <th>Paid Amount <span className="ms-1">↕</span></th>
              <th>Due Amount <span className="ms-1">↕</span></th>
              <th>Created On <span className="ms-1">↕</span></th>
              <th>Action <span className="ms-1">↕</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="8" className="text-center py-3">No data available in table</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>Showing 0 to 0 of 0 entries</div>
        <div>
          <button className="btn btn-outline-secondary btn-sm me-2" disabled>Previous</button>
          <button className="btn btn-outline-secondary btn-sm" disabled>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Users;
