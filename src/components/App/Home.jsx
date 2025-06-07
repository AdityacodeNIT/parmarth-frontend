import React, { useState, useEffect, useContext,useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../context/UserContext";
import SubscribeSection from "../User/SubscribeSection";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const { childToParent } = useContext(UserContext);

    const getTrendingProductDetail = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/v1/product/getTrendingProduct`
            );
            if (response) {
                setProducts(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };


     const carouselRef = useRef(null);

  // Auto sliding effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const container = carouselRef.current;
        const scrollAmount = container.scrollLeft + 240;

        if (scrollAmount >= container.scrollWidth - container.clientWidth) {
          container.scrollTo({ left: 0, behavior: "smooth" }); // Reset to start
        } else {
          container.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 3000); // 3s interval

    return () => clearInterval(interval);
  }, []);



    useEffect(() => {
        getTrendingProductDetail();
    }, []);

    const categoryCarouselRef = useRef(null);

  // Auto slide for mobile
  useEffect(() => {
    const interval = setInterval(() => {
      if (categoryCarouselRef.current) {
        const container = categoryCarouselRef.current;
        const scrollAmount = container.scrollLeft + 240;

        if (scrollAmount >= (container.scrollWidth - container.clientWidth)+10) {
          container.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          container.scrollTo({ left: scrollAmount, behavior: "smooth" });
        }
      }
    }, 8000); // 3 seconds interval

    return () => clearInterval(interval);
  }, []);

  const recommendedCarouselref = useRef(null);  
    // Auto slide for mobile
    useEffect(() => {
        const interval = setInterval(() => {
            if (recommendedCarouselref.current) {
                const container = recommendedCarouselref.current;
                const scrollAmount = container.scrollLeft + 240;
                if (scrollAmount >= (container.scrollWidth - container.clientWidth) + 10) {
                    container.scrollTo({ left: 0, behavior: "smooth" });
                } else {
                    container.scrollTo({ left: scrollAmount, behavior: "smooth" });
                }
            }
        }, 5000); // 3 seconds interval
        return () => clearInterval(interval);
    }, []);

    const getRecommendations = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/activity/recommendations`,
                { withCredentials: true }
            );
            if (response) {
                setRecommendations(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch products", error);
        }
    };

      const categories = [
    {
      name: "Writing Instruments",
      img: "/assets/10b1e33d-42e9-478b-a60e-59da139d2ecc.webp",
    },
    { name: "Paper Products", img: "/assets/paperProducts.webp" },
    {
      name: "Desk Supplies",
      img: "https://images.pexels.com/photos/5088007/pexels-photo-5088007.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Filing & Storage",
      img: "https://images.pexels.com/photos/10567177/pexels-photo-10567177.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
    {
      name: "Reusable Products",
      img: "https://images.pexels.com/photos/7488492/pexels-photo-7488492.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

    useEffect(() => {
        getRecommendations();
    }, []);

    return (
        <div className="w-full">
            {/* Hero Section */}
            <div className="relative w-full h-[67vh] bg-cover bg-center flex items-center justify-center text-white text-center px-6" 
                style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1663956066898-282c7609afc9?w=1600&auto=format&fit=crop&q=80')" }}>
                <div className="bg-black bg-opacity-30 p-4 md:p-8 rounded-lg backdrop-blur-md">
                    <h1 className="text-2xl md:text-6xl font-extrabold drop-shadow-lg">Your One-Stop Stationery Store</h1>
                    <p className="mt-4 text-xl md:text-2xl font-light">
                        Premium writing instruments, paper products, and office supplies at your fingertips.
                    </p>
                    <Link to="/shop">
                        <button className="lg:mt-6 mt-4 bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 lg:px-8 px-4 lg:py-4 py-2 rounded-full text-lg font-semibold flex items-center gap-3 shadow-lg transform hover:scale-105 transition-all">
                            Shop Now <FontAwesomeIcon icon={faArrowRight} />
                        </button>
                    </Link>
                </div>
            </div>

       <div className="md:py-14 py-3 px-4 sm:px-8 bg-gray-100">
      <h2 className="text-3xl sm:text-4xl font-bold text-center lg:mb-8 mb-6 text-gray-800">
        Shop by Category
      </h2>

      {/* Mobile Carousel */}
      <div
        ref={categoryCarouselRef}
        className="sm:hidden flex gap-4 overflow-x-auto scrollbar-hide pb-2"
      >
        {categories.map((category, index) => (
          <Link
            to={`/${category.name.replace(/\s+/g, "")}`}
            key={index}
            className="min-w-[220px] flex-shrink-0"
          >
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transform hover:scale-103 transition-all">
              <img
                src={category.img}
                alt={category.name}
                loading="lazy"
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-base font-semibold text-gray-800">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Grid layout for larger screens */}
      <div className="hidden sm:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {categories.map((category, index) => (
          <Link
            to={`/${category.name.replace(/\s+/g, "")}`}
            key={index}
            className="block"
          >
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transform hover:scale-105 transition-all">
              <img
                src={category.img}
                alt={category.name}
                loading="lazy"
                className="w-full h-40 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {category.name}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>

            {/* Trending Now Section */}
           <div className="md:py-16 py-4 bg-gray-100 px-4 sm:px-8">
      <h2 className="text-2xl sm:text-4xl font-bold text-center md:mb-8 mb-4 text-gray-800">
        Trending Now
      </h2>

      {/* Mobile Carousel */}
      <div
        ref={carouselRef}
        className="sm:hidden flex gap-1 overflow-x-auto scrollbar-hide pb-2"
      >
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => childToParent(product)}
            className="min-w-[220px] bg-white rounded-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all border border-gray-200 p-4 flex-shrink-0"
          >
            <Link to="/About">
              <img
                src={product.ProductImage}
                alt={product.name}
                className="w-full h-40 object-contain"
              />
              <h3 className="text-gray-800 font-semibold text-base mt-2 text-center">
                {product.name}
              </h3>
              <p className="text-teal-600 font-bold text-lg text-center mt-2">
                ₹{product.price}
              </p>
            </Link>
          </div>
        ))}
      </div>

      {/* Grid for larger screens */}
      <div className="hidden sm:grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {products.map((product) => (
          <div
            key={product._id}
            onClick={() => childToParent(product)}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all border border-gray-200 p-5"
          >
            <Link to="/About">
              <img
                src={product.ProductImage}
                alt={product.name}
                className="w-full h-44 object-contain"
              />
              <h3 className="text-gray-800 font-semibold text-lg mt-3 text-center">
                {product.name}
              </h3>
              <p className="text-teal-600 font-bold text-xl text-center mt-3">
                ₹{product.price}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>





            {/* Products Section */}

              {/* Trending Now Section */}
           <div className="md:py-16 py-4 bg-gray-100 px-4 sm:px-8">
      <h2 className="text-2xl sm:text-4xl font-bold text-center md:mb-8 mb-4 text-gray-800">
       Products You Might Like
      </h2>

      {/* Mobile Carousel */}
      <div
        ref={recommendedCarouselref}
        className="sm:hidden flex gap-1 overflow-x-auto scrollbar-hide pb-2 border-b-2"
      >
        {recommendations.map((product) => (
          <div
            key={product._id}
            onClick={() => childToParent(product)}
            className="min-w-[220px] bg-white rounded-sm shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all border border-gray-200 p-4 flex-shrink-0"
          >
            <Link to="/About">
              <img
                src={product.ProductImage}
                alt={product.name}
                className="w-full h-40 object-contain"
              />
              <h3 className="text-gray-800 font-semibold text-base mt-2 text-center">
                {product.name}
              </h3>
              <p className="text-teal-600 font-bold text-lg text-center mt-2">
                ₹{product.price}
              </p>
            </Link>
          </div>
        ))}
      </div>

      {/* Grid for larger screens */}
      <div className="hidden sm:grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {recommendations.map((product) => (
          <div
            key={product._id}
            onClick={() => childToParent(product)}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all border border-gray-200 p-5"
          >
            <Link to="/About">
              <img
                src={product.ProductImage}
                alt={product.name}
                className="w-full h-44 object-contain"
              />
              <h3 className="text-gray-800 font-semibold text-lg mt-3 text-center">
                {product.name}
              </h3>
              <p className="text-teal-600 font-bold text-xl text-center mt-3">
                ₹{product.price}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>



           

            

            {/* Newsletter Signup */}
            <SubscribeSection />
        </div>
    );
};

export default Home;
