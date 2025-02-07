import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Desksupply = () => {
  const { childToParent } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  // Fetch product details from the API
  const getProductDetail = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/product/DeskSupplies`
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
      {/* Header Section */}
      <section className="relative bg-gradient-to-r from-orange-500 via-red-500 to-yellow-500 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            Discover Top-Quality Desk Supplies
          </h1>
          <p className="text-lg text-gray-100 mb-6">
            Keep your workspace organized and efficient with our desk supplies.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white text-red-600 py-3 px-6 rounded-full shadow-lg hover:bg-gray-200 transition"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Products Grid Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:gap-8 gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl shadow-lg border border-gray-200 transition-shadow duration-300 transform hover:shadow-2xl hover:-translate-y-2 hover:scale-105"
              onClick={() => childToParent(product)}
            >
              <Link to="/About" className="block">
                <div className="relative overflow-hidden lg:h-72 h-auto bg-gray-100 rounded-t-xl">
                  <img
                    src={product.ProductImage}
                    alt={product.name}
                    className="lg:w-full lg:h-full w-auto h-auto object-cover transition-transform duration-500 ease-in-out transform hover:rotate-2 hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-gray-900 lg:font-semibold lg:text-lg font-bold text-xs md:text-xl text-center truncate">
                    {product.name}
                  </h3>

                  <p className="text-indigo-600 font-bold text-xl text-center lg:mt-3 mt-1">
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

export default Desksupply;
