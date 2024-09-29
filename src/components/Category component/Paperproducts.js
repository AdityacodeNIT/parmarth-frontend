import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";
import Categories from "../Categories";
import axios from "axios";

const Paperproducts = () => {
  const { childToParent } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const getProductDetail = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/product/PaperProduct"
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
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">
            Premium Paper Products for Every Need
          </h1>
          <p className="text-lg text-gray-100">
            Discover high-quality paper products that make every task easier.
          </p>
          <button className="mt-8 bg-white text-teal-600 py-3 px-6 rounded-full shadow-lg hover:bg-gray-200 transition">
            Browse Paper Products
          </button>
        </div>
      </section>

      {/* Product Categories */}
      <Categories />

      {/* Product Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 hover:scale-105 border border-gray-200"
              onClick={() => childToParent(product)}
            >
              <Link to="/About" style={{ textDecoration: "none" }}>
                <div className="relative overflow-hidden h-72 bg-gray-100 rounded-t-xl">
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
                  <p className="text-gray-700 text-center mt-2 text-sm">
                    {product.description || "No description available."}
                  </p>
                  <p className="text-teal-600 font-bold text-xl text-center mt-3">
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
