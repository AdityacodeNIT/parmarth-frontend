import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import Categories from "../Products/Categories";
import { useDispatch,useSelector } from "react-redux";
import { fetchProductsByCategory } from "../../features/product/productSlice";

const Reusable = () => {
  const { childToParent } = useContext(UserContext);
 const dispatch = useDispatch();
  const { products: productsData, loading, error } = useSelector(state => state.product);

  useEffect(() => {
  dispatch(fetchProductsByCategory("ReusableProduct"));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Hero Section (Nature-Inspired) */}
      <section className="relative w-full h-[34vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-cyan-600/20 to-blue-500/20 shadow-lg rounded-b-md">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
          Sustainable & Reusable Stationery 🌿
        </h1>
        <p className="mt-2 text-md sm:text-lg text-gray-200 max-w-xl">
          Eco-friendly products crafted from recycled materials to help the planet.
        </p>
        <Link to="/shop" className="mt-6 px-6 py-3 bg-green-600 hover:bg-cyan-600 text-black font-semibold rounded-full shadow-lg transition-transform hover:scale-105">
           Explore Now
         </Link>

        {/* Floating Leaf Animations */}
        <div className="absolute top-5 left-10 w-16 h-16 bg-green-400 opacity-20 blur-2xl rounded-full animate-bounce"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-teal-500 opacity-30 blur-2xl rounded-full animate-pulse"></div>
      </section>

      {/* Categories Section */}
      <Categories />

      {/* Product Grid */}
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-center mb-8 text-green-600">
          Shop Sustainable Essentials ♻️
        </h2>
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {productsData.map((product) => (
            <div
              key={product._id}
              className="bg-gray-900 rounded-xl shadow-lg border border-green-700 transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl"
              onClick={() => childToParent(product)}
            >
              <Link to="/About" className="block">
                <div className="relative overflow-hidden h-56 bg-gray-700 rounded-t-xl flex items-center justify-center">
                  <img
                    src={product.ProductImage}
                    alt={product.name}
                    className="w-4/5 h-auto object-contain transition-transform duration-500 ease-in-out transform hover:scale-110"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-white font-semibold text-lg truncate">
                    {product.name}
                  </h3>
                  <p className="text-green-400 font-bold text-lg mt-2">
                    ₹{product.price}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
     
    </div>
  );
};

export default Reusable;
