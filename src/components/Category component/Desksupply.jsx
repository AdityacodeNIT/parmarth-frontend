import React, { useEffect, useState, useContext } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Categories from "../Products/Categories";
import { fetchProductsByCategory } from "../../features/product/productSlice";

const Desksupply = () => {
  const { childToParent } = useContext(UserContext);
 const dispatch = useDispatch();
  const { products: productsData, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchProductsByCategory("DeskSupplies"));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section (Cyberpunk Glow) */}
      <section className="relative w-full h-[34vh] flex flex-col items-center justify-center text-center bg-gradient-to-r from-cyan-600/20 to-blue-500/20 shadow-xl rounded-b-lg">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-md">
          Upgrade Your Workspace 🖇️
        </h1>
        <p className="mt-2 text-lg text-gray-200 max-w-xl">
          Discover premium desk supplies designed for efficiency and style.
        </p>
       <Link to="/shop" className="mt-6 px-6 py-3 bg-white hover:bg-cyan-600 text-black font-semibold rounded-full shadow-lg transition-transform hover:scale-105">
          Explore Now
        </Link>

        {/* Floating Glow Effects */}
        <div className="absolute top-5 left-10 w-20 h-20 bg-cyan-400 opacity-20 blur-2xl rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-blue-500 opacity-30 blur-2xl rounded-full animate-pulse"></div>
      </section>
      <Categories />
      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-xl font-semibold text-gray-400 animate-pulse">Loading products...</p>
        </div>
      ) : (
        /* Products Grid Section */
        <div className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-center mb-10 text-gray-100">
            Elevate Your Desk Game ✨
          </h2>
          <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {productsData.map((product) => (
              <div
                key={product._id}
                className="relative bg-gray-900 rounded-xl shadow-lg border border-gray-700 transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-2xl overflow-hidden"
                onClick={() => childToParent(product)}
              >
                <Link to="/About" className="block">
                  <div className="relative overflow-hidden h-60 bg-gray-800 flex items-center justify-center">
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
                    <p className="text-cyan-400 font-bold text-lg mt-2">
                      ₹{product.price}
                    </p>
                  </div>
                </Link>

                {/* Subtle Floating Glow */}
                <div className="absolute -top-2 -left-2 w-10 h-10 bg-blue-500 opacity-30 blur-lg rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -right-2 w-14 h-14 bg-cyan-500 opacity-30 blur-lg rounded-full animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      )}


    </div>
  );
};

export default Desksupply;
