// src/pages/Cart.jsx
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

import {
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity,
} from '../../features/cart/cartSlice';

import {
  setOrderFromCart,
  placeShiprocketOrder,       // optional direct order
} from '../../features/product/orderSlice';

import { setAddresses} from '../../features/address/addressSlice';

const Cart = () => {
  const dispatch  = useDispatch();
  const navigate  = useNavigate();

  /* ---------- Cart State ---------- */
  const { cartItems, totalPrice } = useSelector((s) => s.cart);


  /* ---------- Address State ---------- */
  const { list: addressList, selectedId: addressId } = useSelector(
    (s) => s.address
  );

  /* ---------- Summary helper ---------- */
  const summaryLine = cartItems.map(
    (i) => `${i.name} (x${i.quantity})`
  ).join(', ');



  /* ===================================================
     HANDLERS
  =================================================== */

  const handleCheckout = () => {
    if (!addressId) {
      alert('Please select or add a shipping address before proceeding.');
      return;
    }
    dispatch(setOrderFromCart({ cartItems, addressId }));
    navigate('/payments');
  };


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
           console.log(payload);
         
          } else {
           dispatch(setAddresses(null));
          }
   
        } catch (err) {
         
     
        }
      };
       

    fetchAddressDetails();
  }, [dispatch]);




  const handleQuickOrder = async () => {
    if (!addressId) {
      alert('Select an address first!');
      return;
    }
    dispatch(setOrderFromCart({ cartItems, addressId }));
    const res = await dispatch(placeShiprocketOrder()).unwrap();
    if (res) {
      alert('Order placed successfully!');
      dispatch(clearCart());
      navigate('/orders');
    }
  };

  /* =================================================== */

  if (cartItems.length === 0) {
    return (
      <div className="bg-gray-900 min-h-screen flex items-center justify-center">
        <p className="text-3xl text-gray-400">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-4 md:p-8">
      <h2 className="text-center text-4xl font-extrabold text-teal-400 mb-6">
        Shopping Cart
      </h2>

      <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* ================= Cart List ================= */}
        <div className="flex-1 space-y-4">
          <div className="bg-gray-800 rounded-xl p-4 shadow-md">
            <h4 className="text-2xl font-semibold text-teal-400">
              Items ({cartItems.length})
            </h4>
          </div>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="bg-gray-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-lg hover:shadow-xl transition"
            >
              <Link to={`/product/${item._id}`} className="flex-shrink-0">
                <img
                  src={item.imgLink || item.ProductImage}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </Link>

              <div className="flex-1 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="text-xl font-semibold text-gray-100">{item.name}</h3>
                  <p className="text-gray-400">
                    Price: <span className="text-teal-400">₹{item.price}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => dispatch(decrementQuantity(item._id))}
                    className="w-8 h-8 bg-gray-700 rounded-lg hover:bg-gray-600"
                  >
                    –
                  </button>
                  <span className="text-lg text-gray-100">{item.quantity}</span>
                  <button
                    onClick={() => dispatch(incrementQuantity(item._id))}
                    className="w-8 h-8 bg-gray-700 rounded-lg hover:bg-gray-600"
                  >
                    +
                  </button>
                  <button
                    onClick={() => dispatch(removeFromCart(item._id))}
                    className="ml-4 text-red-400 hover:text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ================= Summary / Address ================= */}
        <div className="w-full lg:w-1/3 bg-gray-800 rounded-2xl p-6 shadow-lg flex flex-col">
          <h4 className="text-2xl font-semibold text-center text-teal-400 mb-4">
            Order Summary
          </h4>

          <div className="space-y-3 text-gray-100">
            <p className="text-gray-400">{summaryLine}</p>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax (18%)</span>
              <span>₹{Math.ceil(totalPrice * 0.18)}</span>
            </div>
            <div className="border-t border-gray-700 pt-3 flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>₹{Math.ceil(totalPrice * 1.18)}</span>
            </div>
          </div>

          {/* -------- Address Selection -------- */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold text-gray-200 mb-2">
              Shipping Address
            </h4>

            {addressId ? (
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-100">
                  Address ID: {addressId}
                </p>
                <p className="text-gray-400">
                  Click below to manage your addresses.
                </p>
              </div>
            ) : (
              <div className="bg-gray-700 p-4 rounded-lg">
                <p className="text-gray-400">
                  No address selected. Please add or select an address.
                </p>
              </div>
            )}

            <div className="mt-2">
              <Link
                to="/address"
                className="text-sm inline-block bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-lg text-white"
              >
                {addressList.length === 0 ? 'Add Address' : 'Manage Addresses'}
              </Link>
            </div>
          </div>

          {/* -------- Checkout Buttons -------- */}
          <button
            onClick={handleCheckout}
            className="mt-6 w-full py-3 bg-teal-500 hover:bg-teal-600 rounded-xl text-lg font-semibold"
          >
            Go to Checkout
          </button>

          {/* Quick‑order demo (optional) */}
          {/* 
          <button
            onClick={handleQuickOrder}
            className="mt-3 w-full py-3 bg-indigo-500 hover:bg-indigo-600 rounded-xl text-lg font-semibold"
          >
            Place Order Now
          </button>
          */}
        </div>
      </div>
    </div>
  );
};

export default Cart;
