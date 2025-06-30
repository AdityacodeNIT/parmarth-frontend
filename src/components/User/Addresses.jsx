import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddresses,
  setSelectedAddressId,
} from "../../features/address/addressSlice";

const Addresses = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { list: addresses, selectedId } = useSelector((state) => state.address);

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
  };

  if (loading) return <div className="text-center p-4">Loading addresses...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Your Addresses</h2>

      {addresses.length === 0 ? (
        <div className="text-center text-gray-600">No addresses found.</div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {addresses.map((address) => (
            <div
              key={address._id}
              className={`border p-4 rounded shadow ${
                selectedId === address._id ? "border-teal-500 bg-teal-50" : ""
              }`}
              onClick={() => handleSelect(address._id)}
            >
              <h3 className="text-lg font-semibold">
                {address.firstName} {address.lastName}
              </h3>
              <p>{address.streetAddress} {address.city}</p>
              <p>{address.state} - {address.postalCode}</p>
              <p>{address.country}</p>

              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => navigate(`/edit-address/${address._id}`)}
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate(`/delete-address/${address._id}`)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Addresses;
