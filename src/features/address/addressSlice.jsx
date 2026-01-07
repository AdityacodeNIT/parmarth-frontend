import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { addressAPI } from "@/api/addressAPI";

export const fetchAddress = createAsyncThunk(
  "address/fetchAddress",
  async (_, { rejectWithValue }) => {
    try {
      const res = await addressAPI.getAll();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);





const initialState= {
  
    list: [],
    selectedId: null,
    loading: false,
    error: null,
  }
const addressSlice = createSlice({
  name: "address",
  initialState,

  // we define reducers here
  reducers: {
    setAddresses: (state, action) => {
      state.list = action.payload;
      if (!state.selectedId && action.payload.length > 0) {
        state.selectedId = action.payload[0]._id; // Default select first
      }
    },
    setSelectedAddressId: (state, action) => {
      state.selectedId = action.payload;
    },
    clearAddressState: (state) => {
      state.list = [];
      state.selectedId = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.loading = true;
        state.error = null;
      }
      )
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setAddresses, setSelectedAddressId, clearAddressState } = addressSlice.actions;

export default addressSlice.reducer;
