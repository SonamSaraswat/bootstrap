import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cartItemId } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/cart/item/${cartItemId}`)
      .then(res => res.json())
      .then(data => {
        setItem(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load item:', err);
        setError('Failed to load item');
        setLoading(false);
      });
  }, [cartItemId]);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]')) {
        return resolve(true);
      }

      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!item) {
      alert("No item available for checkout.");
      return;
    }

    const razorpayLoaded = await loadRazorpayScript();
    if (!razorpayLoaded) {
      alert('Failed to load Razorpay SDK. Please check your internet connection.');
      return;
    }

    let orderData;
    try {
      // Create Razorpay order on backend
      const orderResponse = await fetch('http://localhost:5000/api/payment/create-razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: item.user_id,
          amount: Math.round(item.price * 100),  // amount in paise, integer
          cartItemId: item.id,
          category_id: item.category_id,
          category_name: item.category_name,
        }),
      });

      orderData = await orderResponse.json();

      if (!orderData.success) {
        throw new Error(orderData.error || 'Order creation failed');
      }
    } catch (err) {
      console.error("Error creating Razorpay order:", err);
      alert("Failed to create order. Please try again.");
      return;
    }

    const options = {
      key:'rzp_test_uNA5w977pt5hgI', // Use env or fallback test key
      amount: orderData.amount, // in paise
      currency: orderData.currency || 'INR',
      name: 'Monitrix',
      description: `Payment for ${item.category_name}`,
      order_id: orderData.razorpayOrderId,
      handler: async function (response) {
        try {
          const verifyResponse = await fetch('http://localhost:5000/api/payment/verify-payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              user_id: item.user_id,
              amount: orderData.amount,  // paise (integer)
              price: item.price,         // rupees (float or int)
              category_id: item.category_id,
              category_name: item.category_name,
              cartItemId: item.id,
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyData.success) {
            alert("✅ Payment successful and verified!");
            navigate('/thank-you');
          } else {
            alert("⚠️ Payment verification failed: " + verifyData.message);
          }
        } catch (err) {
          console.error("Error verifying payment:", err);
          alert("An error occurred during payment verification.");
        }
      },
      prefill: {
        email: item.user_email || 'test@example.com',
        contact: item.user_phone || '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
      modal: {
        ondismiss: () => {
          console.log("Checkout popup closed by user");
        },
        escape: true,
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  if (loading) return <div>Loading item details...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h3>Checkout</h3>
      <div className="card p-3">
        <h5>{item.category_name}</h5>
        <p>Price: ₹{item.price}</p>
        <button className="btn btn-primary" onClick={handlePayment}>
          Pay with Razorpay
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
