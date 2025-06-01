import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ViewUserModal from '../../Components/UserModals/ViewModal.jsx';
import EditUserModal from '../../Components/UserModals/EditUserModal.jsx';
import DeleteUserModal from '../../Components/UserModals/DeleteUserModal.jsx';
import PrintUserModal from '../../Components/UserModals/PrintUserModal.jsx';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [year, setYear] = useState('2025');
  const [month, setMonth] = useState('January');
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [totalEntries, setTotalEntries] = useState(0);

  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [modalType, setModalType] = useState('');

  const fetchPayments = async () => {
    const monthNames = {
      January: 1, February: 2, March: 3, April: 4,
      May: 5, June: 6, July: 7, August: 8,
      September: 9, October: 10, November: 11, December: 12
    };

    const numericMonth = monthNames[month];

    try {
      const res = await axios.get(`http://localhost:5000/api/payment`, {
        params: {
          search: searchTerm,
          year,
          month: numericMonth,
          limit: entriesPerPage,
          offset: (currentPage - 1) * entriesPerPage,
          
        }
      });
      setPayments(res.data.payments || []);
      setTotalEntries(res.data.total || 0);
    } catch (err) {
      console.error("Error fetching payments:", err);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, [searchTerm, year, month, currentPage, entriesPerPage]);

  const handleOpenModal = (payment, type) => {
    setSelectedPayment(payment);
    setModalType(type);
  };

  const handleCloseModal = () => {
    setSelectedPayment(null);
    setModalType('');
  };

  {/*const handleSavePayment = async (updatedPayment) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/payments/${updatedPayment.id}`, updatedPayment);
      if (res.status === 200) {
        toast.success("Payment updated!");
        fetchPayments();
        handleCloseModal();
      }
    } catch (err) {
      toast.error("Update failed");
      console.error(err);
    }
  };

  const handleDeletePayment = async (paymentId) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/payments/${paymentId}`);
      if (res.status === 200) {
        toast.success("Payment deleted!");
        fetchPayments();
        handleCloseModal();
      }
    } catch (err) {
      toast.error("Delete failed");
      console.error(err);
    }
  };*/}

  return (
    <div className="container py-4 bg-light min-vh-100">
      <h2 className="text-center mb-4 text-secondary">Payments Information</h2>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-6">
          <label>Select Year</label>
          <select className="form-select" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
        <div className="col-md-6">
          <label>Select Month</label>
          <select className="form-select" value={month} onChange={(e) => setMonth(e.target.value)}>
            {Object.keys({
              January: 1, February: 2, March: 3, April: 4,
              May: 5, June: 6, July: 7, August: 8,
              September: 9, October: 10, November: 11, December: 12
            }).map(m => <option key={m}>{m}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-3 text-end">
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          <i className="bi bi-cash-coin me-2"></i>Add Payment
        </button>
      </div>

      {/* Table Controls */}
      <div className="row mb-3">
        <div className="col-md-4 d-flex align-items-center">
          <span>Show</span>
          <select
            className="form-select w-auto mx-2"
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(parseInt(e.target.value))}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span>entries</span>
        </div>
        <div className="col-md-4 offset-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover bg-white">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>User_ID</th>
              <th>Order_Id</th>
              <th>Payment_Id</th>  
              <th>Amount</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? payments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.id}</td>
                <td>{payment.user_id}</td>
                <td>{payment.razorpay_order_id}</td>
                <td>{payment.razorpay_payment_id}</td>
                <td>{payment.amount}</td>
                <td>{payment.status}</td>
                <td>{payment.created_at?.split("T")[0]}</td>
                
                <td>
                  <div className="d-flex gap-2">
                    <button className="btn btn-sm btn-outline-primary" onClick={() => handleOpenModal(payment, 'view')}><i className="bi bi-eye"></i></button>
                    <button className="btn btn-sm btn-outline-success" onClick={() => handleOpenModal(payment, 'edit')}><i className="bi bi-pencil"></i></button>
                    <button className="btn btn-sm btn-outline-danger" onClick={() => handleOpenModal(payment, 'delete')}><i className="bi bi-trash"></i></button>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => handleOpenModal(payment, 'print')}><i className="bi bi-printer"></i></button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="8" className="text-center py-3">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
         Showing {totalEntries === 0 ? 0 : (currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, totalEntries)} of {totalEntries} entries

        </div>
        <div>
          <button className="btn btn-outline-secondary btn-sm me-2" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
          <button className="btn btn-outline-secondary btn-sm" disabled={currentPage * entriesPerPage >= totalEntries} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </div>
      </div>

      {/* Modals 
      {modalType === 'view' && selectedPayment && (
        <ViewPaymentModal payment={selectedPayment} onClose={handleCloseModal} />
      )}
      {modalType === 'edit' && selectedPayment && (
        <EditPaymentModal payment={selectedPayment} onClose={handleCloseModal} onSave={handleSavePayment} />
      )}
      {modalType === 'delete' && selectedPayment && (
        <DeletePaymentModal paymentId={selectedPayment.id} onClose={handleCloseModal} onDelete={handleDeletePayment} />
      )}
      {modalType === 'print' && selectedPayment && (
        <PrintPaymentModal payment={selectedPayment} onClose={handleCloseModal} />
      )}

      <AddPaymentModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onPaymentAdded={fetchPayments}
      />*/}

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Payments;
