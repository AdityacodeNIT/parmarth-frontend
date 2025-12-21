import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setOrderFromBuyNow,setDeliverycharge, setOrderFromCart } from "../../features/product/orderSlice";
import { Button } from "../../components/ui/button";
import useAddresses from "../../hooks/useAddresses.js"
import BillSummary from "./BillSummary";
import AddressList from "../Address/AddressList";

const BuyProduct = () => {

  const {
   addressList,
  addressId,
  loading,
  error,
  serviceabilityResult,
  checkingDelivery,
  handleAddressSelection
} = useAddresses();

  const dispatch = useDispatch();
  const navigate = useNavigate();


const orderState = useSelector((state) => state.order);
const { current, deliverycharge } = orderState;

// For Buy Now
const product = current?.product;
console.log(product)
const quantity = current?.quantity || 1;

// For Cart Checkout
const items = current?.items || [];
console.log(items)
const isCartCheckout = current?.source === "cart";

      const [paymentMethod, setPaymentMethod] = useState("");
  // Wait for persisted product before redirecting
// New, corrected code in BuyProduct.jsx


useEffect(() => {
  if (product === undefined && items.length === 0) return; // Wait for rehydration

  // Only redirect if it's NOT a cart checkout AND there is no product
  if (!isCartCheckout && (!product || !product.name)) {
    navigate("/shop");
  }

  // Also, handle the case where someone lands here from the cart, but the cart is empty
  if (isCartCheckout && items.length === 0) {
    navigate("/cart");
  }

}, [product, items, isCartCheckout, navigate]);


const handleCheckout = () => {
  if (!addressId || !serviceabilityResult?.available || !paymentMethod) {
    alert("Please select a serviceable address and payment method.");
    return;
  }

  if (isCartCheckout) {
 dispatch(setOrderFromCart({ cartItems: items, addressId, paymentMethod }));
  } else {
    // For buy now, set the single product order
    dispatch(setOrderFromBuyNow({ product, addressId, quantity, paymentMethod }));
  }

 
setTimeout(() => {
  if (paymentMethod === "Prepaid") navigate("/payments");
  else if (paymentMethod === "cod") navigate("/cod");
}, 100);
};

  const handleManageAddresses = () => {
    navigate("/allAddresses?redirect=/BuyProduct");
  };

// AFTER THE FIX (The correct code)

if (loading) return <div>Loading...</div>;
if (error) return <div>{error}</div>;

// This combined check now correctly handles both cart and "buy now" flows
// It only checks for a product if it's NOT a cart checkout.
if (!isCartCheckout && (!product || !product.name)) {
  return <div>Redirecting...</div>;
}

  return (
    <div className="space-y-4 bg-background text-foreground">
      <h2 className="text-2xl font-bold text-center  p-4 rounded-lg shadow-md">
        CheckOut
      </h2>

<div className="flex flex-col lg:flex-row justify-between p-4 rounded-lg shadow-md mt-4">

  <div className="w-full lg:w-1/2 p-4">
      <BillSummary
  isCartCheckout={isCartCheckout}
  items={items}
  product={product}
  quantity={quantity}
  serviceabilityResult={serviceabilityResult}
  paymentMethod={paymentMethod}
  setPaymentMethod={setPaymentMethod}
  handleCheckout={handleCheckout}
/>
  </div>

  <div className="w-full lg:w-1/2 p-4">
  
         <AddressList
    addressList={addressList}
    selectedAddressId={addressId}
    onSelect={handleAddressSelection}
    serviceabilityResult={serviceabilityResult}
    checkingDelivery={checkingDelivery}
    handleManageAddresses={handleManageAddresses}
  />
        
  </div>

</div>

        {/* Bill Section */}
     


        {/* Address Section */}
      
  
    </div>
  );
};

export default BuyProduct;
