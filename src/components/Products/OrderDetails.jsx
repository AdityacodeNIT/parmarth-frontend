import React, { useContext, useState } from "react";
import {
  FiTruck,
  FiInfo,
  FiXCircle,
  FiHome,
  FiUser,
  FiPhone,
  FiCreditCard,
  FiBox,
} from "react-icons/fi";
import axios from "axios";
import UserContext from "../../context/UserContext";

const OrderDetails = () => {
  const { orderItems, getUserDetail } = useContext(UserContext);
  const [cancellationStatus, setCancellationStatus] = useState(null);

  const handleCancelOrder = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/shiprocket/cancelOrder/${orderItems.id}`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        setCancellationStatus("✅ Your order has been successfully canceled.");
        getUserDetail();
      } else {
        setCancellationStatus("❌ Failed to cancel the order. Please try again.");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      setCancellationStatus("⚠️ An error occurred. Please try again.");
    }
  };

  return (
    <div className="bg-[#0f1117] text-gray-200 min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8 text-center text-yellow-400">
        🧾 Order Summary
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-[#1c1f26] p-5 rounded-xl shadow-md border-t-4 border-blue-500">
          <div className="flex items-center gap-2 mb-2">
            <FiInfo className="text-blue-400 text-xl" />
            <h2 className="font-semibold text-lg">Order Info</h2>
          </div>
          <p>Order ID: {orderItems.channel_order_id}</p>
          <p>Status: {orderItems.status || "Processing"}</p>
          <p>Created: {orderItems.created_at}</p>
        </div>

        <div className="bg-[#1c1f26] p-5 rounded-xl shadow-md border-t-4 border-green-500">
          <div className="flex items-center gap-2 mb-2">
            <FiTruck className="text-green-400 text-xl" />
            <h2 className="font-semibold text-lg">Delivery</h2>
          </div>
          <p>Status: {orderItems.delivery_status || "Pending"}</p>
          <p>Courier: {orderItems.last_mile_courier_name || "N/A"}</p>
          <p>
            AWB:{" "}
            <a
              href={orderItems.last_mile_awb_track_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 underline"
            >
              {orderItems.last_mile_awb || "Not Available"}
            </a>
          </p>
        </div>

        <div className="bg-[#1c1f26] p-5 rounded-xl shadow-md border-t-4 border-yellow-500">
          <div className="flex items-center gap-2 mb-2">
            <FiCreditCard className="text-yellow-400 text-xl" />
            <h2 className="font-semibold text-lg">Payment</h2>
          </div>
          <p>Method: {orderItems.payment_method}</p>
          <p>Status: {orderItems.payment_status || "Pending"}</p>
          <p>Total: ₹{orderItems.total}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#1c1f26] p-6 rounded-xl shadow-md border-l-4 border-purple-500">
          <div className="flex items-center gap-2 mb-3">
            <FiHome className="text-purple-400 text-xl" />
            <h2 className="font-semibold text-lg">Shipping Address</h2>
          </div>
          <p>
            {orderItems.customer_address}, {orderItems.customer_city}, {orderItems.customer_state} -{" "}
            {orderItems.customer_pincode}, {orderItems.customer_country}
          </p>
        </div>

        <div className="bg-[#1c1f26] p-6 rounded-xl shadow-md border-l-4 border-pink-500">
          <div className="flex items-center gap-2 mb-3">
            <FiUser className="text-pink-400 text-xl" />
            <h2 className="font-semibold text-lg">Customer Info</h2>
          </div>
          <p>Name: {orderItems.customer_name}</p>
          <p>Phone: {orderItems.customer_phone}</p>
          <p>Email: {orderItems.customer_email}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-[#1c1f26] p-6 rounded-xl shadow-md border-l-4 border-orange-500">
          <div className="flex items-center gap-2 mb-3">
            <FiBox className="text-orange-400 text-xl" />
            <h2 className="font-semibold text-lg">Returns & Exchange</h2>
          </div>
          <p>Return Allowed: {orderItems.allow_return ? "✅ Yes" : "❌ No"}</p>
          <p>Exchange: {orderItems.exchange_status || "N/A"}</p>
        </div>

        <div className="bg-red-600 text-white p-6 rounded-xl shadow-md">
          <div className="flex items-center gap-2 mb-3">
            <FiXCircle className="text-white text-xl" />
            <h2 className="font-semibold text-lg">Cancel Order</h2>
          </div>
          <p className="mb-3 text-sm">Click below to cancel if not yet delivered.</p>
          <button
            onClick={handleCancelOrder}
            className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-200 transition"
          >
            Cancel Order
          </button>
          {cancellationStatus && <p className="mt-3 text-sm">{cancellationStatus}</p>}
        </div>
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Print
        </button>
        <button className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600 transition">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;
