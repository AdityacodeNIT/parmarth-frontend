import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Userlogin = () => {
  const { getUserDetail } = useContext(UserContext);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    setErrorMessage(""); 
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/login`,
        loginData,
        { withCredentials: true }
      );

      if (response.status >= 200 && response.status < 300) {
        console.log(response.data);
        getUserDetail(response.data);
        navigate("/user");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(
          error.response.data.message || "Invalid login credentials."
        );
      } else {
        console.error("Issue in login", error);
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gradient-to-r from-gray-800 to-black">
      {/* Left section - Login form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4">
        <div className="w-full md:w-3/4 p-8 bg-gray-900 shadow-xl rounded-lg border border-teal-500">
          <h1 className="text-3xl font-extrabold text-teal-500 text-center mb-6">
            Login
          </h1>
          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            <div className="mb-4">
              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                value={loginData.username}
                onChange={handleInputChange}
                required
                className="p-2 w-full border-2 border-teal-500 rounded-md transition duration-200 focus:outline-none bg-gray-600 text-white"
              />
              {errorMessage && !loginData.username && (
                <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
              )}
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleInputChange}
                required
                className="p-2 w-full border-2 border-teal-500 rounded-md transition duration-200 focus:outline-none bg-gray-600 text-white"
              />
              {errorMessage && loginData.username && (
                <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
              )}
            </div>
            <button
              type="submit"
              className={`w-full p-3 font-bold rounded-md transition duration-200 flex justify-center items-center ${
                isLoading
                  ? "bg-teal-700 cursor-not-allowed"
                  : "bg-teal-500 hover:bg-teal-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 108 8h-4l3 3 3-3h-4a8 8 0 01-8 8z"
                    ></path>
                  </svg>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Right section - Image */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="/assets/design/login.jpeg"
          alt="Login Page Illustration"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default Userlogin;
