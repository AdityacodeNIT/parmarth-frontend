import React from "react";
import { Link } from "react-router-dom";

const UpdateDetails = () => {
  return (
    <div className="bg-gradient-to-r from-gray-700 to-slate-800 min-h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl md:text-4xl font-bold text-white mb-8">
        Update Details
      </h1>

      <div className="bg-yellow-500  shadow-xl p-12 w-full max-w-md flex flex-col space-y-4">
        <Link to="/changeDetails" className="w-full">
          <div className="font-semibold text-lg md:text-xl text-center py-3 bg-gray-800 text-white rounded-md hover:bg-indigo-600 transition">
            Update Details
          </div>
        </Link>

        <Link to="/changePassword" className="w-full">
          <div className="font-semibold text-lg md:text-xl text-center py-3 bg-gray-800 text-white rounded-md hover:bg-green-600 transition">
            Change Password
          </div>
        </Link>

        <Link to="/updateAvatar" className="w-full">
          <div className="font-semibold text-lg md:text-xl text-center py-3 bg-gray-800 text-white rounded-md hover:bg-blue-600 transition">
            Update Avatar
          </div>
        </Link>
      </div>
    </div>
  );
};

export default UpdateDetails;
