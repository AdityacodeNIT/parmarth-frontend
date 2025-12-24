import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import axios from "axios";
import { useSelector } from "react-redux";

const UserContextProvider = ({ children }) => {
  /* ---------- AUTH (READ ONLY from Redux) ---------- */
  const user = useSelector((state) => state.auth.user);
  const userId = user?.data?._id;

  /* ---------- SELLER STATE ---------- */
  const [sellerDetail, setSellerDetail] = useState(
    JSON.parse(localStorage.getItem("sellerdetails")) || null
  );

  const getSellerDetail = (selldetails) => {
    if (selldetails) {
      setSellerDetail(selldetails);
    } else {
      console.error("Invalid seller details");
    }
  };

  useEffect(() => {
    localStorage.setItem("sellerdetails", JSON.stringify(sellerDetail));
  }, [sellerDetail]);

  /* ---------- NOTIFICATION ---------- */
  const [notification, setNotification] = useState("");

  /* ---------- SEARCH STATE ---------- */
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = (query) => {
    setSearchResult(query.result);
  };

  /* ---------- PROVIDER ---------- */
  return (
    <UserContext.Provider
      value={{
        notification,
        handleSearch,
        searchResult,
        sellerDetail,
        getSellerDetail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
