import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
    useEffect(() => {
    // Scroll to top on mount
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // After 3 seconds, redirect to orders page
    const timer = setTimeout(() => {
      navigate('/myOrder'); // Change this path to match your actual orders route
    }, 3000);

    return () => clearTimeout(timer); // Cleanup
  }, [navigate]);


  return (
    <div className="p-4 text-center">
      <h1 className="text-2xl font-bold">Order Successful!</h1>
      <p>Your order ID is {orderId}.</p>
    </div>
  );
};

export default OrderSuccess;