// src/features/wishlist/wishlistSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  fetchWishlist,
  addToWishlist,
  removeFromWishlist
} from "@/services/WishlistService";

export const loadWishlist = createAsyncThunk(
  "wishlist/load",
  async () => {
    return await fetchWishlist();
  }
);

export const addWishlistItem = createAsyncThunk(
  "wishlist/add",
  async (productId) => {
    await addToWishlist({ items: [{ productId }] });
    return productId;
  }
);

export const removeWishlistItem = createAsyncThunk(
  "wishlist/remove",
  async (productId) => {
    await removeFromWishlist(productId);
    return productId;
  }
);

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadWishlist.fulfilled, (state, action) => {
        state.items = action.payload || [];
        state.loading = false;
      })
      .addCase(addWishlistItem.fulfilled, (state, action) => {
        state.items.push({
          productId: { _id: action.payload }
        });
      })
      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.productId._id !== action.payload
        );
      });
  }
});

export default wishlistSlice.reducer;
