import React from "react";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

const UserDetails = () => {
  const { userDetail } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-800 to-indigo-900 flex flex-col md:flex-row">
      <div className="md:w-1/2 flex flex-col justify-center items-center bg-gray-800 p-4 md:p-0">
        {userDetail && (
          <div key={userDetail.id} className="text-white w-full max-w-lg">
            <div className="flex items-center space-x-4 mb-6 justify-center">
              <img
                className="w-24 h-24 object-cover rounded-full shadow-lg"
                src={userDetail.data.avatar || userDetail.data.user.avatar}
                alt="User avatar"
              />
              <div className="text-md font-semibold">
                {userDetail.data.username || userDetail.data.user.username}
              </div>
            </div>
            <div className="text-sm mb-4">
              <p>
                Name:{" "}
                {userDetail.data.fullName || userDetail.data.user.fullName}
              </p>
              <p>
                Email: {userDetail.data.email || userDetail.data.user.email}
              </p>
            </div>
            <div className="space-y-3">
              <Link
                to="/cart"
                className="block py-2 bg-purple-600 px-2   hover:bg-blue-500 transition text-center"
              >
                My Cart
              </Link>
              <Link
                to="/myOrder"
                className="block py-2 bg-purple-600 px-2   hover:bg-green-500 transition text-center"
              >
                My Orders
              </Link>

              <Link
                to="/updateDetails"
                className="block py-2 bg-purple-600 px-2   hover:bg-yellow-500 transition text-center"
              >
                Update Details
              </Link>

              <Link
                to="/Wishlist"
                className="block py-2 bg-purple-600 px-2   hover:bg-yellow-500 transition text-center"
              >
                Wishlist
              </Link>

              <Link
                to="/helpdesk"
                className="block py-2 bg-purple-600 px-2  hover:bg-red-500 transition text-center"
              >
                Helpdesk
              </Link>
              <div className="block py-2 bg-purple-600 px-2   cursor-default text-center">
                Admin Panel
              </div>
              <Link
                to="/logOut"
                className="block py-2 bg-purple-600 px-2   hover:bg-indigo-500 transition text-center"
              >
                LogOut
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="md:w-1/2 flex items-center justify-center p-6 md:p-0">
        {/* Future development can be added here */}
        <div className="text-white text-xl">
          Placeholder for future content or components.
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
