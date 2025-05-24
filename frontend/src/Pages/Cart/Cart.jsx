import React, { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const { cartItems, models, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <h2 className="mb-4">Your Cart</h2>
      <div className="table-responsive">
        <table className="table table-bordered align-middle text-center">
          <thead className="table-light">
            <tr>
              <th>Item</th>
              <th>Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {models.map((item) => {
              if (cartItems[item.id] > 0) {
                return (
                  <tr key={item.id}>
                    <td>
                      <img src={item.img} alt={item.title} width="50" height="50" className="img-thumbnail" />
                    </td>
                    <td>{item.title}</td>
                    <td>${item.price}</td>
                    <td>{cartItems[item.id]}</td>
                    <td>${item.price * cartItems[item.id]}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => removeFromCart(item.id)}
                      >
                        ×
                      </button>
                    </td>
                  </tr>
                );
              }
              return null;
            })}
          </tbody>
        </table>
      </div>

      {/* Bottom Section */}
      <div className="row mt-4">
        {/* Total Summary */}
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Cart Total</h5>
              <ul className="list-group list-group-flush mb-3">
                <li className="list-group-item d-flex justify-content-between">
                  <span>Subtotal</span>
                  <span>${getTotalCartAmount()}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                  <span>Delivery Fee</span>
                  <span>${getTotalCartAmount() === 0 ? 0 : 50}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between fw-bold">
                  <span>Total</span>
                  <span>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 50}</span>
                </li>
              </ul>
              <button
                className="btn btn-primary w-100"
                disabled={getTotalCartAmount() === 0}
                onClick={() => navigate('/order')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>

        {/* Referral Code */}
        <div className="col-md-6 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h6>If you have a referral code, enter it here:</h6>
              <div className="input-group mt-2">
                <input type="text" className="form-control" placeholder="Referral code" />
                <button className="btn btn-outline-secondary" type="button">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
