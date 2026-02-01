import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api/v1",
  withCredentials: true, // Enable sending/receiving cookies
});

// Add request interceptor for debugging (optional)
api.interceptors.request.use(
  (config) => {
    // Ensure withCredentials is always true
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle token expiration
    if (error.response?.status === 401) {
      // Token expired or invalid
      console.log('Authentication error:', error.response?.data?.message);
    }
    return Promise.reject(error);
  }
);

export default api;
