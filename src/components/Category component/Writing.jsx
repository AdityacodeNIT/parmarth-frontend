import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Categories from "../Products/Categories";

const Writing = () => {
  const { childToParent } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const getProductDetail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/WritingProduct`
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-400 to-blue-600 py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            Explore Our Writing Products
          </h1>
          <p className="text-lg max-w-2xl mx-auto mb-6">
            Discover a wide range of writing tools designed to inspire creativity
            and enhance productivity. Whether you're a student, professional, or
            simply love to write, we have something for you!
          </p>
          <Link
            to="/products"
            className="inline-block bg-white text-blue-600 font-bold px-6 py-3 rounded-full shadow-lg hover:bg-gray-200 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <Categories />

      {/* Product List */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative bg-white rounded-xl shadow-lg border border-gray-200 transition-shadow duration-300 transform hover:shadow-2xl hover:-translate-y-2 hover:scale-105"
              onClick={() => childToParent(product)}
            >
              <Link to="/About" className="block">
                <div className="relative overflow-hidden bg-gray-100 rounded-t-xl h-64">
                  <img
                    src={product.ProductImage}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 ease-in-out transform hover:rotate-2 hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="text-gray-900 font-semibold text-lg truncate">
                    {product.name}
                  </h3>
                  <p className="text-blue-600 font-bold text-lg mt-2">
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

export default Writing;
