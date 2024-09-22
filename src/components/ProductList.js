import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
//import productsData from "./products.json";
import UserContext from "../context/UserContext";
import Categories from "./Categories";
import ImageSlider from "./ImageSlider";
const ProductList = () => {
  const { childToParent } = useContext(UserContext);

  const [productsData, setProductsData] = useState([]);
  const getProductDetail = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/v1/product/getProduct"
      );
      if (response) {
        setProductsData(response.data);
      }
    } catch (error) {
      console.error("Failed to register", error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, []);
  return (
    <div>
      <Categories />
      {/* <ImageSlider /> */}

      <div className="productlist1    bg-gray-100 text-white ">
        <ul className="justify-center">
          {productsData.map((product) => (
            <li key={product._id}>
              <div
                className=" border-10 rounded-sm b bg-teal-600 px-4 py-4 lg:w-60 m-4 lg:h-96 h-64 w-36  object-contain border-2  mx-3  "
                onClick={() => childToParent(product)}
              >
                <Link to={"/About"} style={{ textDecoration: "none" }}>
                  <img
                    src={product.ProductImage}
                    alt={product.name}
                    className=" lg:w-48 lg:h-48  w-24 h-24"
                  />
                  <div className=" p-2 mt-4 lg:h-24 ">
                    <div className="mt-2 font-semibold lg:text-lg text-sm text-center">
                      {product.name}
                    </div>
                    <div className="font-semibold lg:text-lg text-xs text-center">
                      {" "}
                      Price:{product.price}₹
                    </div>
                  </div>
                  {/* <div>Description: {product.description}</div> */}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductList;
