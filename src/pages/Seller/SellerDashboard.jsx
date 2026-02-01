import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchMe, fetchSellerDashboard } from "../../features/seller/sellerslice.jsx";
import { Link } from "react-router-dom";

const SellerDashboard = () => {
  const dispatch = useDispatch();
  const { sellerInfo, dashboard, loading, error } = useSelector((state) => state.seller);
  console.log("Seller Dashboard State:", { sellerInfo, dashboard, loading, error });

 useEffect(() => {
  dispatch(fetchMe());
}, [dispatch]);

useEffect(() => {
  if (sellerInfo?.data?.user?.approved) {
    dispatch(fetchSellerDashboard());
  }
}, [dispatch, sellerInfo?.data?.user?.approved]);


  if (!sellerInfo) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-linear-to-r from-blue-900 via-blue-700 to-gray-600 text-white">
        <h2 className="text-3xl font-bold mb-3">You’re not logged in</h2>
        <Link
          to="/sellerLogin"
          className="bg-white text-blue-800 px-6 py-2 rounded-md font-semibold hover:bg-gray-200 transition"
        >
          Login as Seller
        </Link>
      </div>
    );
  }

  const seller = sellerInfo.data.user;

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-700 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-4">
            <img
              src={seller.avatar || "/default-avatar.png"}
              alt="Seller Avatar"
              className="w-20 h-20 rounded-full border-4 border-indigo-500 object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">{seller.fullName}</h2>
              <p className="text-gray-300">@{seller.username}</p>
              <p className="text-gray-400 text-sm">{seller.email}</p>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${
                  seller.approved
                    ? "bg-green-500/30 text-green-300 border border-green-500/40"
                    : "bg-yellow-500/20 text-yellow-300 border border-yellow-400/40"
                }`}
              >
                {seller.approved ? "Approved Seller ✅" : "Pending Approval ⏳"}
              </span>
            </div>
          </div>
          {seller.approved && (
            <Link
              to="/seller/addProduct"
              className="mt-6 md:mt-0 bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-lg font-semibold shadow-md transition"
            >
              + Add Product
            </Link>
          )}
        </div>

        {/* Dashboard */}
        {!seller.approved ? (
          <div className="text-center mt-10 text-yellow-400 font-semibold">
            Your account is pending approval. Dashboard will be unlocked soon.
          </div>
        ) : loading ? (
          <div className="text-center mt-10 text-gray-400 text-lg animate-pulse">
            Loading dashboard...
          </div>
        ) : error ? (
          <div className="text-center mt-10 text-red-400 text-lg">{error}</div>
        ) : (
          dashboard && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
              <DashboardCard title="Products Listed" value={dashboard.productCount} color="text-indigo-400" />
              <DashboardCard title="Total Orders" value={dashboard.totalOrders} color="text-green-400" />
              <DashboardCard title="Total Earnings" value={`₹${dashboard.totalEarnings?.toLocaleString()}`} color="text-yellow-400" />
              <DashboardCard title="Pending Orders" value={dashboard.pendingOrders} color="text-red-400" />
            </div>
          )
        )}
      </div>
    </div>
  );
};

const DashboardCard = ({ title, value, color }) => (
  <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg hover:scale-105 transform transition text-center">
    <h3 className="text-lg text-gray-300">{title}</h3>
    <p className={`text-4xl font-bold mt-2 ${color}`}>{value ?? 0}</p>
  </div>
);

export default SellerDashboard;
