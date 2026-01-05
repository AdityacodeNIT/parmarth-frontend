import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

/* -----------------------------
   CONSTANTS
----------------------------- */

const CATEGORIES = [
  "Healthy Snacks",
  "Beverages",
  "Low Sugar Choices",
  "High Fibre Foods",
  "Daily Essentials",
];

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  /* -----------------------------
     STATE (MATCHES BACKEND SCHEMA)
  ----------------------------- */

  const [product, setProduct] = useState({
    name: "",
    price: "",
    stocks: "",
    Category: "",
    brand: "",
    description: "",
    ProductImage: null,
    images: [],
    ingredients: "",

    nutrition: {
      energy: {
        calories: "",
      },
      macros: {
        protein: "",
        carbs: "",
        sugar: "",
        fat: "",
        fibre: "",
      },
      micros: {
        vitamins: {
          vitaminA: "",
          vitaminB12: "",
          vitaminC: "",
          vitaminD: "",
          vitaminE: "",
          vitaminK: "",
        },
        minerals: {
          sodium: "",
          calcium: "",
          iron: "",
          potassium: "",
          magnesium: "",
          zinc: "",
        },
      },
    },

    dietary: {
      isVegan: false,
      isVegetarian: false,
      isGlutenFree: false,
      isSugarFree: false,
      isKetoFriendly: false,
    },
  });

  /* -----------------------------
     AI DESCRIPTION
  ----------------------------- */

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const generateDescription = async () => {
    if (!product.name) return;
    setLoading(true);
    try {
      const prompt = `Write a clean, honest product description for a healthy food item named "${product.name}". Include benefits and usage.`;
      const res = await model.generateContent(prompt);
      setProduct((p) => ({ ...p, description: res.response.text() }));
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
     HANDLERS
  ----------------------------- */

  const handleChange = (e) => {
    setProduct((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  /* Energy */
  const handleEnergyChange = (e) => {
    setProduct((p) => ({
      ...p,
      nutrition: {
        ...p.nutrition,
        energy: {
          ...p.nutrition.energy,
          [e.target.name]: e.target.value,
        },
      },
    }));
  };

  /* Macros */
  const handleMacroChange = (e) => {
    setProduct((p) => ({
      ...p,
      nutrition: {
        ...p.nutrition,
        macros: {
          ...p.nutrition.macros,
          [e.target.name]: e.target.value,
        },
      },
    }));
  };

  /* Vitamins */
  const handleVitaminChange = (e) => {
    setProduct((p) => ({
      ...p,
      nutrition: {
        ...p.nutrition,
        micros: {
          ...p.nutrition.micros,
          vitamins: {
            ...p.nutrition.micros.vitamins,
            [e.target.name]: e.target.value,
          },
        },
      },
    }));
  };

  /* Minerals */
  const handleMineralChange = (e) => {
    setProduct((p) => ({
      ...p,
      nutrition: {
        ...p.nutrition,
        micros: {
          ...p.nutrition.micros,
          minerals: {
            ...p.nutrition.micros.minerals,
            [e.target.name]: e.target.value,
          },
        },
      },
    }));
  };

  const handleDietaryToggle = (key) => {
    setProduct((p) => ({
      ...p,
      dietary: { ...p.dietary, [key]: !p.dietary[key] },
    }));
  };

  const handleMainImageChange = (e) => {
    setProduct((p) => ({ ...p, ProductImage: e.target.files[0] }));
  };

  const handleGalleryImagesChange = (e) => {
    setProduct((p) => ({ ...p, images: Array.from(e.target.files) }));
  };

  /* -----------------------------
     SUBMIT
  ----------------------------- */

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("stocks", product.stocks);
      formData.append("Category", product.Category);
      formData.append("brand", product.brand);
      formData.append("description", product.description);

      formData.append("productImage", product.ProductImage);
      product.images.forEach((img) => formData.append("images", img));

      formData.append(
        "ingredients",
        product.ingredients.split(",").map((i) => i.trim())
      );

      formData.append("nutrition", JSON.stringify(product.nutrition));
      formData.append("dietary", JSON.stringify(product.dietary));

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product/addProduct`,
        formData,
        { withCredentials: true }
      );

      toast.success("Product added successfully");
      navigate("/seller");
    } catch (err) {
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  /* -----------------------------
     UI
  ----------------------------- */

  return (
    <Card className="max-w-4xl mx-auto my-8">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">

          <Input name="name" placeholder="Product name" onChange={handleChange} />
          <Input name="brand" placeholder="Brand" onChange={handleChange} />

          <div className="grid grid-cols-3 gap-4">
            <Input name="price" type="number" placeholder="Price" onChange={handleChange} />
            <Input name="stocks" type="number" placeholder="Stocks" onChange={handleChange} />
            <select name="Category" onChange={handleChange} className="border rounded px-2">
              <option value="">Category</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <Textarea
            name="ingredients"
            placeholder="Ingredients (comma separated)"
            onChange={handleChange}
          />

          {/* Energy */}
          <Input
            name="calories"
            type="number"
            placeholder="Calories"
            onChange={handleEnergyChange}
          />

          {/* Macros */}
          <div className="grid grid-cols-3 gap-4">
            {["protein", "carbs", "sugar", "fat", "fibre"].map((m) => (
              <Input
                key={m}
                name={m}
                type="number"
                placeholder={m}
                onChange={handleMacroChange}
              />
            ))}
          </div>

          {/* Vitamins */}
          <h4 className="font-semibold">Vitamins (%)</h4>
          <div className="grid grid-cols-3 gap-4">
            {["vitaminA", "vitaminB12", "vitaminC", "vitaminD", "vitaminE", "vitaminK"].map(
              (v) => (
                <Input
                  key={v}
                  name={v}
                  type="number"
                  placeholder={v}
                  onChange={handleVitaminChange}
                />
              )
            )}
          </div>

          {/* Minerals */}
          <h4 className="font-semibold">Minerals</h4>
          <div className="grid grid-cols-3 gap-4">
            {["sodium", "calcium", "iron", "potassium", "magnesium", "zinc"].map((m) => (
              <Input
                key={m}
                name={m}
                type="number"
                placeholder={m}
                onChange={handleMineralChange}
              />
            ))}
          </div>

          {/* Dietary */}
          <div className="flex flex-wrap gap-4">
            {Object.keys(product.dietary).map((d) => (
              <div key={d} className="flex items-center gap-2">
                <Checkbox
                  checked={product.dietary[d]}
                  onCheckedChange={() => handleDietaryToggle(d)}
                />
                <span>{d.replace("is", "")}</span>
              </div>
            ))}
          </div>

          <Input type="file" onChange={handleMainImageChange} />
          <Input type="file" multiple onChange={handleGalleryImagesChange} />

          <Textarea
            name="description"
            placeholder="Description"
            value={product.description}
            onChange={handleChange}
          />

          <Button type="button" variant="outline" onClick={generateDescription}>
            Generate with AI
          </Button>

          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Product"}
          </Button>

        </form>
      </CardContent>
    </Card>
  );
};

export default AddProduct;
