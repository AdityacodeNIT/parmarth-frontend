import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const UserAddress = () => {
  const navigate = useNavigate();
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

    const formDataToSend = new FormData();
    formDataToSend.append("name", AddressData.name);
    formDataToSend.append("streetAddress", AddressData.streetAddress);
    formDataToSend.append("city", AddressData.city);
    formDataToSend.append("state", AddressData.state);
    formDataToSend.append(" country", AddressData.country);
    formDataToSend.append(" postalCode", AddressData.postalCode);
    formDataToSend.append(" phoneNumber", AddressData.phoneNumber);
    formDataToSend.append(" alternateNumber", AddressData.alternateNumber);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/address/getAddress`,
        formDataToSend
      );

      if (response) {
        getAddressDetail(response.data);
        navigate("/BuyProduct");
      } else console.log("Unable to get the response");
    } catch (error) {
      console.log(error, "Issue in login:");
    }
  };
  useEffect(() => {
    if (AddressData) {
      getAddressDetail(AddressData);
    }
  }, [AddressData]);

  // Your component return
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
          {/* Add input for cover image if needed */}
          {/* <input type="file" name="coverImage" onChange={handleFileChange} /> */}
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
