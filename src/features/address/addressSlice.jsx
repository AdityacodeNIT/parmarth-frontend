// features/address/addressSlice.js
import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    list: [],
    selectedId: null, // This is the selected address ID
    loading: false,
    error: null,
  },
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
});

export const { setAddresses, setSelectedAddressId, clearAddressState } = addressSlice.actions;

export default addressSlice.reducer;
