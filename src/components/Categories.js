import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  return (
    <div className=" bg-cream-500">
      <nav className="flex justify-evenly h-14  border-b-4 border-pink-300 text-lg bg-gradient-to-r from-purple-600 via-slate-600  to-gray-600  lg:font-semibold font-md text-white ">
        <div className="font-bold  lg:text-xl md:text-lg sm:text-md mt-2">
          Categories{" "}
        </div>
        <div className=" p-2 hover:border-2 hover:bg-red-200  displa ">
          <Link to="/Writing">Writing Instruments</Link>{" "}
        </div>
        <div className=" p-2 hover:border-4 hover:bg-red-200 border-slate-300 ">
          <Link to="/PaperProduct">Paper Products</Link>
        </div>
        <div className=" p-2 hover:border-4 hover:bg-red-200 border-slate-300 ">
          <Link to="/DeskSupply">Desk Supplies</Link>
        </div>
        <div className=" p-2 hover:border-4 hover:bg-red-200  border-slate-300 ">
          <Link to="/Filling">Filling and Storage</Link>
        </div>
        <div className=" p-2 hover:border-4 hover:bg-red-200 border-slate-300">
          <Link to="/Electronics">Reusable</Link>
        </div>
      </nav>
    </div>
  );
};

export default Categories;
