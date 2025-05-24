import React, { useState } from 'react';
import axios from 'axios';
import ViewUserModal from '../../Components/UserModals/ViewModal.jsx';
import EditUserModal from '../../Components/UserModals/EditUserModal.jsx';
import DeleteUserModal from '../../Components/UserModals/DeleteUserModal.jsx';
import PrintUserModal from '../../Components/UserModals/PrintUserModal.jsx';

const UsersSearch = () => {
  const [email, setEmail] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState('');


  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState('');
  

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setUserData(null);

    if (!email) {
      setError('Please enter an email address');
      return;
    }

    try {
      const res = await axios.get(`http://localhost:5000/api/users/search`, {
        params: { email },
      });
      if (res.data) {
        setUserData(res.data);
      } else {
        setError('No user found with this email');
      }
    } catch (err) {
      console.error('Error fetching user:', err);
      setError('User not found or server error');
    }
  };


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
        setUserData();
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
        setUserData();
        handleCloseModal();
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };


  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-primary">Search User by Email</h2>
     <div className="container mt-5 d-flex justify-content-center">
  <form className="row g-3 justify-content-center" onSubmit={handleSearch}>
    <div className="col-auto">
      <input
        type="email"
        className="form-control"
        placeholder="Enter user email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
    <div className="col-auto">
      <button type="submit" className="btn btn-primary mb-3">
        <i className="bi bi-search me-1"></i> Search
      </button>
    </div>
  </form>
</div>


      {error && <div className="alert alert-danger mt-3">{error}</div>}

     {userData && (
  <div className="card mt-4 shadow position-relative">
    {/* Close Icon */}
    <button
      type="button"
      className="btn-close position-absolute top-0 end-0 m-3"
      aria-label="Close"
      onClick={() => setUserData(null)}
    ></button>

    <div className="card-body">
      <h5 className="card-title text-success">User Details</h5>
      <p><strong>ID:</strong> {userData.id}</p>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Referral ID:</strong> {userData.referral_code}</p>
      <p><strong>Referred By:</strong> {userData.referred_by || '—'}</p>
      <p><strong>Created At:</strong> {userData.created_at}</p>
      <p><strong>Updated At:</strong> {userData.updated_at}</p>
    </div>

    {/* Action Icons */}
    <div className="card-footer d-flex justify-content-end gap-3">
      <button className="btn btn-sm btn-outline-primary" onClick={() => handleOpenModal(userData, 'Edit')}>
        <i className="bi bi-pencil-square"></i> Edit
      </button>
      <button className="btn btn-sm btn-outline-danger" onClick={() => handleOpenModal(userData, 'delete')}>
        <i className="bi bi-trash"></i> Delete
      </button>
      <button className="btn btn-sm btn-outline-secondary" onClick={() => handleOpenModal(userData, 'view')}>
        <i className="bi bi-info-circle"></i> Info
      </button>
      <button className="btn btn-sm btn-outline-secondary" onClick={() => handleOpenModal(userData, 'Print')}>
        <i className="bi bi-printer"></i> Print
      </button>
    </div>
  </div>
)}
   

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

    </div>
  );
};

export default UsersSearch;
