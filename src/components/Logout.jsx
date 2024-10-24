import React, { useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { getUserDetail } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/logout`,
        {},
        { withCredentials: true }
      );

      if (response.status === 200) {
        getUserDetail(null); // Clear user detail
        console.log("User logged out successfully");
        navigate("/"); // Redirect to home page
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Issue during logout:", error.message);
    }
  };

  return (
    <div>
      <button
        className="text-lg m-auto border-2 bg-blue-300 p-4"
        onClick={logoutUser}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
