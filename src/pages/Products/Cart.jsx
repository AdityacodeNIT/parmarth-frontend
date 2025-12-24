// src/pages/Cart.jsx
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

import {
  removeFromCart,
  clearCart,
  incrementQuantity,
  decrementQuantity
} from '../../features/cart/cartSlice';

import {
  setOrderFromCart
  // optional direct order
} from '../../features/product/orderSlice';

import { setAddresses } from '../../features/address/addressSlice';
import CartItem from '../Cart/CartItem';
import CartSummary from '../Cart/CartSummary';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [addressError, setAddressError] = useState(null);

  /* ---------- Cart State ---------- */
  const { cartItems, totalPrice } = useSelector(s => s.cart);

  /* ---------- Address State ---------- */
  const { list: addressList, selectedId: addressId } = useSelector(s => s.address);

  /* ---------- Summary helper ---------- */
  const summaryLine = cartItems.map(i => `${i.name} (x${i.quantity})`).join(', ');

  /* ===================================================
     HANDLERS
  =================================================== */

  const handleCheckout = () => {
    if (!addressId) {
      alert('Please select or add a shipping address before proceeding.');
      return;
    }
    dispatch(setOrderFromCart({ cartItems, addressId }));

    navigate('/BuyProduct');
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
      
        } else {
          dispatch(setAddresses([])); // Set to empty array if no data
        }
      } catch (err) {
        console.error('Failed to fetch addresses:', err);
        setAddressError('Failed to load shipping addresses. Please try again.');
      }
    };

    fetchAddressDetails();
  }, [dispatch]);

  /* =================================================== */

  if (cartItems.length === 0) {
    return (
      <div className='bg-background text-foreground min-h-screen flex items-center justify-center'>
        <p className='text-3xl text-gray-400'>Your cart is empty</p>
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-background text-foreground px-4 md:px-8 py-10">
    
    {/* Page Header */}
    <header className="max-w-6xl mx-auto mb-10 text-center">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
        Shopping Cart
      </h1>
      <p className="text-muted-foreground mt-2">
        Review items in your cart before proceeding to checkout
      </p>
    </header>

    {/* Main Layout */}
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      {/* ================= Cart Items ================= */}
      <section className="lg:col-span-2 space-y-4">
        
        {/* Items Header */}
        <Card className="bg-card">
          <CardHeader>
            <CardTitle className="text-lg">
              Items ({cartItems.length})
            </CardTitle>
          </CardHeader>
        </Card>

        {/* Items List */}
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem
              key={item._id}
              item={item}
              onIncrement={(id) => dispatch(incrementQuantity(id))}
              onDecrement={(id) => dispatch(decrementQuantity(id))}
              onRemove={(id) => dispatch(removeFromCart(id))}
            />
          ))}
        </div>
      </section>

      {/* ================= Summary ================= */}
      <aside className="lg:col-span-1">
        <CartSummary
          totalPrice={totalPrice}
          summaryLine={summaryLine}
          addressId={addressId}
          addressList={addressList}
          onCheckout={handleCheckout}
        />
      </aside>
    </div>
  </div>
);
};

export default Cart;
