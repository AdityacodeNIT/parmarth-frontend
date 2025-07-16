import React, { useContext, useState } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext.jsx";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const { handleSearch } = useContext(UserContext);
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const executeSearch = async () => {
    if (query.trim()) {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/product/searchProduct`,
          { name: query }
        );

        handleSearch(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    }
  };

  return (
    <div className="flex items-center ml-4 mt-1 md:pt-0 bg-white rounded-full shadow-lg p-2 w-64 lg:w-72 text-black">
      <input
        type="text"
        name="search"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for products..."
        className="bg-transparent w-full  md:px-4 px-2 md:py-2 py-1 focus:outline-none text-black font-bold"
      />
      <Link to="/searchResult">
        <button
          onClick={executeSearch}
          className="bg-[#0c1524] text-[#facc15] rounded-full px-2 py-1 md:px-4 md:py-4 hover:bg-blue-700 transition duration-300"
        >
          Search
        </button>
      </Link>
    </div>
  );
};

export default SearchBar;
