import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ViewUserModal from '../../Components/UserModals/ViewModal.jsx';
import EditUserModal from '../../Components/UserModals/EditUserModal.jsx';
import DeleteUserModal from '../../Components/UserModals/DeleteUserModal.jsx';
import PrintUserModal from '../../Components/UserModals/PrintUserModal.jsx';
import AddUserModal from "./AddUser"; 

const Users = () => {
  const [year, setYear] = useState('2025');
  const [month, setMonth] = useState('January');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
   const [showAddModal, setShowAddModal] = useState(false);

const [selectedUser, setSelectedUser] = useState(null);
const [modalType, setModalType] = useState('');


  // Fetch users from backend
  const fetchUsers = async () => {

    const monthNames = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12
};
  const numericMonth = monthNames[month];
    try {
      const res = await axios.get(`http://localhost:5000/api/users`, {
        params: {
          search: searchTerm,
          year,
          month: numericMonth,
          page: currentPage,
          limit: entriesPerPage,
        },
      });
      setUsers(res.data.users || []);
      setTotalEntries(res.data.total || 0);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [searchTerm, year, month, currentPage, entriesPerPage]);


    const handleOpenModal = (user, type) => {
    setSelectedUser(user);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setModalType('');
  };

  const handleSaveUser = async (updatedUser) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (res.ok) {
        fetchUsers();
        handleCloseModal();
      }
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${userId}`, { method: 'DELETE' });
      if (res.ok) {
         alert("User deleted successfully!");
        fetchUsers();
        handleCloseModal();
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };


  return (
    <div className="container py-4 bg-light min-vh-100">
      <h2 className="text-center mb-4 text-secondary">Users Information</h2>

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
       <button className="btn btn-primary mb-3" onClick={() => setShowAddModal(true)}>
  <i className="bi bi-person-plus me-1"></i> Add New User
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
              <th>Email id<span className="ms-1">↕</span></th>
              <th>referral_id <span className="ms-1">↕</span></th>
              <th>referred_by <span className="ms-1">↕</span></th>
              <th>Created On <span className="ms-1">↕</span></th>
              <th>Updated at<span className="ms-1">↕</span></th>
              <th>Action <span className="ms-1">↕</span></th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.referral_code}</td>
                  <td>{user.referred_by || "—"}</td>
                  <td>{user.created_at?.split("T")[0]}</td>
                  <td>{user.updated_at?.split("T")[0]}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-primary" title="Details" onClick={() => handleOpenModal(user, 'view')}>
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-success" onClick={() => handleOpenModal(user, 'edit')} title="Edit">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-danger" onClick={() => handleOpenModal(user, 'delete')} title="Delete">
                        <i className="bi bi-trash"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => handleOpenModal(user, 'print')} title="Print">
                        <i className="bi bi-printer"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-3">No data available in table</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
 <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Showing {(currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, totalEntries)} of {totalEntries} entries
        </div>
        <div>
          <button
            className="btn btn-outline-secondary btn-sm me-2"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={currentPage * entriesPerPage >= totalEntries}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
       {modalType === 'view' && selectedUser && (
        <ViewUserModal user={selectedUser} onClose={handleCloseModal} />
      )}
       {modalType === 'edit' && selectedUser && (
        <EditUserModal user={selectedUser} onClose={handleCloseModal} onSave={handleSaveUser} />
      )}
      {modalType === 'delete' && selectedUser && (
        <DeleteUserModal userId={selectedUser.id} onClose={handleCloseModal} onDelete={handleDeleteUser} />
      )}
      {modalType === 'print' && selectedUser && (
        <PrintUserModal user={selectedUser} onClose={handleCloseModal} />
      )}



       <AddUserModal
  show={showAddModal}
  onClose={() => setShowAddModal(false)}
  onUserAdded={fetchUsers}
/>
      
    </div>
  );
};

export default Users;
