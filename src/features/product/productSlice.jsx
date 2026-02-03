// features/product/productSlice.js
import { productAPI } from '@/api/productAPi';
import { userAPI } from '@/api/userAPI';
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async ({ category } = {}, { rejectWithValue }) => {
    try {
      const res = await productAPI.getAll({
        params: category ? { category } : {}
      }
      )
       

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
      const res = await productAPI.getById(id);
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
    // Cache management
    lastFetched: null, // Timestamp of last fetch
    productCache: {}, // Cache individual products by ID with timestamps
    cacheExpiry: 5 * 60 * 1000, // 5 minutes in milliseconds
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
    invalidateCache: (state) => {
      state.lastFetched = null;
      state.productCache = {};
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
      state.lastFetched = Date.now(); // Update cache timestamp
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
      // Cache individual product with timestamp
      if (action.payload?._id) {
        state.productCache[action.payload._id] = {
          data: action.payload,
          timestamp: Date.now(),
        };
      }
    })
     .addCase(fetchProductById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    })

},

});

export const { clearProductState, totalProductPrice, invalidateCache } = productSlice.actions;

// Selectors
export const selectShouldRefetchProducts = (state) => {
  const { lastFetched, cacheExpiry } = state.product;
  if (!lastFetched) return true;
  return Date.now() - lastFetched > cacheExpiry;
};

export const selectCachedProduct = (state, productId) => {
  const cached = state.product.productCache[productId];
  if (!cached) return null;
  
  const isExpired = Date.now() - cached.timestamp > state.product.cacheExpiry;
  return isExpired ? null : cached.data;
};

export default productSlice.reducer;
