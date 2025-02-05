import React, { useState,useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../context/UserContext";




const Home = () => {
    const [products, setProducts] = useState([]);
    const { childToParent } = useContext(UserContext);

const getTrendingProductDetail = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/api/v1/product/getTrendingProduct`
    );
    if (response) {
      setProducts(response.data);
    }
  } catch (error) {
    console.error("Failed to fetch products", error);
  }
};

useEffect(() => {
  getTrendingProductDetail();
}, []);
  return (
    <div className="w-full">
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] bg-cover bg-center flex items-center justify-center text-white text-center px-6" 
           style={{ backgroundImage: "url('https://plus.unsplash.com/premium_photo-1663956066898-282c7609afc9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHN0YXRpb25hcnl8ZW58MHx8MHx8fDA%3D')" }}>
        <div className="bg-black bg-opacity-50 p-6 rounded-lg">
          <h1 className="text-4xl md:text-6xl font-bold">Your One-Stop Stationery Store</h1>
          <p className="mt-4 text-lg md:text-xl">
            Get the best writing instruments, paper products, and office supplies delivered to your door.
          </p>
          <Link to="/shop">
            <button className="mt-6 bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-full text-lg font-semibold flex items-center gap-2">
              Shop Now <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </Link>
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {[
            { name: "Writing Instruments", img: "https://files.oaiusercontent.com/file-LX9emr9rUVZNHbsfaizQVW?se=2025-01-30T13%3A31%3A50Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D4e6cc9b5-e634-4b32-a86a-f208fc5259ce.webp&sig=GXqgagRbJneBhlhHsklu2kRVsBBgoN4/ZPQK87hS8yQ%3D" },
            { name: "Paper Products", img: "https://files.oaiusercontent.com/file-DAShraupvJZZF4CBBpJUXC?se=2025-01-30T13%3A32%3A54Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3De00cc79d-8663-4763-bf15-199e58b96d54.webp&sig=8tJXm33NgteM%2BeO1bHv6/QhltsZwyiQo8uNkGQN8wOs%3D" },
            { name: "Desk Supplies", img: "https://files.oaiusercontent.com/file-BwY4n6kYKRTaEFT2k34oq5?se=2025-01-30T13%3A34%3A23Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3Df1617b28-099d-454b-8bb9-ccd35ed88479.webp&sig=wx7ANeSc9C//3OvsvgBsth0aGxqpzAemcLT4eB9Kh3I%3D" },
            { name: "Filing & Storage", img: "https://files.oaiusercontent.com/file-J9oodcPMb8GWREmJAsKSC8?se=2025-01-30T13%3A36%3A20Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D17466555-7717-4b44-a52c-0b924c228508.webp&sig=Zhk1JQoBq10ZvDsTuKpP7ohrJjGmj7pBqvE8eAgGMkA%3D" },
            { name: "Reusable Products", img: "https://files.oaiusercontent.com/file-RSbjkT7tdojM1rgDZdEGUN?se=2025-01-30T13%3A36%3A57Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D4d2b97ee-3d59-4ff0-893f-decd6fd39ccc.webp&sig=X4lNdi4OV69t%2BidIkuK1KIX7X3RNd62dndewTCpzc%2BU%3D" },
          ].map((category, index) => (
            <Link to={`/${category.name.replace(/\s+/g, '')}`} key={index}>
              <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
                <img src={category.img} alt={category.name} className="w-full h-32 object-cover" />
                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-12 bg-gray-100 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">Trending Now</h2>
           <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 hover:scale-105 border border-gray-200"
                      onClick={() => childToParent(product)}
                    >
                      <Link to="/About" style={{ textDecoration: "none" }}>
                        <div className="relative overflow-hidden h-44 bg-gray-100 rounded-t-xl">
                          <img
                            src={product.ProductImage}
                            alt={product.name}
                            className="w-full h-full object-contain transition-transform duration-500 ease-in-out transform hover:rotate-2 hover:scale-105"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="text-gray-900 font-semibold text-lg md:text-xl text-center truncate">
                            {product.name}
                          </h3>
        
                          <p className="text-teal-600 font-bold text-xl text-center mt-3">
                            ₹{product.price}
                          </p>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
      </div>

      {/* Newsletter Signup */}
      <div className="py-12 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-center">
        <h2 className="text-3xl font-bold">Subscribe for Updates</h2>
        <p className="mt-3">Get the latest offers and new arrivals straight to your inbox.</p>
        <div className="mt-4 flex justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="p-3 rounded-l-lg w-64 text-black"
          />
          <button className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-r-lg font-semibold">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
