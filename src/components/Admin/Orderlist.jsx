import React, { useEffect, useState } from "react";
import axios from "axios";

const Orderlist = () => {
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v2/admin/getOrderList`,
          { withCredentials: true }
        );
        setOrderData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Order List</h1>
      {orderData.map((order) => (
        <div key={order._id} className="mb-8 p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Status: {order._id}</h2>
          <h3 className="text-xl font-medium mb-2">
            Total Orders: {order.totalOrders}
          </h3>
          <h3 className="text-xl font-medium mb-4">
            Total Amount: ₹{order.totalAmount}
          </h3>
          <table className="w-full text-left table-auto border-collapse">
            <thead>
              <tr>
                <th className="border-b-2 p-2">Product Name</th>
                <th className="border-b-2 p-2">Quantity</th>
                <th className="border-b-2 p-2">Price</th>
                <th className="border-b-2 p-2">Username</th>
                <th className="border-b-2 p-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {order.orders.map((item, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border-b p-2">{item.productName}</td>
                  <td className="border-b p-2">{item.quantity}</td>
                  <td className="border-b p-2">₹{item.productPrice}</td>
                  <td className="border-b p-2">{item.username}</td>
                  <td className="border-b p-2">{item.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Orderlist;
