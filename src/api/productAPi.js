import api from "./axios";

export const productAPI = {
  // PUBLIC
  getAll: () => api.get("/products"),

  getById: (id) =>
    api.get(`/products/${id}`),

  search: (data) =>
    api.post("/products/searchProduct", data),

  getTrending: () =>
    api.get("/products/getTrendingProduct"),

  getWhyHealthyAI: (productId, signal) =>
    api.get(`/products/ai/whyHealthy/${productId}`, {
      signal,
    }),

  // SELLER / ADMIN
  add: (formData) =>
    api.post("/products", formData, {
      withCredentials: true,
    }),

  update: (id, formData) =>
    api.post(`/products/updateProduct/${id}`, formData, {
      withCredentials: true,
    }),

  delete: (id) =>
    api.delete(`/products/deleteProduct/${id}`, {
      withCredentials: true,
    }),

  getSellerProducts: () =>
    api.get("/products/manageProduct", {
      withCredentials: true,
    }),
};
