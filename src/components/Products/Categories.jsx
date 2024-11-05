import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className="bg-cream-500">
      <nav className="flex flex-wrap justify-around items-center h-14 border-b-4 border-pink-400 text-lg bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700 lg:font-semibold text-white">
        <div className="font-bold text-xl mt-2">Categories</div>
        <div className="p-2 hover:border-2 hover:bg-red-200">
          <Link to="/Writing">Writing Instruments</Link>
        </div>
        <div className="p-2 hover:border-2 hover:bg-red-200">
          <Link to="/PaperProduct">Paper Products</Link>
        </div>
        <div className="p-2 hover:border-2 hover:bg-red-200">
          <Link to="/DeskSupply">Desk Supplies</Link>
        </div>
        <div className="p-2 hover:border-2 hover:bg-red-200">
          <Link to="/Filling">Filling and Storage</Link>
        </div>
        <div className="p-2 hover:border-2 hover:bg-red-200">
          <Link to="/Reusable">Reusable</Link>
        </div>
      </nav>
    </div>
  );
};

export default Categories;
