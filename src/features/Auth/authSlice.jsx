import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const verifyAuth = createAsyncThunk(
  "auth/verifyAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/users/me`,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/login`,
        loginData,
        { withCredentials: true }
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Invalid credentials"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle", // idle | loading | authenticated | unauthenticated
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = "unauthenticated";
      state.error = null;
    },
     setUser: (state, action) => {
    state.user = action.payload;
    state.status = "authenticated";
  },
  },
  extraReducers: (builder) => {
    builder
      // -------- verifyAuth --------
      .addCase(verifyAuth.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "authenticated";
        state.error = null;
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.user = null;
        state.status = "unauthenticated";
        state.error = null;
      })

      // -------- loginUser --------
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "authenticated";
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.user = null;
        state.status = "unauthenticated";
        state.error = action.payload;
      });
  },
});

export const { logout,setUser } = authSlice.actions;
export default authSlice.reducer;
