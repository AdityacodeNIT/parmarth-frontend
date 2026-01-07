import api from "./axios";

export const addressAPI = {
  add: (data) => api.post("/address", data, {withCredentials:true}),
  getAll: () => api.get("/address",{withCredentials:true}),
  update: (id, data) => api.put(`/address/${id}`, data),
  remove: (id) => api.delete(`/address/${id}`),
};
