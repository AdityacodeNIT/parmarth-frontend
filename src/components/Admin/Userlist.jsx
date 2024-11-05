import React, { useEffect, useState } from "react";
import axios from "axios";

const Userlist = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v2/admin/getUserList`,
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
      <h1 className="text-3xl font-bold text-center mb-8">User List</h1>
      <table className="w-full text-left table-auto border-collapse">
        <thead>
          <tr>
            <th className="border-b-2 p-2">Username</th>
            <th className="border-b-2 p-2">Full Name</th>
            <th className="border-b-2 p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {userData.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border-b p-2">{user.username}</td>
              <td className="border-b p-2">{user.fullName}</td>
              <td className="border-b p-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
