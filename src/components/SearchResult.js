import React from "react";

const SearchResults = ({ results }) => {
  return (
    <div>
      {results.map((result) => (
        <div key={result.id}>{result.name}</div>
      ))}
    </div>
  );
};

export default SearchResults;
