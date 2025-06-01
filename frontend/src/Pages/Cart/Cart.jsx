import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
   const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isLoggedIn || !user?.id) {
      setError('You must be logged in to view your cart.');
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/cart/${user.id}`)
      .then(res => res.json())
      .then(data => {
        setCartItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching cart items:", err);
        setError('Failed to load cart items.');
        setLoading(false);
      });
  }, [user, isLoggedIn]);

  const handleRemove = (cartItemId) => {
    fetch(`http://localhost:5000/api/cart/remove/${cartItemId}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message || 'Item removed from cart.');
        setCartItems(prev => prev.filter(item => item.id !== cartItemId));
      })
      .catch(err => {
        console.error("Error removing cart item:", err);
        alert('Failed to remove item.');
      });
  };

  const handleBuyNow = (item) => {
    navigate(`/checkout/${item.id}`);
  };

  if (loading) return <div className="alert alert-info">Loading cart...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Your Cart</h3>
      {cartItems.length === 0 ? (
        <div className="alert alert-warning">Your cart is empty.</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Category Name</th>
              <th>Price (₹)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => (
              <tr key={item.id}>
                <td>{index + 1}</td>
                <td>{item.category_name}</td>
                <td>{item.price}</td>
                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    title="Buy Now"
                    onClick={() => handleBuyNow(item)}
                  >
                    <i className="bi bi-cart-check"></i>
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    title="Remove"
                    onClick={() => handleRemove(item.id)}
                  >
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CartPage;
