import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 1. Import useHistory
import UserContext from "../context/UserContext";

const Userlogin = () => {
  const { getUserDetail } = useContext(UserContext);
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate(); // intializing use navigate method
  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/login",
        loginData
      );
      if (!response) {
        console.error("Unable to login");
      }
      if (response.status >= 200 && response.status < 300) {
        // Store the access token in a cookie
        document.cookie = `accessToken=${response.data.data.accessToken}; path=/`;
        getUserDetail(response.data);
        navigate("/user");
        // navigate the user to home page
      }
    } catch (error) {
      console.error("Issue in login", error);
    }
  };
  return (
    <div>
      <h1 className="w-full text-white text-2xl font-extrabold bg-rose-400 p-2 flex justify-center">
        Login
      </h1>
      <div className="  border-8  border-rose-300 mt-4 bg-pink-100  pb-9 mx-36 ">
        <p className="w-full text-white text-2xl font-extrabold bg-rose-600 p-2 flex justify-center">
          Addhyan Login Page
        </p>
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className="w-auto mx-36 mt-16 ">
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={loginData.username}
              onChange={handleInputChange}
              required
              className=" mt-3 border-2 border-rose-900 w-full p-3 rounded-md"
            />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={loginData.password}
              onChange={handleInputChange}
              required
              className=" mt-3 border-2 border-rose-900 w-full p-3 rounded-md"
            />

            <button
              type="submit"
              className="m-2 border-2 p-2 ml-auto bg-rose-400 rounded-md align-middle"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Userlogin;
