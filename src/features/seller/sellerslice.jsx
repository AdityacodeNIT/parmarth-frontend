// features/seller/sellerSlice.jsx
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const persistedSeller = (() => {
  try { return JSON.parse(localStorage.getItem("sellerInfo")) || null; }
  catch { return null; }
})();

export const fetchSellerDashboard = createAsyncThunk(
  "seller/fetchDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/seller/dashboard`,
        { withCredentials: true } // important if you use httpOnly cookie
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err?.response?.data?.message || "Failed to load dashboard"
      );
    }
  }
);

export const fetchMe = createAsyncThunk(
  "seller/fetchMe",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/me`,
        { withCredentials: true }
      );
      return res.data; // should contain user object incl. approved flag
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);

const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    sellerInfo: persistedSeller, // rehydrate from localStorage
    dashboard: null,
    loading: false,
    error: null,
  },
  reducers: {
    setSellerInfo(state, action) {
      state.sellerInfo = action.payload;
      try {
        localStorage.setItem("sellerInfo", JSON.stringify(action.payload));
      } catch {}
    },
    clearSeller(state) {
      state.sellerInfo = null;
      state.dashboard = null;
      try { localStorage.removeItem("sellerInfo"); } catch {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerDashboard.pending, (s) => {
        s.loading = true; s.error = null;
      })
      .addCase(fetchSellerDashboard.fulfilled, (s, a) => {
        s.loading = false; s.dashboard = a.payload;
      })
      .addCase(fetchSellerDashboard.rejected, (s, a) => {
        s.loading = false; s.error = a.payload || "Error";
      })
      .addCase(fetchMe.fulfilled, (s, a) => {
        s.sellerInfo = a.payload;
        try { localStorage.setItem("sellerInfo", JSON.stringify(a.payload)); } catch {}
      })
      .addCase(fetchMe.rejected, (s) => {
        s.sellerInfo = null;
        try { localStorage.removeItem("sellerInfo"); } catch {}
      });
  },
});

export const { setSellerInfo, clearSeller } = sellerSlice.actions;
export default sellerSlice.reducer;
