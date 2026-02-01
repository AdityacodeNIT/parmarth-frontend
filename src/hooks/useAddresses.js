import { useEffect, useState } from 'react';
import { setAddresses, setSelectedAddressId } from '@/features/address/addressSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setDeliverycharge } from '@/features/product/orderSlice';
import axios from 'axios';

const useAddresses = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serviceabilityResult, setServiceabilityResult] = useState(null);
  const [checkingDelivery, setCheckingDelivery] = useState(false);
  const [shouldRedirectToAddAddress, setShouldRedirectToAddAddress] = useState(false);
  const { list: addressList, selectedId: addressId } = useSelector(state => state.address);

  // Fetch Addresses
  useEffect(() => {
    const fetchAddressDetails = async () => {
      setLoading(true);
      setError(null);
      setShouldRedirectToAddAddress(false);

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/address`,
          { withCredentials: true }
        );

        if (response.data?.data) {
          const payload = Array.isArray(response.data.data)
            ? response.data.data
            : [response.data.data];
          
          dispatch(setAddresses(payload));
          
          // Check if addresses are empty - trigger redirect
          if (payload.length === 0) {
            setShouldRedirectToAddAddress(true);
          } else {
            // Auto-select first address if none selected and addresses exist
            if (!addressId) {
              dispatch(setSelectedAddressId(payload[0]._id));
            }
          }
        } else {
          dispatch(setAddresses([]));
          setShouldRedirectToAddAddress(true);
        }
      } catch (err) {
        console.error('Address fetch error:', err);
        const errorMessage = err.response?.data?.message || 'Failed to load addresses. Please try again.';
        setError(errorMessage);
        
        // If it's a 404 or no addresses found, trigger redirect
        if (err.response?.status === 404 || err.response?.data?.data?.length === 0) {
          setShouldRedirectToAddAddress(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAddressDetails();
  }, [dispatch]);

  // Check serviceability when addressId changes
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
            `${import.meta.env.VITE_API_URL}/api/v1/shiprocket/check`,
            { pincode: selectedAddress.postalCode },
            { withCredentials: true }
          );
        const data = res.data?.data || null;
  setServiceabilityResult(data);
  
  if (data?.deliveryCharge !== undefined) {
    dispatch(setDeliverycharge(Math.ceil(data.deliveryCharge)));
  }
  
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

  const refetchAddresses = async () => {
    setLoading(true);
    setError(null);
    setShouldRedirectToAddAddress(false);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/address`,
        { withCredentials: true }
      );

      if (response.data?.data) {
        const payload = Array.isArray(response.data.data)
          ? response.data.data
          : [response.data.data];
        
        dispatch(setAddresses(payload));
        
        if (payload.length > 0 && !addressId) {
          dispatch(setSelectedAddressId(payload[0]._id));
        }
      }
    } catch (err) {
      console.error('Refetch error:', err);
      setError('Failed to reload addresses.');
    } finally {
      setLoading(false);
    }
  };

  return {
    addressList,
    addressId,
    loading,
    error,
    serviceabilityResult,
    checkingDelivery,
    shouldRedirectToAddAddress,
    handleAddressSelection,
    refetchAddresses
  };
};

export default useAddresses;
