import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { selectBaseAmount } from "../../utils/selectors.jsx";
import {
  clearCurrentOrder,
  placeShiprocketOrder,
  setPaymentMethod,
} from "../../features/product/orderSlice";
import { clearCart } from "../../features/cart/cartSlice";
import { paymentAPI } from "@/api/paymentAPI.js";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);
  const baseAmount = useSelector(selectBaseAmount);
  const deliverycharge = useSelector((s) => s.order.deliverycharge);
  const currentOrder = useSelector((state) => state.order.current);

  const totalAmount = Math.ceil(baseAmount * 1.18 + deliverycharge);

  const [loading, setLoading] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null);

  // Ensure payment method is set to Prepaid when component mounts
  useEffect(() => {
    console.log('Payment Component mounted. Current order:', currentOrder);
    if (currentOrder.paymentMethod !== 'Prepaid') {
      console.log('Setting payment method to Prepaid');
      dispatch(setPaymentMethod('Prepaid'));
    }
  }, []);

  /* ---------------- Coupon ---------------- */
  const applyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(totalAmount * 0.1);
    } else {
      setPaymentStatus("Invalid Coupon Code");
    }
  };

  /* ---------------- FINAL ORDER CREATION ---------------- */
  const finishPaymentAndOrder = async () => {
    try {
      setPaymentStatus("Payment confirmed. Creating order…");

      console.log('Creating order with payment method:', currentOrder.paymentMethod);
      const action = await dispatch(placeShiprocketOrder());
      console.log('Order creation action:', action);

      if (placeShiprocketOrder.fulfilled.match(action)) {
        dispatch(clearCart());
        dispatch(clearCurrentOrder());

        const orderRes = action.payload;
        console.log('Order placed successfully:', orderRes);
        
        const successId = orderRes.order_id || orderRes.id || "latest";

        setPaymentStatus("Order placed! Redirecting…");
        setTimeout(() => {
          navigate(`/order-success`);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 1200);
      } else {
        console.error('Order placement failed:', action);
        const errorMsg = action.payload || action.error?.message || 'Unknown error';
        setPaymentStatus(`Failed to place order: ${errorMsg}`);
      }
    } catch (err) {
      console.error('Order creation error:', err);
      setPaymentStatus("Unexpected error while creating order.");
    }
  };

  /* ---------------- POLL PAYMENT STATUS ---------------- */
  const pollPaymentStatus = (razorpayOrderId) => {
    let attempts = 0;
    const maxAttempts = 15; // Increased from 10

    const interval = setInterval(async () => {
      try {
        attempts++;
        console.log(`Polling payment status... Attempt ${attempts}/${maxAttempts}`);

        const { data } = await paymentAPI.getPaymentStatus(razorpayOrderId);
        console.log('Payment status:', data.status);

        if (data.status === "captured") {
          clearInterval(interval);
          console.log('Payment captured! Creating order...');
          await finishPaymentAndOrder();
        }

        if (data.status === "failed") {
          clearInterval(interval);
          setPaymentStatus("Payment failed. Amount not deducted.");
          setLoading(false);
        }

        if (attempts >= maxAttempts) {
          clearInterval(interval);
          setPaymentStatus(
            "Payment confirmation taking longer than expected. Your order will be processed if payment was successful."
          );
          setLoading(false);
        }
      } catch (err) {
        console.error('Error polling payment status:', err);
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          setPaymentStatus("Unable to confirm payment status. Please check your orders page.");
          setLoading(false);
        }
      }
    }, 3000); // Increased from 2000ms to 3000ms
  };

  /* ---------------- PAYMENT SUBMIT ---------------- */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPaymentStatus(null);

    try {
      // 1️⃣ Get Razorpay key
      const {
        data: { key },
      } = await axios.get(`${import.meta.env.VITE_API_URL}/api/getkey`);

      // 2️⃣ Create order on backend
      const finalAmount = totalAmount - discount;
      const {
        data: { order },
      } = await paymentAPI.checkout({ amount: finalAmount });

      // 3️⃣ Razorpay options
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "ई-Cart Logistics",
        description: "Secure Payment",
        order_id: order.id,

        prefill: {
          name: user?.data?.username || "User",
          email: user?.data?.email || "user@example.com",
          contact: "9000090000",
        },

        handler: async (response) => {
          try {
            console.log('Razorpay payment response:', response);
            setPaymentStatus("Payment received. Confirming…");
            setLoading(true);

            // Optional frontend verification (UX only)
            try {
              await paymentAPI.paymentCallback(response);
              console.log('Payment callback successful');
            } catch (callbackErr) {
              console.error('Payment callback error (non-critical):', callbackErr);
            }

            // ✅ Start polling backend (webhook is final truth)
            pollPaymentStatus(response.razorpay_order_id);
          } catch (err) {
            console.error('Payment handler error:', err);
            setPaymentStatus("Payment verification failed. Please contact support if amount was deducted.");
            setLoading(false);
          }
        },

        modal: {
          ondismiss: () => {
            setPaymentStatus("Payment cancelled.");
          },
        },

        theme: {
          color: "#3399cc",
        },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error(err);
      setPaymentStatus("Payment error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="bg-slate-300 flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Payment</h2>

        <div className="mb-4 space-y-1">
          <p>Base: ₹{baseAmount}</p>
          <p>Tax: ₹{Math.ceil(baseAmount * 0.18)}</p>
          <p>Delivery: ₹{deliverycharge || 0}</p>
          <p className="font-bold">
            Payable: ₹{totalAmount - discount}
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
            className="mt-2 w-full p-2 bg-blue-500 text-white rounded"
          >
            Apply Coupon
          </button>
        </div>

        <form onSubmit={handleFormSubmit}>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded font-semibold ${
              loading ? "bg-gray-400" : "bg-green-500 hover:bg-green-600"
            } text-white`}
          >
            {loading ? "Processing…" : "Confirm Payment"}
          </button>
        </form>

        {paymentStatus && (
          <p className="text-center mt-4 text-sm">{paymentStatus}</p>
        )}
      </div>
    </div>
  );
};

export default Payment;
