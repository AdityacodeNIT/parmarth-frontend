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
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-20 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold mb-4">
          Explore Our Writing Products
        </h1>
        <p className="text-lg text-center max-w-xl mb-6">
          Discover a wide range of writing tools designed to inspire creativity
          and enhance productivity. Whether you're a student, a professional, or
          just someone who loves to write, we have something for you!
        </p>
        <Link
          to="/products"
          className="bg-white text-blue font-bold px-6 py-2 rounded-full shadow-lg hover:bg-gray-200 transition"
        >
          Shop Now
        </Link>
      </div>

      <div className="productlist1 mx-10">
        <ul className="flex flex-wrap justify-center">
          {products.map((product) => (
            <li key={product.id} className="m-4">
              <div
                className="relative rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105 w-60 h-96"
                onClick={() => childToParent(product)}
              >
                <Link to="/About" style={{ textDecoration: "none" }}>
                  <div className="overflow-hidden h-72 rounded-t-lg">
                    <img
                      src={product.ProductImage}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-500 ease-in-out"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-gray-800 font-bold text-lg text-center truncate">
                      {product.name}
                    </h3>
                    <p className="text-gray-700 font-semibold text-center mt-2">
                      Price: ₹{product.price}
                    </p>
                  </div>
                </Link>

                
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Writing;
