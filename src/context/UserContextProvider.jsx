import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const UserContextProvider = ({ children }) => {
  // State to manage the selected product details.
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("product")) || null
  );
  const recordActivity = async (action, productId) => {
    try {
     
      if (!productId) return;
  
      await axios.post(`${import.meta.env.VITE_API_URL}/api/activity/record`, {
      
        action,
        productId,
      },
      {
        withCredentials:true,
      }
    );
  
    } catch (error) {
      console.error("Error recording user activity:", error);
    }
  };
  // Product Management: Handling selected product information with localStorage persistence.
  const childToParent = (product) => {
    setData(product);
    recordActivity("show",product._id);
  };
  
  // Save selected product to localStorage whenever there's a change in data state.
  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(data)); }, [data]);

  // State to manage user details.
  const [userDetail, setUserDetail] = useState(
    JSON.parse(localStorage.getItem("details")) || null
  );

  const getUserDetail = async (details) => {
    if (details) {
      setUserDetail(details);
    } else {
      console.error("Invalid details passed to getUserDetail");
    }
  };

  // Save user details to localStorage whenever there's a change in userDetail state.
  useEffect(() => {
    localStorage.setItem("details", JSON.stringify(userDetail));
  }, [userDetail]);

 // State to manage user details.
 const [sellerDetail, setSellerDetail] = useState(
  JSON.parse(localStorage.getItem("sellerdetails")) || null
);

const getSellerDetail = async (selldetails) => {
  if (selldetails) {
    setSellerDetail(selldetails);
  } else {
    console.error("Invalid details passed to getUserDetail");
  }
};

// Save user details to localStorage whenever there's a change in userDetail state.
useEffect(() => {
  localStorage.setItem("sellerdetails", JSON.stringify(sellerDetail));
}, [sellerDetail]);


  // Notification management for adding items to the cart.
  const [notification, setNotification] = useState("");

  // State to manage wishlist.
  const [wishlist, setWishlist] = useState(() => ({
    userId: userDetail?.data?.user?._id,
    items: [],
  }));

  // Add item to wishlist.
  const addToFavourite = async (itemId) => {
    const updatedWishlist = {
      ...wishlist,
      items: [...wishlist.items, { productId: itemId, quantity: 1 }],
    };

    setWishlist(updatedWishlist); // Update state first

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/wishlist/addWishlist`,
        updatedWishlist
      );
      if (response.data) {
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v2/wishlist/removeWishlistItem`,
        {productId},
        { withCredentials: true }

      );
     
    } catch (error) {
      console.error("Error fetching favourites:", error);
    }
  };
  

  const [myWishlist, setMyWishlist] = useState([]);

  // Fetch wishlist items.
  const fetchFavourites = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v2/wishlist/Wishlists/${
          userDetail.data.user._id
        }`
      );
      if (response.data) {
        setMyWishlist(response.data);
      }
    } catch (error) {
      console.error("Error fetching favourites:", error);
      setWishlist({ userId: userDetail?.data?.user?._id, items: [] });
    }
  };

  
useEffect(() => {
  if (!userDetail?.data?.user?._id) return;

  fetchFavourites();
}, [userDetail?.data?.user?._id]);


  // State to manage product reviews.
  const [productId, setProductId] = useState(data?._id);

  // State to manage search results.
  const [searchResult, setSearchResult] = useState([]);
  // Handle search query.
  const handleSearch = (query) => {
    setSearchResult(query.result);
  };

  // State to manage order items.
  const [orderItems, setOrderItems] = useState([]);

  // Fetch order details by order ID.
  const GetOrderId = async (id) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/shiprocket/getOrder/${id}`,
        { withCredentials: true }
      );
      if (response) {

        setOrderItems(response.data.data.data);
        console.log(response.data.data.data);
      }
    } catch (error) {
      console.error("Failed to register", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        setUserDetail,
        userDetail,
        getUserDetail,
        data,
        childToParent,
        notification,
        addToFavourite,
        wishlist,
        myWishlist,
        handleSearch,
        searchResult,
        setProductId,
        removeFromWishlist,
        sellerDetail,
        getSellerDetail,

      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;


