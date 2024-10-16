import React, { useEffect, useState, useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Categories from "../Categories";

const Reusable = () => {
  const { childToParent } = useContext(UserContext);
  const [products, setProducts] = useState([]);

  const getProductDetail = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/Reusable`
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
      <Categories />

      <div className="productlist1 mx-10">
        <ul className="flex flex-wrap justify-center">
          {products.map((product) => (
            <li key={product.id} className="m-4">
              <div
                className="relative bg-green-300 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105 w-60 h-96"
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

export default Reusable;
