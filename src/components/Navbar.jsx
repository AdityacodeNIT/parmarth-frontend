import React from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { userDetail } = useContext(UserContext);
  return (
    <nav className="navbar w-full  text-white bg-gradient-to-r  from-slate-800 to-blue-600 h-20 mr-8">
      <div className="flex  w-full items-center justify-between ">
        <div className="text-pink-700 lg:text-3xl text-xl mb-2  font-bold shadow-lg ml-4">
          Parmarth E-Com
        </div>
        <div>
          <ul className="flex  w-full justify-evenly ml-16">
            <li className="mx-3 text-md lg:text-xl font-semibold">
              <Link to="/">Home</Link>{" "}
            </li>

            <li className="mx-3 ml-16 lg:text-xl text-md font-semibold">
              <Link to="/Aboutus">About Us</Link>{" "}
            </li>
          </ul>
        </div>

        <div>
          <SearchBar />
        </div>
        <div className="flex">
          <button className="text-white mr-8 lg:text-xl text-md  p-1 px-3 rounded-2xl  bg-pink-700">
            <Link to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} />
            </Link>
          </button>

          <div>
            {userDetail && userDetail.data && userDetail.data.user ? (
              <p>
                <Link to="/user">
                  {" "}
                  <img
                    className="w-10 h-10 rounded-full text-white"
                    src={userDetail.data.avatar || userDetail.data.user.avatar}
                    alt="image-path"
                  ></img>
                </Link>
              </p>
            ) : (
              <button className="text-green-400 mr-2 text-md text-bold px-2 rounded-md text-center pt-2 ">
                <Link to="/register">Login/Register</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
