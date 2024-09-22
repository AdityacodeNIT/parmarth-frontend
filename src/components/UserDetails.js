import React from "react";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

const UserDetails = () => {
  const { userDetail } = useContext(UserContext);
  return (
    <div className=" h-screen bg-indigo-800">
      {userDetail && (
        <div key={userDetail.id}>
          <div className="bg-slate-800 border-4 border-blue-500 p-4 grid gap-4 w-full max-w-md mx-auto rounded-lg mt-2 shadow-md">
            <div className="flex items-center space-x-4">
              <img
                className="w-24 h-24 object-cover rounded-full"
                src={userDetail.data.avatar || userDetail.data.user.avatar}
                alt="User avatar"
              />
              <div className="text-lg font-semibold text-white">
                {userDetail.data.username || userDetail.data.user.username}
              </div>
            </div>
            <div className="text-white text-md">
              Name: {userDetail.data.fullName || userDetail.data.user.fullName}
            </div>

            <div className="text-white text-md">
              Email: {userDetail.data.email || userDetail.data.user.email}
            </div>
            <div className="text-white text-md">
              <Link to="/cart" className="text-blue-300 hover:text-blue-100">
                My Cart
              </Link>
            </div>
            <Link to="/myOrder">
              {" "}
              <div className="text-white text-md">My Orders</div>
            </Link>
            <div className="text-white text-md">Favourites</div>
            <Link to="/helpdesk">
              <div className="text-white text-md">Helpdesk</div>
            </Link>
            {/* <Link to="/helpdesk"> */}
            <div className="text-white text-md">Admin Panel</div>
            {/* </Link> */}
            <Link to="/logOut">
              <div className="text-white text-md">LogOut</div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
