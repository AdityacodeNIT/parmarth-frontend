import api from "./axios";

export const paymentAPI = {
  /**
   * Start checkout / create payment
   * Protected (JWT via cookie)
   */
  checkout: (data) =>
    api.post("/payment/paid", data, {
      withCredentials: true,
    }),

  /**
   * Payment gateway callback (Razorpay / Stripe / etc.)
   * Protected (JWT)
   */
  paymentCallback: (data) =>
    api.post("/payment/paymentcallback", data, {
      withCredentials: true,
    }),

  /**
   * Verify transaction (usually server-to-server or public)
   * NOTE: backend does NOT use verifyJWT here
   */
  verifyTransaction: (data) =>
    api.post("/payment/paymentVerification", data),
};
