import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Spinner } from "@material-tailwind/react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { GetOrderId } = useContext(UserContext);

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/shiprocket/getOrder`,
        {
          withCredentials: true,
        }
      );

      if (response && response.data.data.data) {
        setOrders(response.data.data.data);
      }
    } catch (err) {
      setError(err.message || "Failed to fetch orders.");
      console.error(err.data); // Log error details for debugging
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading orders </p>
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-red-500 text-xl">Error: {error}</p>
        <button
          onClick={fetchOrders}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Orders</h2>
      {orders.length > 0 ? (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Link to="/OrderItems">
 <div
              key={order.id}
              className="border p-4 rounded shadow-sm bg-white"
              onClick={() => GetOrderId(order.id)}
            >
              <h3 className="text-lg font-semibold">Order ID: {order.id}</h3>
              <p>
                <strong>Customer:</strong> {order.customer_name}
              </p>
              <p>
                <strong>Address:</strong> {order.customer_address},{" "}
                {order.customer_city}, {order.customer_state} -{" "}
                {order.customer_pincode}
              </p>
              <p>
                <strong>Status:</strong> {order.status}
              </p>
              <p>
                <strong>Items:</strong>{" "}
                {order.products && order.products.length > 0 ? (
                  order.products.map((item, idx) => (
                    <span key={idx} className="block">
                      {item.name} (x{item.quantity || 1}) - ₹
                      {item.selling_price}
                    </span>
                  ))
                ) : (
                  <span>No items available</span>
                )}
              </p>
              <p>
                <strong>Total:</strong> ₹{order.total}
              </p>
             
            </div>
            </Link>
          ))}
        
       
        </div>
      ) : (
        <div className="text-center">
          <p>No orders found.</p>
        </div>
      )}
    </div>
  );
};

export default AllOrders;
