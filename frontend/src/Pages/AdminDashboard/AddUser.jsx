import { useState } from "react";
import axios from "axios";



export default function AddUserModal({ show, onClose, onUserAdded }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
    referred_by: ""
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users/add", formData);
      onUserAdded(); // reload the table or show success
      onClose();
      toast.success('User updated successfully!');
    } catch (err) {
       toast.error('Failed to update user!');
      alert(err.response?.data || "Error adding user");
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      style={{
        display: 'block',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        inset: 0,
        zIndex: 1050,
        overflow: 'auto',
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: '300px', width: '100%' }}>
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Add New User</h5>
                <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
              </div>

              <div className="modal-body">
                <div className="mb-3">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.username}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.email}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.password}
                    required
                  />
                </div>

                <div className="mb-3">
                  <select
                    name="role"
                    className="form-select"
                    onChange={handleChange}
                    value={formData.role}
                    required
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="referred_by"
                    placeholder="Referral Code (optional)"
                    className="form-control"
                    onChange={handleChange}
                    value={formData.referred_by}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      

    </div>
  );
}
