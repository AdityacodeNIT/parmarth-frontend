import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectBaseAmount } from '../../utils/selectors.jsx';
import { clearCurrentOrder, placeShiprocketOrder, setPaymentMethod } from '../../features/product/orderSlice';
import { clearCart } from '../../features/cart/cartSlice';

const CashOnDelivery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseAmount = useSelector(selectBaseAmount);
  const deliverycharge = useSelector((s) => s.order.deliverycharge);
  const currentOrder = useSelector((state) => state.order.current);
  const totalAmount = Math.ceil(baseAmount * 1.18+(deliverycharge || 0));
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  // Ensure payment method is set to COD when component mounts
  useEffect(() => {
    console.log('=== COD COMPONENT MOUNTED ===');
    console.log('Current order state:', currentOrder);
    console.log('Payment method:', currentOrder.paymentMethod);
    console.log('Items:', currentOrder.items);
    console.log('Address ID:', currentOrder.addressId);
    
    if (currentOrder.paymentMethod !== 'COD') {
      console.log('⚠️ Payment method is not COD, setting it now...');
      dispatch(setPaymentMethod('COD'));
    } else {
      console.log('✅ Payment method already set to COD');
    }
  }, []);

  const handleCodConfirm = async () => {
    setLoading(true);
    setStatus('Placing COD order…');

    try {
      console.log('=== PLACING COD ORDER ===');
      console.log('Current order state:', currentOrder);
      console.log('Payment method:', currentOrder.paymentMethod);
      console.log('Items to order:', currentOrder.items);
      console.log('Address ID:', currentOrder.addressId);
      
      const action = await dispatch(placeShiprocketOrder());
      console.log('=== SHIPROCKET ORDER RESPONSE ===');
      console.log('Action type:', action.type);
      console.log('Action payload:', action.payload);

      if (placeShiprocketOrder.fulfilled.match(action)) {
        console.log('✅ Order placed successfully!');
        dispatch(clearCart());
        dispatch(clearCurrentOrder());

        const orderRes = action.payload;
        console.log('Order response:', orderRes);
        
        // Handle array response from Shiprocket
        const firstOrder = Array.isArray(orderRes) ? orderRes[0] : orderRes;
        const successId = firstOrder?.order_id || firstOrder?.id || 'latest';
        console.log('Order ID:', successId);

        setStatus('Order placed successfully! Redirecting...');
        setTimeout(() => {
          navigate(`/order-success`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
      } else {
        console.error('❌ Order placement failed');
        console.error('Action:', action);
        console.error('Error payload:', action.payload);
        console.error('Error message:', action.error?.message);
        
        const errorMsg = action.payload || action.error?.message || 'Unknown error';
        setStatus(`Failed to place order: ${errorMsg}`);
      }
    } catch (err) {
      console.error('❌ COD order error:', err);
      console.error('Error details:', err.message, err.stack);
      setStatus('Something went wrong while placing the order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-300 flex justify-center items-center min-h-screen p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-4">Cash on Delivery</h2>

        <div className="mb-4 space-y-1">
          <p className="text-lg font-medium">Base: ₹{baseAmount}</p>

          <p className="text-lg font-medium">Tax (5%): ₹{Math.ceil(baseAmount * 0.05)}</p>
          <p className="text-lg font-medium">Delivery Charge: ₹{deliverycharge || 0}</p>
          <p className="text-lg font-bold">Total: ₹{totalAmount}</p>
        </div>

        <p className="text-sm text-gray-700 mb-4">
          Your order will be delivered to the address provided. You can pay ₹{totalAmount} in cash at the time of delivery.
        </p>

        <button
          onClick={handleCodConfirm}
          disabled={loading}
          className={`w-full p-3 rounded-lg font-semibold ${
            loading ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'
          } text-white`}
        >
          {loading ? 'Placing Order…' : 'Confirm COD Order'}
        </button>

        {status && (
          <p
            className={`text-center mt-4 ${
              status.includes('success') ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default CashOnDelivery;
