import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Categories = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-cream-500">
      <nav className="flex flex-wrap justify-between items-center h-14 px-6 border-b-4 border-pink-400 text-lg bg-gradient-to-r from-blue-700 via-indigo-600 to-violet-700 lg:font-semibold text-white">
        {/* Title */}
        <div className="font-bold text-xl">Categories</div>

        {/* Hamburger Menu Button for Mobile */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        {/* Category Links */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row absolute md:static top-14 left-0 w-full md:w-auto bg-blue-700 md:bg-transparent z-50 md:space-x-6 text-center`}
        >
          <div className="p-2 hover:border-2 hover:bg-red-200">
            <Link to="/Writing" onClick={() => setMenuOpen(false)}>Writing Instruments</Link>
          </div>
          <div className="p-2 hover:border-2 hover:bg-red-200">
            <Link to="/PaperProduct" onClick={() => setMenuOpen(false)}>Paper Products</Link>
          </div>
          <div className="p-2 hover:border-2 hover:bg-red-200">
            <Link to="/DeskSupply" onClick={() => setMenuOpen(false)}>Desk Supplies</Link>
          </div>
          <div className="p-2 hover:border-2 hover:bg-red-200">
            <Link to="/Filling" onClick={() => setMenuOpen(false)}>Filling and Storage</Link>
          </div>
          <div className="p-2 hover:border-2 hover:bg-red-200">
            <Link to="/Reusable" onClick={() => setMenuOpen(false)}>Reusable</Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Categories;
