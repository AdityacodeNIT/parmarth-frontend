import React, { useEffect, useState } from "react";
import axios from "axios";

const Productlist = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v2/admin/getProductList`,
          { withCredentials: true }
        );
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Product List</h1>
      <table className="w-full text-left table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 p-2">Productname</th>
            <th className="border-b-2 p-2">Price</th>
            <th className="border-b-2 p-2">Category</th>
            <th className="border-b-2 p-2">Stocks</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border-b p-2">{user.name}</td>
              <td className="border-b p-2">{user.price}</td>
              <td className="border-b p-2">{user.Category}</td>
              <td className="border-b p-2">{user.stocks}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Productlist;
