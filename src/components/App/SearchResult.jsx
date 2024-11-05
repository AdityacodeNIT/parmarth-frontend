import React, { useContext } from "react";
import UserContext from "../../context/UserContext.jsx"; // Import context
import { Link } from "react-router-dom";

const SearchResult = () => {
  const { searchResult, childToParent } = useContext(UserContext); // Access the search result from context

  return (
    <div>
      <h1>Search Results</h1>
      {searchResult.length > 0 ? (
        <ul>
          {searchResult.map((product) => (
            <Link to="/About">
              <li
                key={product._id}
                className="border p-4 mb-4 shadow-sm rounded-lg"
                onClick={() => childToParent(product)}
              >
                <h2 className="font-bold text-lg">{product.name}</h2>
                {/* <p className="text-gray-600">{product.description}</p> */}
                <p className="text-green-600 font-semibold">
                  Price: ₹{product.price}
                </p>
                <img
                  src={product.ProductImage}
                  alt={product.name}
                  className="mt-2 w-32 h-auto"
                />
              </li>
            </Link>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

export default SearchResult;
