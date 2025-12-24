import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";

import { logout } from "@/features/Auth/authSlice";

const Logout = () => {
  const dispatch = useDispatch();
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
        // ✅ Clear Redux auth state
        dispatch(logout());

        // ✅ Redirect
        navigate("/");
      } else {
        alert("Unexpected response from server. Please try again.");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Please check your network.");
    }
  };

  return (
    <section className="min-h-screen bg-background text-foreground border-amber-200 shadow-xl">
      <div className="p-8 text-center">
        <h2 className="text-3xl font-bold mb-6">Logout</h2>
        <p className="mb-6">
          Are you sure you want to log out? You will need to log in again to access your account.
        </p>

        <Button
          variant="outline"
          size="lg"
          className="text-lg px-6 py-3 rounded-xl shadow-lg transition-transform hover:scale-105"
          onClick={logoutUser}
        >
          Confirm Logout
        </Button>
      </div>
    </section>
  );
};

export default Logout;
