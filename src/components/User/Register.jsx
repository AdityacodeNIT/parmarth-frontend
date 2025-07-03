import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { getUserDetail } = useContext(UserContext);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const [loading, setLoading] = useState(false);      // ⬅️ NEW
  const [error, setError]   = useState("");           // optional

  /* -------- handle form field changes -------- */
  const handleInputChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });

  /* -------- submit form -------- */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val) formDataToSend.append(key, val);
    });

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/register`,
        formDataToSend,
        { withCredentials: true, credentials: "include" }
      );
 if (res.status >= 200 && res.status < 300) {
    // ✅ Save userId for OTP verification
    console.log("Registration successful:", res.data);
    const userId = res.data?.userId; 
    console.log// or use res.data.userId if you return it directly
    localStorage.setItem("otpUserId", userId);

    // ✅ Navigate to verify page
    navigate("/verifyotp");
  }
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err?.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-gradient-to-r mt-2 from-gray-800 to-black">
      {/* Left section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4">
        <div className="w-full md:w-3/4 p-8 bg-gray-900 shadow-xl rounded-lg border border-white-300">
          <h1 className="text-3xl font-extrabold text-teal-500 text-center mb-6">Register</h1>

          <form onSubmit={handleFormSubmit} encType="multipart/form-data">
            {/* --- text inputs --- */}
            {["fullName", "email", "username", "password"].map((field) => (
              <input
                key={field}
                type={field === "password" ? "password" : field === "email" ? "email" : "text"}
                name={field}
                placeholder={`Enter your ${field === "fullName" ? "full name" : field}`}
                value={formData[field]}
                onChange={handleInputChange}
                required
                className="mb-4 p-2 w-full border-2 border-teal-500 rounded-md bg-gray-200 focus:outline-none focus:border-blue-600 transition"
              />
            ))}

            {/* avatar upload */}
            <div className="mb-4">
              <label className="text-gray-300 text-sm mb-1 block">
                Upload Profile Photo <span className="text-gray-400">(Optional)</span>
              </label>
              <input
                type="file"
                name="avatar"
                onChange={handleFileChange}
                className="p-2 w-full border-2 border-teal-500 rounded-md bg-gray-200 focus:outline-none focus:border-blue-600 transition"
              />
            </div>

            {/* error message */}
            {error && <p className="text-red-400 text-sm mb-2">{error}</p>}

            {/* submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 flex items-center justify-center gap-2
                          font-bold rounded-md transition
                          ${loading ? "bg-teal-400 cursor-not-allowed" : "bg-teal-600 hover:bg-rose-700"}
                          text-white`}
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 018 8h-4l3 3 3-3h-4a8 8 0 01-8 8v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                  ></path>
                </svg>
              )}
              {loading ? "Registering..." : "Register"}
            </button>

            <p className="mt-4 text-center text-white">
              Already a user?{" "}
              <Link to="/userLogin" className="text-red-400">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right section */}
      <div className="hidden md:block md:w-1/2">
        <img
          src="/assets/design/register.jpeg"
          alt="Register Illustration"
          className="w-full h-screen object-cover"
        />
      </div>
    </div>
  );
};

export default Register;
