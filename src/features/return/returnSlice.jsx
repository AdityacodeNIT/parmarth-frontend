import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/v1/returns`;

// Create return request
export const createReturnRequest = createAsyncThunk(
  'return/createRequest',
  async (returnData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/create`, returnData, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create return request');
    }
  }
);

// Get my returns
export const getMyReturns = createAsyncThunk(
  'return/getMyReturns',
  async ({ status, page = 1, limit = 10 } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ page, limit });
      if (status) params.append('status', status);
      
      const response = await axios.get(`${API_URL}/my-returns?${params}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch returns');
    }
  }
);

// Get return by ID
export const getReturnById = createAsyncThunk(
  'return/getById',
  async (returnId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/${returnId}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch return details');
    }
  }
);

// Cancel return
export const cancelReturn = createAsyncThunk(
  'return/cancel',
  async ({ returnId, reason }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/${returnId}/cancel`,
        { reason },
        { withCredentials: true }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to cancel return');
    }
  }
);

// Admin: Get all returns
export const getAllReturns = createAsyncThunk(
  'return/getAllReturns',
  async ({ status, page = 1, limit = 20 } = {}, { rejectWithValue }) => {
    try {
      const params = new URLSearchParams({ page, limit });
      if (status) params.append('status', status);
      
      const response = await axios.get(`${API_URL}/admin/all?${params}`, {
        withCredentials: true,
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch all returns');
    }
  }
);

// Admin: Approve return
export const approveReturn = createAsyncThunk(
  'return/approve',
  async ({ returnId, notes }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/${returnId}/approve`,
        { notes },
        { withCredentials: true }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to approve return');
    }
  }
);

// Admin: Reject return
export const rejectReturn = createAsyncThunk(
  'return/reject',
  async ({ returnId, notes }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/${returnId}/reject`,
        { notes },
        { withCredentials: true }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to reject return');
    }
  }
);

const returnSlice = createSlice({
  name: 'return',
  initialState: {
    returns: [],
    currentReturn: null,
    loading: false,
    error: null,
    pagination: {
      total: 0,
      page: 1,
      limit: 10,
      pages: 0,
    },
  },
  reducers: {
    clearReturnError: (state) => {
      state.error = null;
    },
    clearCurrentReturn: (state) => {
      state.currentReturn = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create return request
      .addCase(createReturnRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReturnRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.returns.unshift(action.payload);
      })
      .addCase(createReturnRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get my returns
      .addCase(getMyReturns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyReturns.fulfilled, (state, action) => {
        state.loading = false;
        state.returns = action.payload.returns;
        state.pagination = action.payload.pagination;
      })
      .addCase(getMyReturns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Get return by ID
      .addCase(getReturnById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getReturnById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentReturn = action.payload;
      })
      .addCase(getReturnById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Cancel return
      .addCase(cancelReturn.fulfilled, (state, action) => {
        const index = state.returns.findIndex(r => r._id === action.payload._id);
        if (index !== -1) {
          state.returns[index] = action.payload;
        }
        if (state.currentReturn?._id === action.payload._id) {
          state.currentReturn = action.payload;
        }
      })
      
      // Get all returns (admin)
      .addCase(getAllReturns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllReturns.fulfilled, (state, action) => {
        state.loading = false;
        state.returns = action.payload.returns;
        state.pagination = action.payload.pagination;
      })
      .addCase(getAllReturns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Approve/Reject return
      .addCase(approveReturn.fulfilled, (state, action) => {
        const index = state.returns.findIndex(r => r._id === action.payload._id);
        if (index !== -1) {
          state.returns[index] = action.payload;
        }
      })
      .addCase(rejectReturn.fulfilled, (state, action) => {
        const index = state.returns.findIndex(r => r._id === action.payload._id);
        if (index !== -1) {
          state.returns[index] = action.payload;
        }
      });
  },
});

export const { clearReturnError, clearCurrentReturn } = returnSlice.actions;
export default returnSlice.reducer;
