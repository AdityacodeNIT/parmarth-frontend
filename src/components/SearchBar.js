import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext.js";

const SearchBar = () => {
  const { handleSearch } = useContext(UserContext);
  const [query, setQuery] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const executeSearch = () => {
    if (query.trim()) {
      handleSearch(query);
    }
  };

  return (
    <div className="flex items-center bg-white rounded-full shadow-lg p-2 w-72 lg:w-96">
      <input
        type="text"
        name="search"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for products..."
        className="bg-transparent w-full px-4 py-2 focus:outline-none text-gray-700 font-bold"
      />
      <button
        onClick={executeSearch}
        className="bg-blue-600 text-white rounded-full px-4 py-2 hover:bg-blue-700 transition duration-300"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
