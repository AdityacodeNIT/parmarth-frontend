import api from "./axios";

export const userAPI = {
  /* ───────────── AUTH ───────────── */

  register: (formData) =>
    api.post("/users/register", formData, {
      withCredentials: true,
      // DO NOT set Content-Type (axios + multer handle it)
    }),

  login: (data) =>
    api.post("/users/login", data, {
      withCredentials: true,
    }),

  logout: () =>
    api.post("/users/logout", null, {
      withCredentials: true,
    }),

  refreshToken: () =>
    api.post("/users/refresh-token", null, {
      withCredentials: true,
    }),

  /* ───────────── USER ───────────── */

  getCurrentUser: () =>
    api.get("/users/me", {
      withCredentials: true,
    }),

  updateAccountDetail: (data) =>
    api.post("/users/updateUserdetail", data, {
      withCredentials: true,
    }),

  changePassword: (data) =>
    api.post("/users/changePassword", data, {
      withCredentials: true,
    }),

  updateAvatar: (formData) =>
    api.post("/users/updateAvatar", formData, {
      withCredentials: true,
    }),

  /* ───────────── ADMIN (USERS) ───────────── */

  getUserList: () =>
    api.get("/users/userList", {
      withCredentials: true,
    }),

  deleteUser: (id) =>
    api.delete(`/users/deleteUser/${id}`, {
      withCredentials: true,
    }),

  updateUserRole: (id, data) =>
    api.post(`/users/updateUserPost/${id}`, data, {
      withCredentials: true,
    }),

  /* ───────────── SELLERS (ADMIN) ───────────── */

  getAllSellers: (status) =>
    api.get("/users/sellers", {
      withCredentials: true,
    
    }),

  getSellerById: (id) =>
    api.get(`/users/sellers/${id}`, {
      withCredentials: true,
    }),

  updateSellerApproval: (id, data) =>
    api.patch(`/users/sellers/${id}`, data, {
      withCredentials: true,
    }),

  deleteSeller: (id) =>
    api.delete(`/users/sellers/${id}`, {
      withCredentials: true,
    }),
};
