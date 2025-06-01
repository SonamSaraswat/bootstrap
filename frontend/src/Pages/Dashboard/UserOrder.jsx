import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';

const OrdersPage = () => {
  const { user, isLoggedIn } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoggedIn || !user?.id) {
      setError('You must be logged in to view your orders.');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/order/user/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setOrders(data.orders || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching orders:", err);
        setError('Failed to load orders.');
        setLoading(false);
      });
  }, [user, isLoggedIn]);

  if (loading) return <div className="alert alert-info">Loading orders...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Your Orders</h3>
      {orders.length === 0 ? (
        <div className="alert alert-warning">You have no orders yet.</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-success">
            <tr>
              <th>#</th>
              <th>Order ID</th>
              <th>Service</th>
              <th>Price (₹)</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={`${order.order_id}-${i}`}>
                <td>{i + 1}</td>
                <td>{order.order_id}</td>
                <td>{order.category_name}</td>
                <td>{order.price}</td>
                <td>{order.status}</td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersPage;
