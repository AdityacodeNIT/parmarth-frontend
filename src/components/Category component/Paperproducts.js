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
      // Optionally, you can redirect the user to another page after successful registration
    } catch (error) {
      console.error("Failed to register", error);
      // Handle error here - display error message to the user or perform other actions
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <div className=" bg-white text-white">
      <Categories />
      <div className="productlist1 mx-10">
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <div
                className="border-10 rounded-md border-indigo-600 bg-teal-400 px-4 py-4 w-60 m-4 h-96 object-contain  mx-3 shadow-2xx shadow-slate-400"
                onClick={() => childToParent(product)}
              >
                <Link to={"/About"} style={{ textDecoration: "none" }}>
                  <img
                    src={product.ProductImage}
                    alt={product.name}
                    className="product-img"
                  />

                  <div className="mt-2 font-bold text-lg text-center">
                    {" "}
                    {product.name}
                  </div>
                  <div className="font-semibold text-center">
                    {" "}
                    Price:{product.price}₹
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

export default Paperproducts;
