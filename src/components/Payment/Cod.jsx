import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectBaseAmount } from '../../utils/selectors.jsx';
import { clearCurrentOrder, placeShiprocketOrder } from '../../features/product/orderSlice';
import { clearCart } from '../../features/cart/cartSlice';
import UserContext from '../../context/UserContext.jsx';

const CashOnDelivery = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseAmount = useSelector(selectBaseAmount);
  const totalAmount = Math.ceil(baseAmount * 1.18);
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const { userDetail } = useContext(UserContext);

  const handleCodConfirm = async () => {
    setLoading(true);
    setStatus('Placing COD order…');

    try {
      const action = await dispatch(placeShiprocketOrder());

      if (placeShiprocketOrder.fulfilled.match(action)) {
        dispatch(clearCart());
        dispatch(clearCurrentOrder());

        const orderRes = action.payload;
        const successId = orderRes.order_id || orderRes.id || 'latest';

        setStatus('Order placed successfully! Redirecting...');
        setTimeout(() => {
          navigate(`/order-success/${successId}`);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 1500);
      } else {
        setStatus(`Failed to place order: ${action.payload || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      setStatus('Something went wrong while placing the order.');
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
          <p className="text-lg font-medium">Tax (18%): ₹{Math.ceil(baseAmount * 0.18)}</p>
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
