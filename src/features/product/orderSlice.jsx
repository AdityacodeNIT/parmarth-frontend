// src/features/order/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/* ────────────────────────────────────────────────────────────
   Thunk: create a Shiprocket order
   It builds its payload from state.order.current
──────────────────────────────────────────────────────────── */
export const placeShiprocketOrder = createAsyncThunk(
  'order/placeShiprocketOrder',
  async (_, { getState, rejectWithValue }) => {
    const { current } = getState().order;

    if (!current.items.length)
      return rejectWithValue('No items selected for order');

    if (!current.addressId)
      return rejectWithValue('Shipping address not selected');

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/shiprocket/order`,
        { items: current.items },
        { withCredentials: true }
      );
      return res.data;          // Shiprocket response
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/* ────────────────────────────────────────────────────────────
   Slice
──────────────────────────────────────────────────────────── */
const orderSlice = createSlice({
  name: 'order',
  initialState: {
    /* what the user is about to checkout */
    current: {
      source: null,        // 'cart' | 'buyNow'
      items: [],           // [{ productId, quantity, Address_id }]
      addressId: null,
    },

    /* server response of last order */
    orderDetails: null,

    /* history of successful orders */
    orderSuccess: [],

    loading: false,
    error: null,
  },

  reducers: {
    /* build from CART items */
    setOrderFromCart(state, action) {
      const { cartItems, addressId } = action.payload; // expects both
      state.current.source    = 'cart';
      state.current.items     = cartItems.map(i => ({
        productId : i._id,
        quantity  : i.quantity,
        Address_id: addressId,
      }));
      state.current.addressId = addressId;
    },

    /* build from single BUY‑NOW item */
    setOrderFromBuyNow(state, action) {
      const { product, addressId,quantity } = action.payload;
        state.current.product   = product; 
         state.current.quantity  = quantity || 1; // default to 1 if not provided
      state.current.source    = 'buyNow';
      state.current.items     = [{
        productId : product._id,
        quantity  : quantity || 1, // default to 1 if not provided
        Address_id: addressId,
      }];
      state.current.addressId = addressId;
    },

    /* change address after the fact */
    updateOrderAddress(state, action) {
      const newId = action.payload;
      state.current.addressId = newId;
      state.current.items.forEach(i => { i.Address_id = newId; });
    },

    /* wipe only the draft order (after success / cancel) */
    clearCurrentOrder(state) {
      state.current = { source: null, items: [], addressId: null };
    },

    /* wipe history on logout if desired */
    purgeOrderHistory(state) {
      state.orderSuccess = [];
    },
  },

  extraReducers: builder => {
    builder
      .addCase(placeShiprocketOrder.pending, (state) => {
        state.loading = true;
        state.error   = null;
      })
      .addCase(placeShiprocketOrder.fulfilled, (state, action) => {
        state.loading      = false;
        state.orderDetails = action.payload;
        state.orderSuccess.unshift(action.payload);   // history
        state.current = { source: null, items: [], addressId: null };
      })
      .addCase(placeShiprocketOrder.rejected, (state, action) => {
        state.loading = false;
        state.error   = action.payload;
      });
  }
});

export const {
  setOrderFromCart,
  setOrderFromBuyNow,
  updateOrderAddress,
  clearCurrentOrder,
  purgeOrderHistory,
} = orderSlice.actions;

export default orderSlice.reducer;
