import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { SetSearchResults } from "@/features/search/searchslice.jsx";
import { productAPI } from "@/api/productAPi";

const SearchBar = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [query, setQuery] = useState("");

  const executeSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await productAPI.search({ name: query });

      dispatch(SetSearchResults(res.data));
      navigate("/searchResult") // ✅ Redux replaces childToParent
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  return (
    <div className="flex items-center bg-background text-foreground rounded-full shadow-md px-3 py-2 w-64 md:w-72">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for products..."
        className="bg-transparent w-full px-1 md:px-3 py-1 md:py-2 focus:outline-hidden"
      />

        <button
          onClick={executeSearch}
          className="rounded-full px-3 md:px-4 py-1 md:py-2 text-sm font-semibold transition-colors hover:text-primary"
        >
          Search
        </button>

    </div>
  );
};

export default SearchBar;
