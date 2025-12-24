import React, { useState } from "react";
import Orderlist from "./Orderlist";
import Userlist from "./Userlist";
import Productlist from "./Productlist";
import SellerApprovalPanel from "./SellerApprovalPanel"; // ✅ new component
import { MdAdminPanelSettings } from "react-icons/md";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminSection = () => {
  const [activeSection, setActiveSection] = useState(null);

  const user=useSelector((state)=>state.auth.user)

  // 🔹 Function to toggle each accordion section
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div>
      {/* ─────────────────────────────── Admin Header ─────────────────────────────── */}
      <div className="flex justify-center items-center text-2xl m-2 p-2 font-semibold text-gray-700">
        {user.data.user.role} <MdAdminPanelSettings className="ml-2" />
      </div>

      {/* ─────────────────────────────── Admin Panel Body ─────────────────────────────── */}
      <div className="p-6 bg-gray-100 min-h-screen space-y-4">

        {/* USER LIST SECTION (Visible to Admin/Superadmin only) */}
        {user.data.user.role !== "seller" && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection("userlist")}
              className="w-full p-4 text-left font-semibold text-blue-600 hover:bg-blue-50 transition"
            >
              👥 User List
            </button>
            {activeSection === "userlist" && (
              <div className="p-4 border-t">
                <Userlist />
              </div>
            )}
          </div>
        )}

        {/* PRODUCT LIST SECTION */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("productlist")}
            className="w-full p-4 text-left font-semibold text-green-600 hover:bg-green-50 transition"
          >
            📦 Product List
          </button>
          {activeSection === "productlist" && (
            <div className="p-4 border-t">
              <Productlist />
            </div>
          )}
        </div>

        {/* ORDER LIST SECTION */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <button
            onClick={() => toggleSection("orderlist")}
            className="w-full p-4 text-left font-semibold text-red-600 hover:bg-red-50 transition"
          >
            🧾 Order List
          </button>
          {activeSection === "orderlist" && (
            <div className="p-4 border-t">
              <Orderlist />
            </div>
          )}
        </div>

        {/* ──────────────── NEW: SELLER MANAGEMENT SECTION ──────────────── */}
        {user.data.user.role === "superadmin" && (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection("sellerlist")}
              className="w-full p-4 text-left font-semibold text-purple-700 hover:bg-purple-50 transition"
            >
              🛒 Seller Approvals
            </button>
            {activeSection === "sellerlist" && (
              <div className="p-4 border-t">
                <SellerApprovalPanel />
              </div>
            )}
          </div>
        )}

        {/* ADD PRODUCT SHORTCUT BUTTON */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <Link to="/addProduct">
            <button className="w-full p-4 text-left font-semibold text-indigo-700 hover:bg-indigo-50 transition">
              ➕ Add New Product
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminSection;
