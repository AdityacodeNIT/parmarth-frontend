import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

console.log("RUNTIME API URL:", import.meta.env.VITE_API_URL);
/**
 * Add item(s) to wishlist
 */
export const addToWishlist = async (wishlist) => {
  const res = await axios.post(
    `${API_URL}/api/v2/wishlist`,
    wishlist,
    { withCredentials: true }
  );
  return res.data;
};

/**
 * Fetch wishlist for a user
 */
export const fetchWishlist = async () => {
  const res = await axios.get(
    `${API_URL}/api/v2/wishlist`,
    { withCredentials: true,
       
     }
  );
  return res.data;
};

/**
 * Remove a product from wishlist
 */
export const removeFromWishlist = async (productId) => {
    if (!productId) return;
  const res = await axios.delete(
    `${API_URL}/api/v2/wishlist/${productId}`,
    { withCredentials: true }
  );
  return res.data;
};


