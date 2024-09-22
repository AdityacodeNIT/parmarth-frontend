import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const { getUserDetail } = useContext(UserContext);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    avatar: null,
    coverImage: null, // Add cover image state if needed
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("avatar", formData.avatar);
    formDataToSend.append("coverImage", formData.coverImage); // Append cover image if needed

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formDataToSend
      );
      if (response.status >= 200 && response.status < 300) {
        navigate("/userlogin");
      }

      // Optionally, you can redirect the user to another page after successful registration
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Server response error:", error.response.data);
        console.error("Status code:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received from server:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error in request setup:", error.message);
      }

      console.error("Axios config details:", error.config);
      // You can also set error state here and display a custom error message to the user
    }
  };

  return (
    <div>
      <h1 className="w-full text-yellow-500 text-2xl font-extrabold bg-slate-600 p-2 flex justify-center">
        Register
      </h1>
      <div className=" w-auto mx-32 mt-3">
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="fullName"
            placeholder="Enter your full name"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            className=" mt-3 border-2 border-rose-600 w-full p-3 rounded-md"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className=" mt-3 border-2 border-rose-600 w-full p-3 rounded-md"
          />
          <input
            type="text"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleInputChange}
            required
            className=" mt-3 border-2 border-rose-600 w-full p-3 rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleInputChange}
            required
            className=" mt-3 border-2 border-rose-600 w-full p-3 rounded-md"
          />
          <input
            type="file"
            name="avatar"
            onChange={handleFileChange}
            required
            className=" mt-3 border-2 border-rose-600 w-full p-3 rounded-md"
          />
          {/* Add input for cover image if needed */}
          {/* <input type="file" name="coverImage" onChange={handleFileChange} /> */}
          <button
            type="submit"
            className="border-2 bg-rose-600 mt-3 text-white p-2 ml-4"
          >
            Register
          </button>
          <p className="flex">
            Already a user{" "}
            <Link to="/userLogin" className="text-blue-400 mx-2">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
