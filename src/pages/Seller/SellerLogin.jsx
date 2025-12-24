import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSellerInfo } from "../../features/seller/sellerslice.jsx";
import UserContext from "../../context/UserContext";

const SellerLogin = () => {
  const { getSellerDetail } = useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/seller/login`,
        loginData,
        { withCredentials: true }
      );

      if (response.status >= 200 && response.status < 300) {
        // ✅ Update both context and Redux
        getSellerDetail(response.data);
        dispatch(setSellerInfo(response.data));
        localStorage.setItem("sellerInfo", JSON.stringify(response.data));

        navigate("/seller");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Invalid login credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 px-4 py-10">
      <div className="w-full max-w-md bg-gray-900/90 border border-gray-700 shadow-2xl rounded-2xl p-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-400 mb-8 tracking-wide">
          Seller Login
        </h1>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={loginData.username}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleInputChange}
              required
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-gray-200 placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm font-medium text-center">
              {errorMessage}
            </p>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 mt-2 font-bold rounded-lg transition-transform transform focus:ring-2 focus:ring-blue-500 ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white hover:scale-105"
            }`}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center text-gray-400">
          <p className="text-sm">
            Don’t have a seller account?{" "}
            <Link to="/sellerRegister" className="text-blue-400 hover:underline">
              Register here
            </Link>
          </p>
          <p className="text-sm mt-2">
            <Link to="/sellerForgotPassword" className="text-blue-400 hover:underline">
              Forgot Password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
