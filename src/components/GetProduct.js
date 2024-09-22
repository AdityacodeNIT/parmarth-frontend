import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

const GetProduct = async () => {
  const { getProductDetail } = useContext(UserContext);

  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/product/getProduct"
    );
    if (response) {
      getProductDetail(response);
    }
    // Optionally, you can redirect the user to another page after successful registration
  } catch (error) {
    console.error("Failed to register", error);
    // Handle error here - display error message to the user or perform other actions
  }
  return <div></div>;
};
export default GetProduct;
