import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const UserContextProvider = ({ children }) => {
  // State to manage the selected product details.
  const [data, setData] = useState(
    JSON.parse(localStorage.getItem("product")) || null
  );

  // State to manage detailed information of a product.
  const [productDetails, setProductDetails] = useState();
  const getProductDetail = (detail) => {
    setProductDetails(detail);
  };

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
    localStorage.setItem("product", JSON.stringify(data));
  }, [data]);


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
    if (userDetail?.data?.user?._id) {
      fetchFavourites();
    }
  }, [wishlist,removeFromWishlist]);





  // State to manage product reviews.
  const [review, setReview] = useState({ rating: 0, description: "" });
  const [productReview, setProductReview] = useState({});
  const [productId, setProductId] = useState(data?._id);
  const [totalRatings, setTotalRatings] = useState([]);
  const [averageRatings, setAverageRatings] = useState([]);

  // Handle form click for submitting a review.
  const handleFormClick = (e) => {
    setProductReview({ ...review, productId });
    setReview({ rating: 0, message: "" });
  };

  // Submit product review whenever productReview changes.
  useEffect(() => {
    if (productReview.rating && productReview.message) {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/api/v2/feedback/addReview`,
          productReview,
          {withCredentials: true}
        )
        .catch((error) => {
          console.error("There was an error posting the review!", error);
        });
    }
  }, [productReview]);


  

  // Fetch average ratings and total ratings for a product.
  useEffect(() => {
    setAverageRatings(0);
    setTotalRatings(0);
    if (productId) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/v2/feedback/average`, {
          productId,
        })
        .then((response) => {
          setAverageRatings(response.data.averageRating);
          setTotalRatings(response.data.count);
        })
        .catch((error) => {
          console.error(
            "There was an error fetching the average ratings!",
            error
          );
        });
    }
  }, [productId, productReview]);


  const[gotReview,setGotReview]=useState([]);


  const getReview=async(productId)=>{
    console.log("productId",productId);
    if (!productId) return;
    const response =  await axios.get(`${import.meta.env.VITE_API_URL}/api/v2/feedback/getReview/${productId}`,
    )
    setGotReview(response.data);
  
  }




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
        review,
        setReview,
        productReview,
        setProductReview,
        productId,
        setProductId,
        handleFormClick,
        totalRatings,
        averageRatings,
        removeFromWishlist,
        sellerDetail,
        getSellerDetail,
        gotReview,
        getReview,
      
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;


