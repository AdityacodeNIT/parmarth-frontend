import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { setAddresses } from "../../features/address/addressSlice";

const ManageAddresses = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const addressList = useSelector((state) => state.address.list);

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/address/getAddress`, {
          withCredentials: true,
        });
        const data = Array.isArray(res.data.data) ? res.data.data : [res.data.data];
        console.log(data)
        dispatch(setAddresses(data));
      } catch (err) {
        console.error("Failed to fetch addresses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [dispatch]);

  if (loading) return <div>Loading addresses...</div>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Your Addresses</h1>

      {addressList.length > 0 ? (
        addressList.map((address) => (
          <div
            key={address._id}
            className="border border-gray-300 rounded-lg p-4 mb-4 shadow-sm bg-white"
          >
            <div className="text-lg font-semibold">
              {address.firstName} {address.lastName}
            </div>
            <div>{address.streetAddress}</div>
            <div>
              {address.city}, {address.state} - {address.postalCode}
            </div>
            <div>Phone: {address.phoneNumber}</div>
            {address.alternateNumber && <div>Alt: {address.alternateNumber}</div>}
          </div>
        ))
      ) : (
        <div className="text-gray-600">No addresses found.</div>
      )}

         <Link to="/addressUpdate">
    <div>
        Add Adresses
        </div></Link>


    </div>
 
  );
};

export default ManageAddresses;
