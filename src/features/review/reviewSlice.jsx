// features/review/reviewSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReviewsByProduct = createAsyncThunk(
  "review/fetchByProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v2/review/getReview/${productId}`,
        { withCredentials: true }
      );
      return { productId, reviews: res.data }; // expect an array
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const submitReview = createAsyncThunk(
  "review/submit",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/review`,
        payload,
        { withCredentials: true }
      );
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchAverageForProduct = createAsyncThunk(
  "review/fetchAverage",
  async (productId, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/review/average`,
        { productId },
        { withCredentials: true }
      );
      // expect { averageRating, count }
      return { productId, averageRating: res.data.averageRating, count: res.data.count };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const initialState = {
  byProduct: {},            // { [productId]: [reviews] }
  averages: {},             // { [productId]: { avg, count } }
  loading: false,
  error: null,
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviews(state) {
      state.byProduct = {};
      state.averages = {};
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchReviewsByProduct
      .addCase(fetchReviewsByProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsByProduct.fulfilled, (state, action) => {
        state.loading = false;
        const { productId, reviews } = action.payload;
        state.byProduct[productId] = [...reviews];
      })
      .addCase(fetchReviewsByProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // submitReview
      .addCase(submitReview.pending, (state) => {
        state.error = null;
      })
      .addCase(submitReview.fulfilled, (state, action) => {
        
        // optionally bump averages locally (or refetch via fetchAverageForProduct)
      })
      .addCase(submitReview.rejected, (state, action) => {
        state.error = action.payload;
      })

      // fetchAverageForProduct
      .addCase(fetchAverageForProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(fetchAverageForProduct.fulfilled, (state, action) => {
        const { productId, averageRating, count } = action.payload;
        state.averages[productId] = { avg: averageRating, count };
      })
      .addCase(fetchAverageForProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;

/** Selectors (root state assumed as state.review) */
export const selectReviewsByProduct = (state, productId) =>
  state.review.byProduct[productId] || [];

export const selectAverageForProduct = (state, productId) =>
  state.review.averages[productId] || { avg: 0, count: 0 };

/** Derived selectors similar to yours */
export const avgReviewByProduct = (state, productId) => {
  const list = selectReviewsByProduct(state, productId);
  if (list.length === 0) return 0;
  return list.reduce((acc, r) => acc + (r.rating || 0), 0) / list.length;
};

export const numOfReviewByProduct = (state, productId) =>
  selectReviewsByProduct(state, productId).length;

export const getReviewsMessageByUser = (state, userId) =>
  Object.values(state.review.byProduct)
    .flat()
    .filter((r) => r.userId === userId)
    .map((r) => r.message)
    .join(", ");
