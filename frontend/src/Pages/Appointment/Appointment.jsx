import React, { useState } from 'react';

const AppointmentForm = () => {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    type: '',
    fullName: '',
    email: '',
    phone: '',
    dateTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Appointment requested successfully!');
  };

  return (
    <div className="container mt-5 mb-5">
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
  <div className="col-md-5" style={{ maxWidth: '350px', width: '100%' }}>
      <div className="card shadow p-4">
        <h2 className="mb-4 text-center">Request New Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Subject*</label>
            <input
              type="text"
              className="form-control"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Description*</label>
            <textarea
              className="form-control"
              name="description"
              rows="3"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Appointment Type</label>
            <select
              className="form-select"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Non selected</option>
              <option value="Consultation">Consultation</option>
              <option value="Follow-up">Follow-up</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Your Full Name*</label>
            <input
              type="text"
              className="form-control"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Your Email*</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Phone (Ex: +1 69 1234 5678)*</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label">Date / Time*</label>
            <input
              type="datetime-local"
              className="form-control"
              name="dateTime"
              value={formData.dateTime}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 d-flex gap-3">
            <button type="button" className="btn btn-outline-primary">Available Hours</button>
            <button type="button" className="btn btn-outline-danger">Busy Hours</button>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-success px-5">Submit</button>
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
  );
};

export default AppointmentForm;
