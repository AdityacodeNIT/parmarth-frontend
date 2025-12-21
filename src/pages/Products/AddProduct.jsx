import axios from "axios";
import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";

const allPossibleAttributes = [
  "length", "breadth", "height", "weight",
  "memory", "batteryLife", "screenSize", "connectivity",
  "inkColor", "refillable"
];

const AddProduct = () => {
  const [ProductData, setProductData] = useState({
    name: "",
    price: "",
    description: "",
    Category: "",
    stocks: "",
    ProductImage: null
  });

  const [message, setMessage] = useState("");
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [selectedAttribute, setSelectedAttribute] = useState("");

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const navigate = useNavigate();

  const fetchAIResponse = async (prompt) => {
    try {
      const response = await model.generateContent(prompt);
      return await response.response.text();
    } catch (error) {
      console.error("Gemini API error:", error);
      return "";
    }
  };

  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    setProductData({ ...ProductData, [name]: value });

    if (name === "name") {
      const descriptionPrompt = `Generate a concise and engaging product description for a "${value}" in an e-commerce store. Provide at least 150 words.`;

      const generatedDescription = await fetchAIResponse(descriptionPrompt);

      setProductData((prev) => ({
        ...prev,
        description: generatedDescription.trim(),
      }));
    }
  };

  const handleFileChange = (e) => {
    setProductData({ ...ProductData, ProductImage: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      Object.keys(ProductData).forEach((key) => {
        if (
          ProductData[key] &&
          (selectedAttributes.includes(key) ||
            ["name", "price", "Category", "description", "stocks", "ProductImage"].includes(key))
        ) {
          formDataToSend.append(key, ProductData[key]);
        }
      });

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product/addProduct`,
        formDataToSend,
        { withCredentials: true }
      );

      setMessage("Product added successfully!");
      setProductData({ name: "", price: "", description: "", Category: "", stocks: "", ProductImage: null });
      setSelectedAttributes([]);

    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Failed to add product.");
    }
  };

  const addManualAttribute = () => {
    if (selectedAttribute && !selectedAttributes.includes(selectedAttribute)) {
      setSelectedAttributes([...selectedAttributes, selectedAttribute]);
    }
    setSelectedAttribute("");
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl bg-card shadow-lg border border-border mt-6">
      <h2 className="text-2xl font-bold mb-4 text-primary">Add New Product</h2>

      {message && (
        <p className="text-green-600 font-semibold mb-3">
          {message}
        </p>
      )}

      <form onSubmit={handleFormSubmit} className="space-y-5">

        {/* Product Name */}
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={ProductData.name}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg border bg-background text-foreground outline-ring/50"
        />

        {/* Price */}
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={ProductData.price}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg border bg-background text-foreground outline-ring/50"
        />

        {/* Stocks */}
        <input
          type="text"
          name="stocks"
          placeholder="Stocks"
          value={ProductData.stocks}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg border bg-background text-foreground outline-ring/50"
        />

        {/* Category */}
        <select
          name="Category"
          value={ProductData.Category}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg border bg-background text-foreground outline-ring/50"
        >
          <option value="">Select Category</option>
          <option value="Writing">Writing</option>
          <option value="Paper">Paper</option>
          <option value="DeskSupplies">Desk Supplies</option>
          <option value="Filing">Filing</option>
          <option value="Reusable">Reusable</option>
          <option value="TechStationery">Tech Stationery</option>
        </select>

        {/* Attribute Selector */}
        <div className="flex gap-3 items-center">
          <select
            value={selectedAttribute}
            onChange={(e) => setSelectedAttribute(e.target.value)}
            className="p-3 rounded-lg border bg-background text-foreground outline-ring/50"
          >
            <option value="">Select attribute</option>
            {allPossibleAttributes.map((attr) => (
              <option key={attr} value={attr}>{attr}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={addManualAttribute}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground"
          >
            Add
          </button>
        </div>

        {/* Attribute Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {selectedAttributes.map((attr) => (
            <input
              key={attr}
              name={attr}
              placeholder={`Enter ${attr}`}
              value={ProductData[attr] || ""}
              onChange={handleInputChange}
              className="p-3 rounded-lg border bg-background text-foreground outline-ring/50"
            />
          ))}
        </div>

        {/* File Upload */}
        <input
          type="file"
          name="ProductImage"
          onChange={handleFileChange}
          className="w-full p-3 rounded-lg border bg-background text-foreground outline-ring/50"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Product description"
          rows="5"
          value={ProductData.description}
          onChange={handleInputChange}
          className="w-full p-3 rounded-lg border bg-background text-foreground outline-ring/50"
        ></textarea>

        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-md hover:opacity-90 transition"
        >
          Add Product
        </button>

      </form>
    </div>
  );
};

export default AddProduct;
