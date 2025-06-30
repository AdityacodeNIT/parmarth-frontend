// features/product/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk(
  'product/fetchProducts',
  async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/product/getProduct`
    );
        console.log(res.data)    
    return res.data;   
// becomes action.payload in 'fulfilled'
  }
);


const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProductState: (state) => {
      state.products = [];
      state.loading = false;
      state.error = null;
    },
    totalProductPrice: (state, action) => {
      const total = state.products.reduce((sum, product) => {
        return sum + product.price * (action.payload[product._id] || 0);
      }, 0);
      return total;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
