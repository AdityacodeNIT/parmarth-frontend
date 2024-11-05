import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

//import products from "razorpay/dist/types/products";

const BuyProduct = () => {
  const { addressDetails, totalProductPrice, productDesccription } =
    useContext(UserContext);

  return (
    <div>
      <h2 className="w-full h-20 text-black-200  text-2xl font-bold bg-slate-300 p-12 flex justify-center">
        CheckOut
      </h2>
      <div className="flex justify-between p-8 bg-pink-50 lg:mx-12 mx-8">
        <div className=" w-auto ">
          <div className="mx-2 border-4 p-4 w-full  border-slate-600 px-24 rounded-lg shadow-2xl bg-white  ">
            <div className="text-xl justify-center  items-center rounded-xl text-yellow-400 bg-slate-500 p-2 border-2 font-bold flex">
              TOTAL Bill For you{" "}
            </div>
            <div className="mt-4  border-blue-800">{productDesccription()}</div>
            <div className=" border-1 border-slate-300 flex justify-between  mt-2 p-2 font-semibold  text-xl rounded-xl ">
              <div> Subtotal</div> <div>{totalProductPrice()}</div>
            </div>
            <div className=" border-1 border-slate-300 flex  p-2 justify-between font-semibold text-xl rounded-xl ">
              <div>Applied Tax</div>{" "}
              <div>{Math.ceil(totalProductPrice() * 0.18)}</div>
            </div>
            <div className=" border-1 border-slate-300 flex justify-between p-2 font-semibold text-xl rounded-xl">
              <div>Total </div>
              {Math.ceil(totalProductPrice() * 0.18 + totalProductPrice())}
            </div>{" "}
            <Link to="/payments">
              <button
                className="border-2 type bg-yellow-600 shadow-2xl text-white px-4 py-4 w-full text-lg font-bold mt-4 rounded-lg"
                type="button"
              >
                Pay Now
              </button>{" "}
            </Link>
          </div>
        </div>
        <div>
          <div>
            <div className="w-full h-screen bg-gray-100 flex flex-col items-center">
              <p className="text-2xl font-semibold text-gray-800 bg-white p-8 rounded-lg shadow-lg mb-6">
                Address
              </p>
              <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-4 text-xl font-bold text-gray-800">
                  {addressDetails.name}
                </div>
                <div className="border-2 border-white-400 bg-gray-900 text-white p-8 rounded-lg shadow-xl">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-md md:text-lg">
                    <div>
                      <strong>Street Address:</strong>{" "}
                      {addressDetails.streetAddress}
                    </div>
                    <div>
                      <strong>City:</strong> {addressDetails.city}
                    </div>
                    <div>
                      <strong>State:</strong> {addressDetails.state}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm md:text-md">
                    <div>
                      <strong>Postal Code:</strong> {addressDetails.postalCode}
                    </div>
                    <div>
                      <strong>Phone:</strong> {addressDetails.phoneNumber}
                    </div>
                    <div>
                      <strong>Alternate Phone:</strong>{" "}
                      {addressDetails.alternateNumber}
                    </div>
                  </div>
                </div>
              </div>
              {addressDetails ? (
                <Link to="/addressUpdate">
                  {" "}
                  <button className=" w-auto border-2 mt-2 text-white  font-bold  text-md float-right bg-blue-900 p-4">
                    Change Address{" "}
                  </button>
                </Link>
              ) : (
                <button>
                  <Link to="/addressUpdate">Add Address</Link>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyProduct;
