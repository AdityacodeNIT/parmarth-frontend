// Tailwind v4-optimized SearchBar.jsx
import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../context/UserContext.jsx";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const { handleSearch } = useContext(UserContext);
  const [query, setQuery] = useState("");

  const executeSearch = async () => {
    if (!query.trim()) return;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/product/searchProduct`,
        { name: query }
      );
      handleSearch(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div className="flex items-center bg-background text-foreground rounded-full shadow-md px-3 py-2 w-64 md:w-72">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="bg-transparent w-full px-1 md:px-3 py-1 md:py-2 focus:outline-hidden "
      />

      <Link to="/searchResult">
        <button
          onClick={executeSearch}
          className=" rounded-full px-3 md:px-4 py-1 md:py-2 text-sm font-semibold   transition-colors hover:text-primary"
        >
          Search
        </button>
      </Link>
    </div>
  );
};

export default SearchBar;