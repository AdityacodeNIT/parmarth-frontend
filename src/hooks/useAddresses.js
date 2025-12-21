import { useEffect, useState } from 'react';
import { setAddresses, setSelectedAddressId } from '@/features/address/addressSlice';
import { useDispatch,useSelector } from 'react-redux';
import { setDeliverycharge } from '@/features/product/orderSlice';
import axios from 'axios';

const useAddresses = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [serviceabilityResult, setServiceabilityResult] = useState(null);
  const [checkingDelivery, setCheckingDelivery] = useState(false);
  const { list: addressList, selectedId: addressId } = useSelector(state => state.address);

  //fetch Addresses

  useEffect(() => {
    const fetchAddressDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/address/getAddress/${addressId}`,
          { withCredentials: true }
        );

        console.log(response);

        if (response.data?.data) {
          const payload = Array.isArray(response.data.data)
            ? response.data.data
            : [response.data.data];
          dispatch(setAddresses(payload));
        } else {
          dispatch(setAddresses([]));
        }
      } catch (err) {
        setError('Failed to load addresses.');
      } finally {
        setLoading(false);
      }
    };

    fetchAddressDetails();
  }, [dispatch, addressId]);

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
            `${import.meta.env.VITE_API_URL}/shiprocket/check`,
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

  return  {
   addressList,
  addressId,
  loading,
  error,
  serviceabilityResult,
  checkingDelivery,
  handleAddressSelection
};

}

export default useAddresses;
