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
        "http://localhost:8000/api/v1/users/logout",
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
        navigate("/");
        getUserDetail(response.data);
        // navigate the user to home page
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Issue in logout", error.message);
    }
  };
  return (
    <div>
      <button
        className="text-lg m-auto  border-2 bg-blue-300 p-4"
        onClick={logoutUser}
      >
        logout
      </button>
    </div>
  );
};

export default Logout;
