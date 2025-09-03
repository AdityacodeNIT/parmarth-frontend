


import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectBaseAmount } from '../../utils/selectors.jsx';
import { clearCurrentOrder,placeShiprocketOrder } from '../../features/product/orderSlice';
import { clearCart } from '../../features/cart/cartSlice';
import UserContext from '../../context/UserContext.jsx';
 

const Payment = () => {

  const navigate = useNavigate();
 
  const {
    userDetail,} = useContext(UserContext);

  


  const dispatch  = useDispatch();

  /* ------------ Get amounts from Redux ------------ */
  const baseAmount = useSelector(selectBaseAmount);

  const totalAmount = Math.ceil((baseAmount * 1.18)+deliverycharge);

  /* ------------ User data (adjust slice name) ----- */
  const user = useSelector((s) => s.user?.data?.user);

  /* ------------ Local UI state -------------------- */
  const [paymentData, setPaymentData] = useState({ amount: totalAmount });
  const [loading, setLoading]         = useState(false);
  const [coupon, setCoupon]           = useState('');
  const [discount, setDiscount]       = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null);

  /* ------------ Handlers -------------------------- */
  const applyCoupon = () => {
    if (coupon === 'DISCOUNT10') {
      setDiscount(totalAmount * 0.1);
    } else {
      setPaymentStatus('Invalid Coupon Code');
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPaymentStatus(null);

    try {
      // 1) get Razorpay key
      const { data: { key } } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/getkey`
      );

      // 2) create order on backend
      const finalAmount = totalAmount - discount;
      const { data: { order } } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/payments/paid`,
        { amount: finalAmount },
        { withCredentials: true }
      );

      const finishPaymentAndOrder = async () => {
  try {
    setPaymentStatus('Payment verified – creating order…');

    /* 1️⃣ Place order with Shiprocket and wait */
    const action = await dispatch(placeShiprocketOrder());

    if (placeShiprocketOrder.fulfilled.match(action)) {
      /* 2️⃣ Success: clean local state */
      dispatch(clearCart());
      dispatch(clearCurrentOrder());

      /* Shiprocket response payload */
      const orderRes = action.payload;           // e.g. { order_id: 'SR123' }
      const successId = orderRes.order_id || orderRes.id || 'latest';

      setPaymentStatus('Order placed! Redirecting…');
     setTimeout(() => {
  navigate(`/order-success/${successId}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}, 1500);

    } else {
      /* 3️⃣ Thunk rejected */
      setPaymentStatus(`Order failed: ${action.payload || 'unknown error'}`);
    }
  } catch (err) {
    /* network or unexpected errors */
    console.error(err);
    setPaymentStatus('Unexpected error while placing order.');
  }
};





      /* Razorpay options */
       const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "ई-Cart Logistics",
        description: "Secure Payment",
        image: "https://example.com/your_logo",
        order_id: order.id,
        callback_url: `${import.meta.env.VITE_API_URL}/api/v2/payments/paymentcallback`,
        prefill: {
          name: userDetail?.data?.user?.username || "User",
          email: userDetail?.data?.user?.email || "user@example.com",
          contact: "9000090000",
        },
        theme: {
          color: "#3399cc",
        },
        handler: async (response) => {
          try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;

            setPaymentStatus("Verifying Payment...");

            const verifyResponse = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/v2/payments/paymentcallback`,
              {
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
              },
              {withCredentials:true}

            );

               if (verifyResponse.data.success) {
      await finishPaymentAndOrder();   // ⬅️ call the function here
    } else {
      setPaymentStatus('Payment verification failed.');
    }

          } catch (error) {
            console.error("Payment Verification Error:", error);
            setPaymentStatus("Payment Failed! Please try again.");
          }
        },
        modal: {
          escape: false,
          ondismiss: () => {
            setPaymentStatus("Payment Cancelled! Please try again.");
          },
        },
      };
 

      new window.Razorpay(options).open();

    } catch (err) {
      console.error(err);
      setPaymentStatus('Payment Error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  /* ------------ Render ---------------------------- */
  return (
    <div className="bg-slate-300 flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Payment</h2>

        <div className="mb-4 space-y-1">
          <p className="text-lg font-medium">Base: ₹{baseAmount}</p>
          <p className="text-lg font-medium">Tax (18%): ₹{Math.ceil(baseAmount * 0.18)}</p>
          <p className="text-lg font-bold">
            Payable: ₹{totalAmount - discount}{' '}
            {discount > 0 && <span className="text-green-600">(-₹{discount})</span>}
          </p>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Coupon code"
            value={coupon}
            onChange={(e) => setCoupon(e.target.value)}
            className="w-full border p-2 rounded-md"
          />
          <button
            onClick={applyCoupon}
            className="mt-2 w-full p-2 bg-blue-500 text-white rounded-lg"
          >
            Apply Coupon
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <input
            type="number"
            name="amount"
            value={paymentData.amount}
            disabled
            className="w-full border p-2 text-center rounded-md"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 p-2 rounded-lg font-semibold ${
              loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'
            } text-white`}
          >
            {loading ? 'Processing…' : 'Confirm Payment'}
          </button>
        </form>

        {paymentStatus && (
          <p
            className={`text-center mt-4 ${
              paymentStatus.includes('Failed') ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {paymentStatus}
          </p>
        )}
      </div>
    </div>
  );
};

export default Payment;
