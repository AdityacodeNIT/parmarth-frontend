    import React, { useState, useEffect } from "react";
    import UserContext from "./UserContext";
    import axios from "axios";

    const UserContextProvider = ({ children }) => {

      const [data, setData] = useState(
        JSON.parse(localStorage.getItem("product")) || null
      );


      const [productDetails, setProductDetails] = useState()
      const getProductDetail = (detail) => {
        setProductDetails(detail);
      }
      //  Adddress Section Starts here --:

      const [addressDetails, setAddressDetails] = useState(() => {
        const savedAddressDetails = localStorage.getItem('addDetails');
        return savedAddressDetails ? JSON.parse(savedAddressDetails) : {};
      });
      const getAddressDetail = (addDetails) => {
        setAddressDetails(addDetails);
      }
      useEffect(() => {
        localStorage.setItem('addDetails', JSON.stringify(addressDetails));
      }, [addressDetails]);

      //End

      //THis section is for product manangement 

      const childToParent = (product) => {
        setData(product);
      };

      useEffect(() => {
        localStorage.setItem("product", JSON.stringify(data));
      }, [data]);

      const [quantity, setQuantity] = useState(1);

      const [cartItems, setCartItems] = useState(
        JSON.parse(localStorage.getItem("cartItems")) || []
      );

      useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }, [cartItems]);

      /*-----This section is for the cart management ----- */

      const addToCart = (product, productId) => {
        let existingProduct = cartItems.find((item) => item._id.toString() === productId);

        if (existingProduct) {
      
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
      }

        const removingElements = (productId) => {
          const removingCartItems = cartItems.map((item) =>
            item.quantity >= 2 && item._id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
        );
        setCartItems(removingCartItems);
      }

      const removeFromCart = (productId) => {
        const updatedCartItems = cartItems.filter(item => item._id.toString()!== productId);
        setCartItems(updatedCartItems);
      }

      const totalCartPrice = () => {
        return cartItems.reduce((total, item) => { return total + (item.price * item.quantity) }, 0);
      }

    
      const cartDesccription = () => {
        return cartItems.map((item) => (
          <div key={item._id}>
            <div className=" flex bg-blue-100 p-2 font-semibold lg:text-xl text-sm" >{item.name}<div className="ml-4 float-right" >{item.price * item.quantity}</div> </div>
          </div>
        )
        )
      }
      // cart ends here

      const [buyProduct, setBuyProduct] = useState(JSON.parse(localStorage.getItem("buyProduct")) || []
      );

      useEffect(() => {
        localStorage.setItem("buyProduct", JSON.stringify(buyProduct));
      }, [buyProduct]);


      const buyingProduct = (bought, boughtId ) => {
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
      }
      
      const removeItemfromCheckout=()=>{
      setBuyProduct([]);
      setCartItems([]); }

      const totalProductPrice = () => {
        return buyProduct.reduce((total, item) => { return total + (item.quantity * item.price) }, 0)
      }

      const totalPrice = (buyProduct) => {
        return buyProduct.map(product => product.quantity * product.price);
      };
      const productDesccription = () => {
        return buyProduct.map((item) => (

          <div key={item._id}>
            <div className="border-1 border-slate-300 flex bg-blue-100 p-2  text-xl rounded-xl px-4" >{item.name}x{item.quantity}<div className="ml-4" >={item.price * item.quantity}</div> </div>
          </div>
        )
        )
      }
      const productName=()=>{
        return buyProduct.map((item) => (
            <div className="border-1 border-slate-300 flex bg-blue-100 p-2  text-xl rounded-xl px-4" >{item.name}</div>
        )
        )
      }

      
      //
      const [orderSuccess, setOrderSuccess] = useState([]);

      useEffect(() => {
        localStorage.setItem("orderSuccess", JSON.stringify(orderSuccess));
      }, [orderSuccess]);



      const [userDetail, setUserDetail] = useState(
        JSON.parse(localStorage.getItem("details")) ||  null
      );

      const getUserDetail = async(details) => {
        if(details){
        setUserDetail(details)
        }
        else{
          console.error("Invalid details passed to getUserDetail");
        }
      }
      useEffect(() => {
        localStorage.setItem("details", JSON.stringify(userDetail));
      }, [userDetail]);


      const [notification, setNotification] = useState("");

      const handleAddToCart = () => {
        addToCart(data, data._id.toString());
        setNotification("Your item is added to the cart");

        setTimeout(() => {
          setNotification("");
        }, 3000);
      };
      

    const [orderProduct, setOrderProduct] = useState({
      userId:userDetail?.data?.user?._id ,
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

  

    //
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

      // intializing use navigate method
    const orderSuccessful = async (order) => {
      setOrderSuccess((prevOrders) => [...prevOrders, order]);
      handleFormSubmit();
    };
    //const navigate = useNavigate();
    const handleFormSubmit = async () => {
    
        try {
          const response = await axios.post(
            "http://localhost:8000/api/v2/order/getOrders",
            orderProduct
          );
          if (!response) {
            console.error("Unable to login");
          }
        } catch (error) {
          console.error("Issue in login", error);
        } 
      
    };
    
      // ORDER SECTION

    

    

      const [totalProductReview, setTotalProductReview] = useState(0);

      const [productReview, setProductReview] = useState({
      productId: data?._id,
    });

      

    
    const[totalRatings,setTotalRatings]=useState(0)

      const [ratings, setRatings] = useState(
        {
          productId:data?._id,

        }
      );
      const [averagereview, setAverageReview] = useState(0);
      
    

      useEffect(() => {
        axios
        .post("http://localhost:8000/api/v2/feedback/average", productReview)
        .then((response) => {
          setTotalProductReview(response.data);
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }, [productReview,totalRatings]);

    useEffect(() => {
      axios
      .post("http://localhost:8000/api/v2/feedback/setAverage",ratings )
      .then((response) => {
        setTotalRatings(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    }, [productReview,totalRatings,ratings]);


    
      
      
      useEffect(() => {
        if (totalRatings> 0) {
        
          setAverageReview(totalRatings /totalProductReview);
        }
        if(totalRatings===0){
          setAverageReview(0)
        }
      }, [totalRatings]);


      
      

      return (
        <UserContext.Provider value={{
          cartItems, addToCart, userDetail, getProductDetail,setQuantity, productDesccription, productDetails, buyingProduct, getUserDetail, data, childToParent, removeFromCart, quantity, removingElements, totalCartPrice, totalProductPrice,
          cartDesccription, addressDetails, getAddressDetail, removeItemfromCheckout,productName,totalPrice,
            buyProduct,orderSuccess,orderSuccessful,setOrderSuccess,myOrder,averagereview,productReview,totalProductReview,handleAddToCart,notification}}>
          {children}
        </UserContext.Provider>
      )
    };

    export default UserContextProvider;