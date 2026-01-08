// Tailwind v4-optimized Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";
import ThemeToggle from "@/components/Theme/ThemeToggle.jsx";
import { User } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, status } = useSelector((state) => state.auth);

  const avatar =
    user?.data?.avatar || user?.data?.avatar;

  const isAuthenticated = status === "authenticated";

  return (
    <nav
      className="
        sticky top-0 z-50
        w-full bg-background text-foreground
        h-12 md:h-16 px-6
        border-b border-border shadow-sm
        flex items-center hover:text-primary
      "
    >
      <div className="flex w-full items-center justify-between px-4">
        {/* Logo */}
        <div className="text-xl md:text-3xl font-extrabold tracking-tight select-none">
          Eat Healthy
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
        </button>

        {/* Navigation Menu */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } md:flex flex-col md:flex-row items-center absolute md:static top-16 left-0 w-full md:w-auto bg-zinc-800 md:bg-transparent p-4 md:p-0 z-40 space-y-6 md:space-y-0 md:space-x-8`}
        >
          <ul className="flex flex-col md:flex-row items-center gap-6 pt-3">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)} className="font-semibold text-lg">
                Home
              </Link>
            </li>
            <li>
              <Link to="/Aboutus" onClick={() => setMenuOpen(false)} className="font-semibold text-lg">
                About Us
              </Link>
            </li>
          </ul>

          {/* Search Bar */}
          <div className="w-full md:w-auto mx-2">
            <SearchBar />
          </div>
        </div>

        {/* Cart + User Section */}
        <div className="flex items-center gap-4">
          {/* Cart */}
          <Link to="/cart">
            <div className="lg:p-3 rounded-lg hover:text-primary transition text-lg">
              <FontAwesomeIcon icon={faShoppingCart} />
            </div>
          </Link>

          {/* User Avatar or Login */}
          {isAuthenticated ? (
            <Link to="/user">
              {avatar ? (
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="w-11 h-11 md:w-14 md:h-14 rounded-full border border-border object-cover hover:border-primary transition"
                />
              ) : (
                <div className="w-11 h-11 md:w-14 md:h-14 rounded-full border border-border flex items-center justify-center bg-muted">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </Link>
          ) : (
            <Link to="/register">
              <button className="border border-yellow-300 text-yellow-300 px-4 py-2 rounded-md font-semibold">
                Login / Register
              </button>
            </Link>
          )}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
