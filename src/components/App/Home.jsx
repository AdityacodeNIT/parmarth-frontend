import React, { useState,useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../context/UserContext";
import SubscribeSection from "../User/SubscribeSection";




const Home = () => {
    const [products, setProducts] = useState([]);
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

useEffect(() => {
  getTrendingProductDetail();
}, []);
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] bg-cover bg-center flex items-center justify-center text-white text-center px-6" 
           style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1663956066898-282c7609afc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHN0YXRpb25hcnl8ZW58MHx8MHx8fDA%3D')" }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-4xl md:text-6xl font-bold">Your One-Stop Stationery Store</h1>
          <p className="mt-4 text-lg md:text-xl">
            Get the best writing instruments, paper products, and office supplies delivered to your door.
          </p>
          <Link to="/shop">
            <button className="mt-6 bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-full text-lg font-semibold flex items-center gap-2">
              Shop Now <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
           { name: "Writing Instruments", img: "/assets/10b1e33d-42e9-478b-a60e-59da139d2ecc.webp" },
            { name: "Paper Products", img: "/assets/paperProducts.webp" },
            { name: "Desk Supplies", img: "https://images.pexels.com/photos/5088007/pexels-photo-5088007.jpeg?auto=compress&cs=tinysrgb&w=600" },
            { name: "Filing & Storage", img: "https://images.pexels.com/photos/10567177/pexels-photo-10567177.jpeg?auto=compress&cs=tinysrgb&w=600" },
            { name: "Reusable Products", img: "https://images.pexels.com/photos/7488492/pexels-photo-7488492.jpeg?auto=compress&cs=tinysrgb&w=600" },
          ].map((category, index) => (
            <Link to={`/${category.name.replace(/\s+/g, '')}`} key={index}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                <img src={category.img} alt={category.name} className="w-full h-32 object-cover" />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-12 bg-gray-100 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">Trending Now</h2>
           <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 hover:scale-105 border border-gray-200"
                      onClick={() => childToParent(product)}
                    >
                      <Link to="/About" style={{ textDecoration: "none" }}>
                        <div className="relative overflow-hidden h-44 bg-gray-100 rounded-t-xl">
                          <img
                            src={product.ProductImage}
                            alt={product.name}
                            className="w-full h-full object-contain transition-transform duration-500 ease-in-out transform hover:rotate-2 hover:scale-105"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="text-gray-900 font-semibold text-lg md:text-xl text-center truncate">
                            {product.name}
                          </h3>
        
                          <p className="text-teal-600 font-bold text-xl text-center mt-3">
                            ₹{product.price}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
      </div>

      {/* Newsletter Signup */}
      <div><SubscribeSection/>  </div>
    </div>
  );
};

export default Home;
