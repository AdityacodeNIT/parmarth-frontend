import React, { useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { getUserDetail, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

  const logoutUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/users/logout`,
        {},
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      if (!response) {
        console.error("User logged out");
      }

      if (response) {
        // On success, call the logout handler and navigate to home
        navigate("/");
        getUserDetail(response.data); // Clear user detail
        // Redirect to home page
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
