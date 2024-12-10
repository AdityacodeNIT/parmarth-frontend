import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // This import is already correct
import UserContext from "../../context/UserContext";

const UserAddress = () => {
  const navigate = useNavigate(); // Correctly initialized navigate
  const { getAddressDetail } = useContext(UserContext);
  const [AddressData, setAddressData] = useState({
    name: "",
    streetAddress: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    phoneNumber: "",
    alternateNumber: "",
  });

  const handleInputChange = (e) => {
    setAddressData({
      ...AddressData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = {
      name: AddressData.name,
      streetAddress: AddressData.streetAddress,
      city: AddressData.city,
      state: AddressData.state,
      country: AddressData.country,
      postalCode: AddressData.postalCode,
      phoneNumber: AddressData.phoneNumber,
      alternateNumber: AddressData.alternateNumber,
    };

    try {
      console.log(formDataToSend);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/address/addAddress`,
        formDataToSend,
        { withCredentials: true }
      );

      if (response) {
        navigate("/BuyProduct");
      } else {
        console.log("Unable to get the response");
      }
    } catch (error) {
      console.log(error, "Issue in Adding the Addresses:");
    }
  };

  return (
    <div>
      <div className="w-auto mx-32 mt-6">
        <form onSubmit={handleFormSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={AddressData.name}
            onChange={handleInputChange}
            required
            className="border-2 border-cyan-600 w-full p-3 rounded-md"
          />
          <input
            type="text"
            name="streetAddress"
            placeholder="Street Address"
            value={AddressData.streetAddress}
            onChange={handleInputChange}
            required
            className="border-2 border-cyan-600 w-full p-3 rounded-md"
          />
          <input
            type="text"
            name="city"
            placeholder="City"
            value={AddressData.city}
            onChange={handleInputChange}
            required
            className="border-2 border-cyan-600 w-full p-3 rounded-md"
          />
          <input
            type="text"
            name="state"
            placeholder="State"
            value={AddressData.state}
            onChange={handleInputChange}
            required
            className="border-2 border-cyan-600 w-full p-3 rounded-md"
          />
          <input
            type="text"
            name="country"
            placeholder="Country"
            value={AddressData.country}
            onChange={handleInputChange}
            required
            className="border-2 border-cyan-600 w-full p-3 rounded-md"
          />
          <input
            type="text"
            name="postalCode"
            placeholder="Postal Code"
            value={AddressData.postalCode}
            onChange={handleInputChange}
            required
            className="border-2 border-cyan-600 w-full p-3 rounded-md"
          />
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number"
            value={AddressData.phoneNumber}
            onChange={handleInputChange}
            required
            className="border-2 border-cyan-600 w-full p-3 rounded-md"
          />
          <input
            type="text"
            name="alternateNumber"
            placeholder="Alternate Number"
            value={AddressData.alternateNumber}
            onChange={handleInputChange}
            required
            className="border-2 border-cyan-600 w-full p-3 rounded-md"
          />
          <button
            type="submit"
            className="border-2 border-blue-600 bg-blue-600 text-white p-2 rounded-md mt-4 hover:bg-blue-700"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserAddress;
