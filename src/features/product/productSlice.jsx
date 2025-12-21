// features/product/productSlice.js
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ category } = {}, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product`,
        {
          params: category ? { category } : {},
        }
      );

      return res.data; // -> action.payload
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch products");
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "product/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/${id}`
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to fetch product");
    }
  }
);



const productSlice = createSlice({
  name: 'product',
  initialState: {
    products: [],
    currentProduct: null,
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
    })
    .addCase(fetchProductById.pending,(state)=>{
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchProductById.fulfilled,(state,action)=>{
      state.loading = false;
      state.currentProduct = action.payload;
    })
     .addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

},

});

export default productSlice.reducer;
