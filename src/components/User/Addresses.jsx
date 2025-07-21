import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setAddresses, setSelectedAddressId } from "../../features/address/addressSlice";

const Addresses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const addressList = useSelector((state) => state.address.list);

  useEffect(() => {
    const fetchAddressDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/address/getAllAddresses`,
          { withCredentials: true }
        );
        const data = response.data?.data || [];
        dispatch(setAddresses(data));
      } catch (err) {
        console.error(err);
        setError("Failed to load address details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAddressDetails();
  }, [dispatch]);

  const handleSelect = (id) => {
    dispatch(setSelectedAddressId(id));
    navigate("/buyproduct");
  };

  const handleAddAddress = () => {
    navigate("/addressUpdate");
  };

  if (loading) return <div className="text-yellow-300 text-center p-4">Loading addresses...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-yellow-300 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center text-yellow-400">Manage Your Addresses</h2>

        {addressList.length === 0 ? (
          <div className="text-center text-yellow-400">No addresses found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {addressList.map((address) => (
              <div
                key={address._id}
                className="bg-slate-800 text-white p-6 rounded-2xl shadow-lg hover:bg-slate-700 transition cursor-pointer"
                onClick={() => handleSelect(address._id)}
              >
                <h3 className="text-xl font-semibold mb-2 text-blue-300">
                  {address.firstName} {address.lastName}
                </h3>
                <p className="text-slate-300">{address.streetAddress}, {address.city}</p>
                <p className="text-slate-400">{address.state} - {address.postalCode}</p>
                <p className="text-slate-500">{address.country}</p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8">
          <button
            onClick={handleAddAddress}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl transition"
          >
            Add New Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
