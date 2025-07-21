import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAddresses, setSelectedAddressId } from "../../features/address/addressSlice";
import { setOrderFromBuyNow } from "../../features/product/orderSlice";
import{Button} from "../components/ui/button" // assuming you have this action for order
// ... imports remain unchanged

const BuyProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { list: addressList, selectedId: addressId } = useSelector((state) => state.address);
  const { product, quantity } = useSelector((state) => state.order.current);

  const [loading, setLoading] = useState(true);
    const [paymentMethod, setPaymentMethod] = useState("");
  const [error, setError] = useState(null);
  const [serviceabilityResult, setServiceabilityResult] = useState(null);
  const [checkingDelivery, setCheckingDelivery] = useState(false);

  // Fetch addresses
  useEffect(() => {
    const fetchAddressDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/address/getAddress/${addressId}`,
          { withCredentials: true }
        );

        if (response.data?.data) {
          const payload = Array.isArray(response.data.data)
            ? response.data.data
            : [response.data.data];
          dispatch(setAddresses(payload));
         

        } else {
          dispatch(setAddresses([]));
        }
      } catch (err) {
        setError("Failed to load addresses.");
      } finally {
        setLoading(false);
      }
    };

    fetchAddressDetails();
  }, [dispatch]);

  // 🔁 Check serviceability when addressId changes
  useEffect(() => {
    const checkServiceability = async () => {
      if (!addressId) {
        setServiceabilityResult(null);
        return;
      }

      const selectedAddress = addressList.find((addr) => addr._id === addressId);
      if (!selectedAddress?.postalCode) return;

      setCheckingDelivery(true);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_URL}/shiprocket/check`,
          {pincode:selectedAddress.postalCode},
          { withCredentials: true }
        );

        setServiceabilityResult(res.data?.data || null);
        console.log(res.data.data)
      } catch (err) {
        console.error("Serviceability check failed:", err);
        setServiceabilityResult(null);
      } finally {
        setCheckingDelivery(false);
      }
    };

    checkServiceability();
  }, [addressId, addressList]);

  const handleAddressSelection = (selectedId) => {
    dispatch(setSelectedAddressId(selectedId));
  };

  const handleCheckout = () => {
  if (!addressId || !serviceabilityResult?.available || !paymentMethod) {
    alert("Please select a serviceable address and payment method.");
    return;
  }

  dispatch(setOrderFromBuyNow({ product, addressId, paymentMethod }));

  if (paymentMethod === "Prepaid") {
    navigate("/payments");
  } else if (paymentMethod === "cod") {
    navigate("/cod");
  }
};


  const handleManageAddresses = () => {
    navigate("/allAddresses");
  };


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
            <div className="mt-4">
              {product.name} (x{quantity})
            </div>
            <div className="flex justify-between mt-2 p-2 font-semibold text-xl rounded-lg border border-gray-300">
              <div>Subtotal</div>
              <div>{product.price * quantity}</div>
            </div>
            <div className="flex justify-between mt-2 p-2 font-semibold text-xl rounded-lg border border-gray-300">
              <div>Applied Tax</div>
              <div>{Math.ceil(product.price * 0.18 * quantity)}</div>
            </div>
            <div className="flex justify-between mt-2 p-2 font-semibold text-xl rounded-lg border border-gray-300">
              <div>Total</div>
              <div>{Math.ceil((product.price * 0.18 + product.price) * quantity)}</div>
            </div>

           

             {serviceabilityResult?.available && (
            <div className="mt-4">
              <div className="text-lg font-semibold mb-2">Choose Payment Method:</div>
              <div className="flex flex-col space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="Prepaid"
                    checked={paymentMethod === "Prepaid"}
                    onChange={() => setPaymentMethod("Prepaid")}
                  />
                  <span>💳 Pay Now (Online Payment)</span>
                </label>

                {serviceabilityResult.cod && (
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <span>💵 Cash on Delivery</span>
                  </label>
                )}
              </div>
            </div>
          )}

          <button
            onClick={handleCheckout}
            disabled={!addressId || !serviceabilityResult?.available || !paymentMethod}
            className={`mt-6 w-full p-3 rounded-md text-white font-semibold ${
              !addressId || !serviceabilityResult?.available || !paymentMethod
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            Proceed to Checkout
          </button>
          </div>
        </div>

        {/* Address Section (unchanged) */}
        <div className="w-full lg:w-1/2 p-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow-lg">
            <p className="text-2xl font-semibold text-gray-800 bg-white p-4 rounded-lg shadow-md mb-4 text-center">
              Address
            </p>
            

            {/* 🚚 Delivery Info */}
{checkingDelivery ? (
  <div className="mt-2 flex items-center space-x-2 text-blue-600 text-sm">
    <span className="animate-spin text-lg">⏳</span>
    <span>Checking delivery availability...</span>
  </div>
) : serviceabilityResult ? (
  <div className="mt-2 text-sm p-4 rounded-lg shadow-sm border border-gray-200 bg-gray-50">
    {serviceabilityResult.available ? (
      <div className="text-green-700 space-y-1">
        <div className="flex items-center space-x-2 text-base font-semibold">
          <span className="text-xl">✅</span>
          <span>Delivery Available</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">⏱️ Estimated Delivery:</span>
          <span className="font-medium text-gray-800">{serviceabilityResult.eta}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">💵 Cash on Delivery:</span>
          <span className={`font-semibold ${serviceabilityResult.cod ? "text-green-700" : "text-red-600"}`}>
            {serviceabilityResult.cod ? "Available" : "Not Available"}
          </span>
        </div>
      </div>
    ) : (
      <div className="text-red-600 text-base font-medium flex items-center space-x-2">
        <span className="text-xl">❌</span>
        <span>Delivery Not Available at this address</span>
      </div>
    )}
  </div>
) : null}


            
            <div className="bg-white p-4 rounded-lg shadow-md">
              {addressList.length > 0 ? (
                addressList.map((addressDetails) => (
  <div key={addressDetails._id} className="mb-4">
    <label
      htmlFor={addressDetails._id}
      className={`block p-4 rounded border cursor-pointer ${
        addressId === addressDetails._id ? "border-blue-600" : "border-gray-300"
      }`}
    >
      <input
        type="radio"
        id={addressDetails._id}
        name="selectedAddress"
        value={addressDetails._id}
        checked={addressId === addressDetails._id}
        onChange={() => handleAddressSelection(addressDetails._id)}
        className="mr-2"
      />
      <div className="font-semibold text-lg">
        {addressDetails.firstName} {addressDetails.lastName}
      </div>
      <div>{addressDetails.streetAddress}</div>
      <div>
        {addressDetails.city}, {addressDetails.state} - {addressDetails.postalCode}
      </div>
      <div>Phone: {addressDetails.phoneNumber}</div>
    </label>
  </div>
))
              )
: (
                <div className="text-center text-gray-600">
                  No address found. Please add an address.
                </div>
              )}
            </div>

           <Button
  className="w-full mt-4 font-bold shadow-lg bg-blue-900 hover:bg-blue-700 transition duration-300"
  onClick={handleManageAddresses}
>
  {addressList.length > 0 ? "Change Address" : "Add Address"}
</Button>

         


          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyProduct;
