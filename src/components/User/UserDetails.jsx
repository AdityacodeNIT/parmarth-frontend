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
          setUserDetail((prev) => ({ ...prev, accessToken }));
        }
      } catch (error) {
        setUserDetail(null);
        console.error("Error validating refresh token:", error);
        navigate("/userLogin");
      }
    };

    validateRefreshToken();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-gray-900 to-black flex flex-col md:flex-row items-center justify-center p-6 md:p-12 gap-10">
      {/* Left - Profile Section */}
      <div className="w-full md:w-1/2 bg-gray-900/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 md:p-10">
        {userDetail ? (
          <div className="text-gray-100 space-y-6">
            {/* Avatar */}
            <div className="flex flex-col items-center">
              <img
                src={
                  userDetail.data?.avatar ||
                  userDetail.data?.user?.avatar ||
                  "/default-avatar.png"
                }
                alt="User avatar"
                className="w-28 h-28 rounded-full border-4 border-yellow-400 shadow-md object-cover"
              />
              <h2 className="mt-4 text-2xl font-bold text-yellow-300">
                {userDetail.data?.username || userDetail.data?.user?.username}
              </h2>
            </div>

            {/* Details */}
            <div className="space-y-2 text-center">
              <p>
                <span className="font-semibold text-gray-300">Full Name:</span>{" "}
                {userDetail.data?.fullName || userDetail.data?.user?.fullName}
              </p>
              <p>
                <span className="font-semibold text-gray-300">Email:</span>{" "}
                {userDetail.data?.email || userDetail.data?.user?.email}
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 gap-3 mt-6">
              {userDetail.data?.user?.role !== "customer" ? (
                <>
                  <StyledLink to="/Admin" text="Admin Panel" color="purple" />
                  <StyledLink to="/helpdesk" text="Helpdesk" color="rose" />
                  <StyledLink to="/logOut" text="Log Out" color="indigo" />
                </>
              ) : (
                <>
                  <StyledLink to="/cart" text="My Cart" color="blue" />
                  <StyledLink to="/myOrder" text="My Orders" color="emerald" />
                  <StyledLink to="/updateDetails" text="Update Details" color="amber" />
                  <StyledLink to="/Wishlist" text="Wishlist" color="fuchsia" />
                  <StyledLink to="/seller" text="Become A Seller" color="red" />
                  <StyledLink to="/helpdesk" text="Helpdesk" color="rose" />
                  <StyledLink to="/logOut" text="Log Out" color="indigo" />
                </>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center text-white space-y-4">
            <h2 className="text-2xl font-bold">You are not logged in</h2>
            <Link
              to="/userLogin"
              className="inline-block mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
              Log In
            </Link>
          </div>
        )}
      </div>

      {/* Right - Placeholder */}
      <div className="w-full md:w-1/2 flex justify-center items-center">
        <div className="bg-gray-800/80 rounded-2xl shadow-xl p-8 text-center text-white text-lg backdrop-blur-lg">
          🚀 <span className="font-semibold">Exciting new features</span> are in the works. <br />
          Stay tuned for more updates!
        </div>
      </div>
    </div>
  );
};

// Reusable styled button
const StyledLink = ({ to, text, color }) => {
  return (
    <Link
      to={to}
      className={`block w-full py-2 px-4 text-white font-semibold rounded-lg shadow-md bg-${color}-700 hover:bg-${color}-600 transition-all transform hover:scale-105 text-center`}
    >
      {text}
    </Link>
  );
};

export default UserDetails;
