import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import UserContext from "../../context/UserContext";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { userDetail } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar w-full text-white bg-gradient-to-r from-slate-800 to-blue-600 h-20 px-6">
      <div className="flex w-full items-center justify-between h-full">
        {/* Logo */}
        <div className="text-pink-700 text-2xl lg:text-3xl font-bold shadow-lg">
          Parmarth E-Com
        </div>

        {/* Hamburger Menu for Mobile */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center absolute md:static top-20 left-0 w-full md:w-auto bg-slate-800 md:bg-transparent md:space-x-8 p-4 md:p-0 z-50`}
        >
          <ul className="flex flex-col md:flex-row w-full md:w-auto items-center">
            <li className="mx-3 text-md lg:text-xl font-semibold">
              <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
            </li>
            <li className="mx-3 text-md lg:text-xl font-semibold">
              <Link to="/Aboutus" onClick={() => setMenuOpen(false)}>About Us</Link>
            </li>
          </ul>

          {/* Search Bar */}
          <div className="mt-3 md:mt-0">
            <SearchBar />
          </div>
        </div>

        {/* Cart and User Section */}
        <div className="flex items-center">
          <button className="text-white mr-4 lg:text-xl text-md p-1 px-3 rounded-2xl bg-pink-700">
            <Link to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </button>

          {userDetail && userDetail.data && userDetail.data.user ? (
            <Link to="/user">
              <img
                className="w-10 h-10 rounded-full"
                src={userDetail.data.avatar || userDetail.data.user.avatar}
                alt="User Avatar"
              />
            </Link>
          ) : (
            <button className="text-green-400 text-md font-bold px-2 rounded-md">
              <Link to="/register">Login/Register</Link>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
