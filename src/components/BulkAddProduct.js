import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BulkAddProduct = () => {
  const [ProductData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    ProductImage: null,
    Category: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setProductData({
      ...ProductData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setProductData({
      ...ProductData,
      [e.target.name]: e.target.files[0],
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", ProductData.name);
    formDataToSend.append("price", ProductData.price);
    formDataToSend.append("description", ProductData.description);
    formDataToSend.append("ProductImage", ProductData.ProductImage);
    formDataToSend.append("Category", ProductData.Category);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/product/addProduct",
        formDataToSend
      );

      if (response) {
        console.log("Product added Succesfully");
        //  navigate("/writing");
      }
    } catch (error) {
      console.error(error, "Problem in adding product");
    }
  };
  return (
    <div>
      <div>
        Bulk Product add
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <input
            type="text"
            name="name"
            placeholder="Enter products name"
            value={ProductData.name}
            onChange={handleInputChange}
            className=" mt-3 border-2 border-cyan-600 w-full p-3 rounded-md"
          />
          <input
            type="text"
            name="price"
            placeholder="Enter product's Price"
            value={ProductData.price}
            onChange={handleInputChange}
            className=" mt-3 border-2 border-cyan-600 w-full p-3 rounded-md"
          />
          <input
            type="text"
            name="description"
            placeholder="Enter product's Description"
            value={ProductData.description}
            onChange={handleInputChange}
            className=" mt-3 border-2 border-cyan-600 w-full p-3 rounded-md"
          />
          <select
            name="Category"
            value={ProductData.Category}
            onChange={handleInputChange}
            className=" mt-3 border-2 border-cyan-600 w-full p-3 rounded-md"
          >
            <option value="">Select a category</option>
            <option value="Writing">Writing</option>
            <option value="Paper">Paper</option>
            <option value="DeskSupplies">DeskSupplies</option>
            <option value="Filling">Filling</option>
            <option value="Reusable">Reusable</option>
          </select>
          <input
            type="file"
            name="ProductImage"
            placeholder="Enter products name"
            onChange={handleFileChange}
            required
            className=" mt-3 border-2 border-cyan-600 w-full p-3 rounded-md"
          />
          <button
            type="submit"
            className="border-2 bg-blue-600 mt-3 text-white p-2 ml-4"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default BulkAddProduct;
