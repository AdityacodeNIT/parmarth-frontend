import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [ProductData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    ProductImage: null,
    Category: "",
    length: "", // Added for length
    breadth: "", // Added for breadth
    height: "", // Added for height
    weight: "",
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
    formDataToSend.append("stocks", ProductData.stocks);
    formDataToSend.append("length", ProductData.length); // Append length
    formDataToSend.append("breadth", ProductData.breadth); // Append breadth
    formDataToSend.append("height", ProductData.height); // Append height
    formDataToSend.append("weight", ProductData.weight);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product/addProduct`,
        formDataToSend
      );
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
            name="stocks"
            placeholder="Enter stocks"
            value={ProductData.stocks}
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
            type="text"
            name="length"
            placeholder="Enter length (in cm)"
            value={ProductData.length}
            onChange={handleInputChange}
            className=" mt-3 border-2 border-cyan-600 w-full p-3 rounded-md"
          />
          <input
            type="text"
            name="breadth"
            placeholder="Enter breadth (in cm)"
            value={ProductData.breadth}
            onChange={handleInputChange}
            className=" mt-3 border-2 border-cyan-600 w-full p-3 rounded-md"
          />
          <input
            type="text"
            name="height"
            placeholder="Enter height (in cm)"
            value={ProductData.height}
            onChange={handleInputChange}
            className=" mt-3 border-2 border-cyan-600 w-full p-3 rounded-md"
          />
          <input
            type="text"
            name="weight"
            placeholder="Enter weight (in kg)"
            value={ProductData.weight}
            onChange={handleInputChange}
            className=" mt-3 border-2 border-cyan-600 w-full p-3 rounded-md"
          />
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

export default AddProduct;
