import React, { useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";

const UserDetails = () => {
  const { userDetail, setUserDetail } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const validateRefreshToken = async () => {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/users/refresh-token`,
          {},
          { withCredentials: true }
        );
  
        const { accessToken } = response.data;
        if (accessToken) {
          // Update global auth state instead of axios defaults
          setUserDetail((prev) => ({ ...prev, accessToken }));
        }
      } catch (error) {
        setUserDetail(null);
        console.error("Error validating refresh token:", error);
      }
    };
  
    validateRefreshToken();
  
    // Run only once when the component mounts
  }, []); 
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-black flex flex-col md:flex-row">
      {/* User Profile Section */}
      <div className="md:w-1/2 flex flex-col justify-center items-center bg-gray-700 p-8 md:p-12 rounded-xl shadow-2xl">
        {userDetail ? (
          <div className="text-yellow-300 w-full max-w-lg text-center">
            {/* Profile Image */}
            <div className="flex flex-col items-center mb-6">
              <img
                className="w-28 h-28 border-4 border-yellow-300 object-cover rounded-full shadow-xl"
                src={userDetail.data?.avatar || userDetail.data?.user?.avatar || "/default-avatar.png"}
                alt="User avatar"
              />
              <div className="text-xl font-bold mt-4">
                {userDetail.data?.username || userDetail.data?.user?.username}
              </div>
            </div>

            {/* User Details */}
            <div className="text-md mb-6">
              <p>
                <span className="font-semibold">Name:</span> {userDetail.data?.fullName || userDetail.data?.user?.fullName}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {userDetail.data?.email || userDetail.data?.user?.email}
              </p>
            </div>

            {/* Buttons Section */}
            <div className="space-y-3">
              {userDetail.data?.user?.role !== "customer" ? (
                <>
                  <StyledLink to="/Admin" text="Admin Panel" color="purple" />
                  <StyledLink to="/helpdesk" text="Helpdesk" color="red" />
                  <StyledLink to="/logOut" text="Log Out" color="indigo" />
                </>
              ) : (
                <>
                  <StyledLink to="/cart" text="My Cart" color="blue" />
                  <StyledLink to="/myOrder" text="My Orders" color="green" />
                  <StyledLink to="/updateDetails" text="Update Details" color="yellow" />
                  <StyledLink to="/Wishlist" text="Wishlist" color="yellow" />
                  <StyledLink to="/seller" text="Become A Seller" color="red" />
                  <StyledLink to="/helpdesk" text="Helpdesk" color="red" />
                  <StyledLink to="/logOut" text="Log Out" color="indigo" />
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-white">
            <h2 className="text-lg font-bold">You are not logged in</h2>
            <Link
              to="/userLogin"
              className="inline-block mt-4 px-6 py-2 bg-purple-600 hover:bg-indigo-500 transition text-white rounded-lg shadow-lg"
            >
              Log In
            </Link>
          </div>
        )}
      </div>

      {/* Right-Side Placeholder */}
      <div className="md:w-1/2 flex items-center justify-center p-8">
        <div className="text-white text-xl text-center bg-gray-900 p-6 rounded-lg shadow-lg">
          Exciting new features coming soon! Stay tuned.
        </div>
      </div>
    </div>
  );
};

// Reusable Button Component
const StyledLink = ({ to, text, color }) => {
  return (
    <Link
      to={to}
      className={`block w-full max-w-xs mx-auto py-2 px-4 text-white text-center font-semibold rounded-lg shadow-lg bg-${color}-700 hover:bg-${color}-500 transition-transform transform hover:scale-105`}
    >
      {text}
    </Link>
  );
};

export default UserDetails;