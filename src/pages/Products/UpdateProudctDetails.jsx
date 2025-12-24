import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({

        name: "",
        price: "",
        description: "",
        category: "",
        productImage: null,
    });

    const [message, setMessage] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0],
          }); 
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("price", formData.price);
        data.append("description", formData.description);
        data.append("category", formData.category);
        data.append("productImage", formData.productImage); 
        

        try {
            const response = await axios.post(
                `http://localhost:8000/api/v1/product/updateProduct/${id}`,
                data,
                {
                  withCredentials: true,
                    },
                
            );

            setMessage("Product updated successfully!");
        } catch (error) {
            setMessage(error.response?.data?.message || "Error updating product");
            console.error("Error updating product:", error);
        }
    };

    return (
        <div>
            <h2>Update Product</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={formData.category}
                    onChange={handleChange}
                />
                <input
                    type="file"
                    name="productImage"
                    onChange={handleFileChange}
                    
                />
                <button type="submit">Update Product</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default UpdateProduct;
