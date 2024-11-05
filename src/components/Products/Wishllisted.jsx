import React, { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

const Wishlisted = () => {
  const { myWishlist, childToParent } = useContext(UserContext);

  return (
    <div className="m-4 p-4 bg-gray-300 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        My Wishlists
      </h2>
      {myWishlist && myWishlist.length > 0 ? (
        <ul className="space-y-4">
          {myWishlist.map((order) => (
            <li
              key={order._id}
              className="bg-green-100 rounded-lg shadow-md p-6"
            >
              {/* <div className="mb-4">
                <span className="text-sm text-gray-500">
                  <strong>
                    Order Date: {new Date(order.createdAt).toLocaleDateString()}
                  </strong>
                </span>
              </div> */}
              {/* Iterate over the items of each myWishlist order */}
              {order.items.map((item) => (
                <div
                  key={item._id}
                  className="border-b-2 border-gray-200 py-4 grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
                  onClick={() => childToParent(item)}
                >
                  <Link to="/About">
                    <div className="md:col-span-2">
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        {item.productId.name}
                      </h3>
                      <div className="text-gray-600">
                        <span className="block">
                          <strong>Quantity:</strong> {item.quantity}
                        </span>
                        <span className="block">
                          <strong>Price:</strong> {item.productId.price}₹
                        </span>
                      </div>
                    </div>
                    <img
                      src={item.productId.ProductImage}
                      alt={item.productId.name}
                      className="w-full h-44 object-contain rounded-md"
                    />
                  </Link>
                </div>
              ))}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-600">
          No items in your myWishlist.
        </p>
      )}
    </div>
  );
};

export default Wishlisted;
