import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { setAddresses} from '../../features/address/addressSlice';
import Product from "./Product";

const BuyProduct = () => {
  const dispatch=useDispatch();
  const { totalProductPrice, productDesccription } = useContext(UserContext);

  const [addressDetails, setAddressDetails] = useState(null);

  const { list: addressList, selectedId: addressId } = useSelector(
    (s) => s.address
  );

  const {product,quantity}=useSelector((state) => state.order.current);




   const handleCheckout = () => {
      dispatch(setOrderFromBuyNow({ product, addressId }));
      navigate('/payments');
    };
  




  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch address details from the backend
  useEffect(() => {
      const fetchAddressDetails = async () => {

        try {
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/v1/address/getAddress`,
            { withCredentials: true }
          );
          if (response.data && response.data.data) {
            const payload = Array.isArray(response.data?.data)
  ? response.data.data
  : response.data?.data
    ? [response.data.data]
    : [];
         
           dispatch(setAddresses(payload));
             console.log(addressList);
         setLoading(false);
        
         
          } else {
           dispatch(setAddresses(null));
           setLoading(false);
          }
   
        } catch (err) {
         setLoading(false);
     
        }
      };
       

    fetchAddressDetails();
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-center bg-gray-300 p-4 rounded-lg shadow-md">
        CheckOut
      </h2>
      <div className="flex flex-col lg:flex-row justify-between p-4 bg-pink-50 rounded-lg shadow-md mt-4">
        {/* Bill Section */}
        <div className="w-full lg:w-1/2 p-4">
          <div className="border-4 p-4 border-gray-600 rounded-lg shadow-lg bg-white">
            <div className="text-xl text-yellow-400 bg-gray-500 p-2 border-2 font-bold rounded-lg text-center">
              TOTAL Bill For you
            </div>
            <div className="mt-4">{product.name}  (x{quantity})</div>
            <div className="flex justify-between mt-2 p-2 font-semibold text-xl rounded-lg border border-gray-300">
              <div>Subtotal</div>
              <div>{product.price*quantity}</div>
            </div>
            <div className="flex justify-between mt-2 p-2 font-semibold text-xl rounded-lg border border-gray-300">
              <div>Applied Tax</div>
              <div>{Math.ceil(product.price* 0.18*quantity)}</div>
            </div>
            <div className="flex justify-between mt-2 p-2 font-semibold text-xl rounded-lg border border-gray-300">
              <div>Total</div>
              <div>
                {Math.ceil((product.price * 0.18 + product.price)*quantity)}
              </div>
            </div>
            <Link to="/payments">
              <button className="w-full bg-yellow-600 text-white px-4 py-2 mt-4 rounded-lg font-bold shadow-lg hover:bg-yellow-700 transition duration-300" onClick={()=>handleCheckout()}>
                Pay Now
              </button>
            </Link>
          </div>
        </div>

        {/* Address Section */}
        <div className="w-full lg:w-1/2 p-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <p className="text-2xl font-semibold text-gray-800 bg-white p-4 rounded-lg shadow-md mb-4 text-center">
              Address
            </p>
<div className="bg-white p-4 rounded-lg shadow-md">
  {addressList.length > 0 ? (
    addressList.map((addressDetails, index) => (
      <div key={index} className="mb-6">
        <div className="mb-4 text-xl font-bold text-gray-800">
          {addressDetails.firstName} {addressDetails.lastName}
        </div>
        <div className="bg-gray-900 text-white p-4 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-md md:text-lg">
            <div>
              <strong>Street Address:</strong> {addressDetails.streetAddress}
            </div>
            <div>
              <strong>City:</strong> {addressDetails.city}
            </div>
            <div>
              <strong>State:</strong> {addressDetails.state}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm md:text-md">
            <div>
              <strong>Postal Code:</strong> {addressDetails.postalCode}
            </div>
            <div>
              <strong>Phone:</strong> {addressDetails.phoneNumber}
            </div>
            <div>
              <strong>Alternate Phone:</strong> {addressDetails.alternateNumber}
            </div>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="text-center text-gray-600">
      No address found. Please add an address.
    </div>
  )}
</div>

            <Link to="/addressUpdate">
              <button className="w-full bg-blue-900 text-white px-4 py-2 mt-4 rounded-lg font-bold shadow-lg hover:bg-blue-700 transition duration-300">
                {addressDetails ? "Change Address" : "Add Address"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyProduct;
