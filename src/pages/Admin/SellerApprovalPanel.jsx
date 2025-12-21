import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheck, FaTimes, FaTrashAlt, FaEye } from "react-icons/fa";

const SellerApprovalPanel = () => {
  const [sellers, setSellers] = useState([]);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [refresh, setRefresh] = useState(false);

  // ─────────── Fetch Sellers ───────────
  useEffect(() => {
    const fetchSellers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/users/sellers`,
          { withCredentials: true }
        );
        console.log("Sellers Data:", response.data.data.user._id);
        setSellers(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch sellers");
      } finally {
        setLoading(false);
      }
    };
    fetchSellers();
  }, [refresh]);

  // ─────────── Approve / Revoke Seller ───────────
  const handleApproval = async (id, approved) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/v1/users/sellers/${id}`,
        { approved },
        { withCredentials: true }
      );
      setRefresh(!refresh);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update seller status");
    }
  };

  // ─────────── Delete Seller ───────────
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this seller?")) return;
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/v1/users/sellers/${id}`,
        { withCredentials: true }
      );
      setRefresh(!refresh);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete seller");
    }
  };

  // ─────────── Fetch Single Seller for Modal ───────────
  const viewSellerDetails = async (id) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/users/sellers/${id}`,
        { withCredentials: true }
      );
      console.log("Selected Seller Details:", res.data);
      setSelectedSeller(res.data.data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to fetch seller details");
    }
  };

  // ─────────── UI ───────────
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🛒 Seller Approval Dashboard
      </h2>

      {loading && <p className="text-gray-500">Loading sellers...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && sellers.length === 0 && (
        <p className="text-gray-600 text-center mt-4">No sellers found.</p>
      )}

      {!loading && sellers.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm text-gray-700">
            <thead className="bg-gray-100 text-gray-800 uppercase text-xs font-semibold">
              <tr>
                <th className="p-3 border">Full Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Business</th>
                <th className="p-3 border">GST</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((seller) => (
                <tr
                  key={seller._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3 border">{seller.fullName}</td>
                  <td className="p-3 border">{seller.email}</td>
                  <td className="p-3 border">{seller.businessName}</td>
                  <td className="p-3 border">{seller.gstNumber}</td>
                  <td className="p-3 border">
                    {seller.approved ? (
                      <span className="text-green-600 font-semibold">
                        Approved
                      </span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">
                        Pending
                      </span>
                    )}
                  </td>
                  <td className="p-3 border text-center space-x-3">
                    <button
                      onClick={() => viewSellerDetails(seller._id)}
                      className="text-blue-600 hover:text-blue-800"
                      title="View Details"
                    >
                      <FaEye />
                    </button>
                    {seller.approved ? (
                      <button
                        onClick={() => handleApproval(seller._id, false)}
                        className="text-yellow-600 hover:text-yellow-800"
                        title="Revoke"
                      >
                        <FaTimes />
                      </button>
                    ) : (
                      <button
                        onClick={() => handleApproval(seller.user._id, true)}
                        className="text-green-600 hover:text-green-800"
                        title="Approve"
                      >
                        <FaCheck />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(seller._id)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ─────────── Seller Details Modal ─────────── */}
      <AnimatePresence>
        {selectedSeller && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-lg shadow-lg w-96 relative"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Seller Details
              </h3>
              <img
                src={selectedSeller.avatar}
                alt={selectedSeller.fullName}
                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
              />
              <p className="text-gray-700 text-center font-semibold">
                {selectedSeller.fullName}
              </p>
              <p className="text-gray-500 text-center mb-2">
                {selectedSeller.email}
              </p>

              <div className="text-sm text-gray-700 space-y-1">
                <p>
                  <strong>Username:</strong> {selectedSeller.username}
                </p>
                <p>
                  <strong>Business:</strong> {selectedSeller.businessName}
                </p>
                <p>
                  <strong>Type:</strong> {selectedSeller.businessType}
                </p>
                <p>
                  <strong>GST:</strong> {selectedSeller.gstNumber}
                </p>
                <p>
                  <strong>PAN:</strong> {selectedSeller.panNumber}
                </p>
                <p>
                  <strong>Contact:</strong> {selectedSeller.contactNumber}
                </p>
                <p>
                  <strong>Bank:</strong> {selectedSeller.bankName} (
                  {selectedSeller.accountNumber})
                </p>
                <p>
                  <strong>IFSC:</strong> {selectedSeller.ifscCode}
                </p>
                <p>
                  <strong>Approved:</strong>{" "}
                  {selectedSeller.approved ? "✅ Yes" : "❌ No"}
                </p>
              </div>

              <button
                onClick={() => setSelectedSeller(null)}
                className="mt-4 w-full py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SellerApprovalPanel;
