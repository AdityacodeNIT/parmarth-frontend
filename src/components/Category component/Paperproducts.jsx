import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../../context/UserContext";
import Categories from "../Products/Categories";

const Paperproducts = () => {
  const { childToParent } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const getProductDetail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/PaperProduct`
      );
      if (response) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-teal-500 via-green-500 to-teal-300 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Premium Paper Products for Every Need
          </h1>
          <p className="text-lg text-gray-100">
            Discover high-quality paper products that make every task easier.
          </p>
          <Link
            to="/shop"
            className="inline-block mt-6 bg-white text-teal-600 py-3 px-6 rounded-full shadow-lg hover:bg-gray-200 transition"
          >
            Browse Paper Products
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <Categories />

      {/* Product Grid */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 transition-shadow duration-300 transform hover:shadow-2xl hover:-translate-y-2 hover:scale-105"
              onClick={() => childToParent(product)}
            >
              <Link to="/About" className="block">
                <div className="relative overflow-hidden bg-gray-100 rounded-t-xl h-44 sm:h-52 md:h-60 lg:h-72">
                  <img
                    src={product.ProductImage}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 ease-in-out transform hover:rotate-2 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-gray-900 font-semibold text-sm sm:text-lg md:text-xl text-center truncate">
                    {product.name}
                  </h3>
                  <p className="text-teal-600 font-bold text-base sm:text-xl text-center mt-2">
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

export default Paperproducts;
