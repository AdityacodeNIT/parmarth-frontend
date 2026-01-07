import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { userAPI } from "@/api/userAPI";

const SellerRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    gstNumber: "",
    panNumber: "",
    businessName: "",
    businessType: "",
    businessAddress: "",
    pincode: "",
    contactNumber: "",
    accountHolderName: "",
    accountNumber: "",
    ifscCode: "",
    bankName: "",
    avatar: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) =>
      formDataToSend.append(key, value)
    );

    try {
      const response = await userAPI.register(
        formDataToSend
      );

      if (response.status >= 200 && response.status < 300) {
        navigate("/sellerLogin");
      }
    } catch (error) {
  console.error("❌ Error creating seller in DB:", error.message);
  if (error.name === "ValidationError") {
    console.error("🧩 Validation details:", error.errors);
  }

}

  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-950 via-gray-900 to-gray-800 flex items-center justify-center px-4 py-10">
      <div className="form-container">
        <h1 className="main-title">Seller Registration</h1>

        <form onSubmit={handleFormSubmit} encType="multipart/form-data" className="space-y-6">
          
          {/* Personal Info */}
          <h2 className="section-title">Personal Information</h2>
          <div className="input-grid">
            <input
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleInputChange}
              className="input"
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="input"
              required
            />
            <input
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              className="input"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          {/* Business Info */}
          <h2 className="section-title">Business Details</h2>
          <div className="input-grid">
            <input
              name="businessName"
              placeholder="Business / Shop Name"
              value={formData.businessName}
              onChange={handleInputChange}
              className="input"
              required
            />
            <input
              name="businessType"
              placeholder="Business Type (Individual, Company, etc.)"
              value={formData.businessType}
              onChange={handleInputChange}
              className="input"
              required
            />
            <input
              name="gstNumber"
              placeholder="GST Number"
              value={formData.gstNumber}
              onChange={handleInputChange}
              className="input"
              required
            />
            <input
              name="panNumber"
              placeholder="PAN Number"
              value={formData.panNumber}
              onChange={handleInputChange}
              className="input"
              required
            />
            <input
              name="businessAddress"
              placeholder="Business Address"
              value={formData.businessAddress}
              onChange={handleInputChange}
              className="input"
              required
            />
            <input
              name="pincode"
              placeholder="Pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className="input"
              required
            />
            <input
              name="contactNumber"
              placeholder="Business Contact Number"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          {/* Bank Details */}
          <h2 className="section-title">Bank Details</h2>
          <div className="input-grid">
            <input
              name="accountHolderName"
              placeholder="Account Holder Name"
              value={formData.accountHolderName}
              onChange={handleInputChange}
              className="input"
              required
            />
            <input
              name="accountNumber"
              placeholder="Account Number"
              value={formData.accountNumber}
              onChange={handleInputChange}
              className="input"
              required
            />
            <input
              name="ifscCode"
              placeholder="IFSC Code"
              value={formData.ifscCode}
              onChange={handleInputChange}
              className="input"
              required
            />
            <input
              name="bankName"
              placeholder="Bank Name"
              value={formData.bankName}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          {/* Avatar Upload */}
          <h2 className="section-title">Profile Picture / Logo</h2>
          <input
            type="file"
            name="avatar"
            onChange={handleFileChange}
            className="file-input"
            required
          />

          <button type="submit" className="btn-primary">
            Register as Seller
          </button>

          <p className="text-center text-gray-400">
            Already registered?{" "}
            <Link to="/sellerLogin" className="link">
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SellerRegister;
