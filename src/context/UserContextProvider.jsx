import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";

const UserContextProvider = ({ children }) => {
  // State to manage the selected product details
  const [data, setData] = useState(JSON.parse(localStorage.getItem("product")) || null);

  // State to manage detailed information of a product
  const [productDetails, setProductDetails] = useState();
  const getProductDetail = (detail) => {
    setProductDetails(detail);
  };

  // Address Section: Initializing and managing address details with localStorage persistence
  const [addressDetails, setAddressDetails] = useState(() => {
    const savedAddressDetails = localStorage.getItem("addDetails");
    return savedAddressDetails ? JSON.parse(savedAddressDetails) : {};
  });

  const getAddressDetail = (addDetails) => {
    setAddressDetails(addDetails);
  };

  useEffect(() => {
    localStorage.setItem("addDetails", JSON.stringify(addressDetails));
  }, [addressDetails]);

  // Product Management: Handling selected product information with localStorage persistence
  const childToParent = (product) => {
    setData(product);
  };

  const wishlistToProduct=(productId)=>{
    setData(productId);
  }

  useEffect(() => {
    localStorage.setItem("product", JSON.stringify(data));
  }, [data]);

  
  const [quantity, setQuantity] = useState(1);

  // State to manage items in the cart
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );

  // Save cart items to localStorage whenever there's a change in cartItems state
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Cart Management: Adding, removing, and updating cart items
  const addToCart = (product, productId) => {
    let existingProduct = cartItems.find((item) => item._id.toString() === productId);

    if (existingProduct) {
      // If product already exists in cart, increment its quantity
      const updatedCartItems = cartItems.map((item) =>
        item._id.toString() === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCartItems);
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  // Reducing item quantity in the cart or removing it
  const removingElements = (productId) => {
    const removingCartItems = cartItems.map((item) =>
      item.quantity >= 2 && item._id === productId
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(removingCartItems);
  };

  // Remove a specific item from the cart
  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => item._id.toString() !== productId);
    setCartItems(updatedCartItems);
  };

  // Calculate the total price of all items in the cart
  const totalCartPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Generate a description of items in the cart
  const cartDesccription = () => {
    return cartItems.map((item) => (
      <div key={item._id}>
        <div className=" flex bg-blue-100 p-2 font-semibold lg:text-xl text-sm">
          {item.name}
          <div className="ml-4 float-right">{item.price * item.quantity}</div>
        </div>
      </div>
    ));
  };

  // Product Management: Handling products marked for buying with localStorage persistence
  const [buyProduct, setBuyProduct] = useState(JSON.parse(localStorage.getItem("buyProduct")) || []);

  useEffect(() => {
    localStorage.setItem("buyProduct", JSON.stringify(buyProduct));
  }, [buyProduct]);

  // Buying a product and adding it to the buyProduct state
  const buyingProduct = (bought, boughtId) => {
    let existingitem = buyProduct.find((item) => item._id.toString() === boughtId);
    if (existingitem) {
      const updateProduct = buyProduct.map((item) =>
        boughtId === item._id.toString()
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setBuyProduct(updateProduct);
    } else {
      setBuyProduct([...buyProduct, { ...bought, quantity: 1 }]);
    }
  };

  // Remove all items from checkout and cart
  const removeItemfromCheckout = () => {
    setBuyProduct([]);
    setCartItems([]);
  };

  // Calculate the total price of all bought items
  const totalProductPrice = () => {
    return buyProduct.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  // Generate product price list for all bought items
  const totalPrice = (buyProduct) => {
    return buyProduct.map(product => product.quantity * product.price);
  };

  // Generate product descriptions for bought items
  const productDesccription = () => {
    return buyProduct.map((item) => (
      <div key={item._id}>
        <div className="border-1 border-slate-300 flex bg-blue-100 p-2 text-xl rounded-xl px-4">
          {item.name} x {item.quantity}
          <div className="ml-4">= {item.price * item.quantity}</div>
        </div>
      </div>
    ));
  };

  // Generate product names
  const productName = () => {
    return buyProduct.map((item) => (
      <div className="border-1 border-slate-300 flex bg-blue-100 p-2 text-xl rounded-xl px-4">
        {item.name}
      </div>
    ));
  };

  // State to manage successful orders
  const [orderSuccess, setOrderSuccess] = useState([]);
  useEffect(() => {
    localStorage.setItem("orderSuccess", JSON.stringify(orderSuccess));
  }, [orderSuccess]);

  // State to manage user details
  const [userDetail, setUserDetail] = useState(JSON.parse(localStorage.getItem("details")) || null);
  const getUserDetail = async (details) => {
    if (details) {
      setUserDetail(details);
    } else {
      console.error("Invalid details passed to getUserDetail");
    }
  };
  useEffect(() => {
    localStorage.setItem("details", JSON.stringify(userDetail));
  }, [userDetail]);

  // Notification management for adding items to the cart
  const [notification, setNotification] = useState("");
  const handleAddToCart = () => {
    addToCart(data, data._id.toString());
    setNotification("Your item is added to the cart");

    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  // Order Management: Creating an order from cart and buyProduct items
  const [orderProduct, setOrderProduct] = useState({
    userId: userDetail?.data?.user?._id,
    items: [],
  });

  useEffect(() => {
    setOrderProduct((prevOrderProduct) => ({
      ...prevOrderProduct,
      items: buyProduct.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
    }));
  }, [buyProduct]);

  useEffect(() => {
    setOrderProduct((prevOrderProduct) => ({
      ...prevOrderProduct,
      items: cartItems.map((item) => ({
        productId: item._id,
        quantity: item.quantity,
      })),
    }));
  }, [cartItems]);

  useEffect(() => {
    console.log(orderProduct);
  }, [orderProduct]);

  // State to manage user's order details
  const [myOrder, setMyOrder] = useState([]);
  const getMyOrder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v2/order/orders/${userDetail.data.user._id}`
      );
      if (response.data) {
        setMyOrder(response.data);
        console.log(response);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (userDetail?.data?.user?._id) {
      getMyOrder();
    }
  }, [userDetail]);


  // Handling successful order submission
  const orderSuccessful = async (order) => {
    setOrderSuccess((prevOrders) => [...prevOrders, order]);
    handleFormSubmit();
  };

  // Handling form submission to create an order
  const handleFormSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v2/order/getOrders",
        orderProduct
      );
      if (!response) {
        console.error("Unable to place order");
      }
    } catch (error) {
      console.error("Issue in placing order", error);
    }
  };

  const [wishlist, setWishlist] = useState(() => ({
    userId: userDetail?.data?.user?._id, 
    items: [] 
  }));
  
  


  // const addToFavourite = async (itemId) => {
  //   // const updatedWishlist = {
  //   //   ...wishlist,
  //   //   items: [...item, { productId: itemId, quantity: 1 }],
  //   // };

  //   setWishlist((prevWishlist) => ({
  //     ...prevWishlist,
  //     items: {
  //       productId: itemId,
  //      quantity:1,
  //     },
  //   }));


    const addToFavourite = async (itemId) => {
   

      const updatedWishlist = {
        ...wishlist,
        items: [...wishlist.items, { productId: itemId, quantity: 1 }],
      };
      
      setWishlist(updatedWishlist);  // Update state first
    
      try {
        const response = await axios.post('http://localhost:8000/api/v2/wishlist/addWishlist', updatedWishlist);
        if (response.data) {
          localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        }
      } catch (error) {
        console.error('Error adding to wishlist:', error);
      }
    };
    

  const [myWishlist, setMyWishlist] = useState([]);

    const fetchFavourites = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v2/wishlist/Wishlists/${userDetail.data.user._id}`
        );
        if (response.data ) {
          setMyWishlist(response.data); // Make sure `response.data.items` is an array
        } 
      } catch (error) {
        console.error("Error fetching favourites:", error);
        setWishlist({ userId: userDetail?.data?.user?._id, items: [] }); // Set default empty array on error
      }
    };
    
  

    useEffect(() => {
      if (userDetail?.data?.user?._id) {
        fetchFavourites(); // Fetch only when user ID is available
      }
    }, [wishlist]); // Include user ID in the dependency array



  // Review Management: Handling product reviews and ratings
  const [totalProductReview, setTotalProductReview] = useState(0
  );

  // State to manage individual product reviews
  const [productReview, setProductReview] = useState({
    productId: data?._id,
  });

  // State to manage total ratings
  const [totalRatings, setTotalRatings] = useState(0);

  // State to manage product ratings (e.g., rating a product after purchase)
  const [ratings, setRatings] = useState({
    productId: data?._id,
  });



  // State to manage average rating of a product
  const [averagereview, setAverageReview] = useState(0);

  // Fetching average reviews for a product
  useEffect(() => {
    axios
      .post("http://localhost:8000/api/v2/feedback/average", productReview)
      .then((response) => {
        setTotalProductReview(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [productReview, totalRatings]);

  // Fetching total ratings of a product
  useEffect(() => {
    axios
      .post("http://localhost:8000/api/v2/feedback/setAverage", ratings)
      .then((response) => {
        setTotalRatings(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [productReview, totalRatings, ratings]);

  // Calculating average rating for the product
  useEffect(() => {
    if (totalRatings > 0) {
      setAverageReview(Math.floor(totalRatings / totalProductReview));
    }
    if (totalRatings === 0) {
      setAverageReview(0);
    }
  }, [totalRatings]);



  const [searchResult,setSearchResult]=useState([]);

  const handleSearch=(query)=>{
      if (!query) {
        setSearchResult([]); // Clear results if query is empty
        return;
      }
  
      // Implement your search logic
      const results = data.filter(data => data.name.toLowerCase().includes(query.toLowerCase()));
      setSearchResult(results);
  }

  return (
    <UserContext.Provider
      value={{
        // Cart items and management functions
        cartItems,
        addToCart,
        userDetail,
        getProductDetail,
        setQuantity,
        productDesccription,
        productDetails,
        buyingProduct,
        getUserDetail,
        data,
        childToParent,
        removeFromCart,
        quantity,
        removingElements,
        totalCartPrice,
        totalProductPrice,
        cartDesccription,
        addressDetails,
        getAddressDetail,
        removeItemfromCheckout,
        productName,
        totalPrice,
        buyProduct,
        orderSuccess,
        orderSuccessful,
        setOrderSuccess,
        myOrder,
        averagereview,
        productReview,
        totalProductReview,
        handleAddToCart,
        notification,
        addToFavourite,
        wishlist,
        myWishlist,
       handleSearch,
       searchResult
    }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
