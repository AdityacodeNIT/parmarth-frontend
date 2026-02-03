import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { setOrderFromBuyNow, setOrderFromCart } from "../../features/product/orderSlice";
import { Button } from "../../components/ui/button";
import { Alert, AlertDescription } from "../../components/ui/alert";
import useAddresses from "../../hooks/useAddresses.js";
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
    shouldRedirectToAddAddress,
    handleAddressSelection,
    refetchAddresses
  } = useAddresses();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [redirectCountdown, setRedirectCountdown] = useState(5);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const orderState = useSelector((state) => state.order);
  const { current } = orderState;

  // For Buy Now
  const product = current?.product;
  const quantity = current?.quantity || 1;

  // For Cart Checkout
  const items = current?.items || [];
  const isCartCheckout = current?.source === "cart";

  const [paymentMethod, setPaymentMethod] = useState("");

  // Wait for persisted product before redirecting
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

  // Handle graceful redirect to add address when no addresses exist
  useEffect(() => {
    if (shouldRedirectToAddAddress && !loading) {
      setIsRedirecting(true);
      
      // Start countdown
      const countdownInterval = setInterval(() => {
        setRedirectCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            // Redirect with return URL
            const returnUrl = encodeURIComponent(location.pathname);
            navigate(`/addressUpdate?redirect=${returnUrl}`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [shouldRedirectToAddAddress, loading, navigate, location.pathname]);

  // Check if user returned from adding address - refetch addresses
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const addressAdded = urlParams.get('addressAdded');
    
    if (addressAdded === 'true') {
      refetchAddresses();
      // Clean up URL
      navigate(location.pathname, { replace: true });
    }
  }, [location.search, refetchAddresses, navigate, location.pathname]);

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

    // Navigate based on payment method
    setTimeout(() => {
      if (paymentMethod === "Prepaid") {
        navigate("/payments");
      } else if (paymentMethod === "COD" || paymentMethod === "cod") {
        navigate("/cod");
      } else {
        alert("Invalid payment method selected");
      }
    }, 100);
  };

  const handleManageAddresses = () => {
    const returnUrl = encodeURIComponent(location.pathname);
    navigate(`/allAddresses?redirect=${returnUrl}`);
  };

  const handleAddAddressNow = () => {
    const returnUrl = encodeURIComponent(location.pathname);
    navigate(`/addressUpdate?redirect=${returnUrl}`);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <p className="text-muted-foreground">Loading your addresses...</p>
      </div>
    );
  }

  // Redirecting state - graceful transition
  if (isRedirecting && shouldRedirectToAddAddress) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen space-y-6 p-6">
        <div className="max-w-md w-full space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-semibold">No Delivery Address Found</h2>
            <p className="text-muted-foreground">
              You need to add a delivery address to complete your order.
            </p>
          </div>

          <Alert className="border-primary/50 bg-primary/5">
            <AlertDescription className="text-center">
              Redirecting to add address in <span className="font-bold text-primary text-xl">{redirectCountdown}</span> seconds...
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Button 
              onClick={handleAddAddressNow} 
              size="lg" 
              className="w-full"
            >
              Add Address Now
            </Button>
            <Button 
              onClick={() => {
                setIsRedirecting(false);
                navigate(-1);
              }} 
              variant="outline" 
              size="lg" 
              className="w-full"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Error state with retry option
  if (error && !shouldRedirectToAddAddress) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen space-y-6 p-6">
        <div className="max-w-md w-full space-y-6 text-center">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-destructive">Error Loading Addresses</h2>
            <p className="text-muted-foreground">{error}</p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={refetchAddresses} 
              size="lg" 
              className="w-full"
            >
              Retry
            </Button>
            <Button 
              onClick={handleAddAddressNow} 
              variant="outline" 
              size="lg" 
              className="w-full"
            >
              Add New Address
            </Button>
            <Button 
              onClick={() => navigate(-1)} 
              variant="ghost" 
              size="lg" 
              className="w-full"
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Product validation
  if (!isCartCheckout && (!product || !product.name)) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-muted-foreground">Redirecting...</p>
      </div>
    );
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
