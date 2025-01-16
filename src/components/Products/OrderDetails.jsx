import React, { useContext } from 'react';
import { FiTruck, FiCheckCircle, FiInfo } from 'react-icons/fi';
import UserContext from '../../context/UserContext';

const OrderDetails = () => {
  const { orderItems } = useContext(UserContext);

  return (
    <div className=" bg-gray-300 py-8 px-4 sm:px-8">
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Order Details</h1>
      
      </header>

      <div className="space-y-4  max-w-5xl mx-auto">
        {/* Delivery Status */}
        <section className="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center">
            <FiTruck className="text-blue-500 text-3xl mr-4" />
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Delivery Status</h2>
              <p className="text-gray-600">{orderItems.delivery_status}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            {orderItems.delivery_status === "Delivered"
              ? "Your order has been delivered. Thank you for shopping with us!"
              : "Your order is in transit and will arrive soon."}
          </p>
        </section>

        {/* Customer Information */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Customer Information</h2>
          <p><strong>Name:</strong> {orderItems.customer_name}</p>
          <p><strong>Email:</strong> {orderItems.billing_email}</p>
          <p><strong>Phone:</strong> {orderItems.billing_phone}</p>
    

        {/* Shipping Details */}
    
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Shipping Information</h2>
          <p><strong>Address:</strong> {orderItems.customer_address}</p>
          <p><strong>City:</strong> {orderItems.customer_city}</p>
          <p><strong>Postal Code:</strong> {orderItems.customer_pincode}</p>
          <p><strong>Country:</strong> {orderItems.customer_country}</p>
        </section>

        {/* Order Summary */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Order Summary</h2>
          <p><strong>Order Date:</strong> {orderItems.order_date}</p>
          <p><strong>Status:</strong> {orderItems.status}</p>
          <p><strong>Total Amount:</strong> {orderItems.total} {orderItems.currency}</p>
          <p><strong>Payment Method:</strong> {orderItems.payment_method}</p>
        </section>

        {/* Transaction Details */}
        <section className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">Transaction Details</h2>
          <p><strong>Transaction ID:</strong> {orderItems.transaction_detail?.transaction_id || "N/A"}</p>
          <p><strong>Transaction Date:</strong> {orderItems.transaction_detail?.transaction_date_time || "N/A"}</p>
        </section>

        {/* Action Buttons */}
        <footer className="mt-8 flex justify-end space-x-4">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600">
            Print Details
          </button>
          <button className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow hover:bg-gray-600">
            Back
          </button>
        </footer>
      </div>
    </div>
  );
};

export default OrderDetails;
