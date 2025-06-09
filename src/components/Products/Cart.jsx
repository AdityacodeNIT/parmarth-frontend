import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    data,
    addToCart,
    removingElements,
    totalCartPrice,
    cartDesccription,
    childToParent,
  } = useContext(UserContext);

  return (
    <div className="bg-gray-900 min-h-screen p-4 md:p-8">
      <h2 className="text-center text-2xl md:text-4xl font-extrabold text-teal-400 mb-6">
        Shopping Cart
      </h2>

      {cartItems.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-xl md:text-3xl text-gray-400">
            Your cart is empty
          </p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Cart Items List */}
          <div className="flex-1 space-y-4">
            <div className="bg-gray-800 rounded-xl p-4 shadow-md">
              <h4 className="text-lg md:text-2xl font-semibold text-teal-400">
                Items ({cartItems.length})
              </h4>
            </div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                onClick={() => childToParent(item)}
                className="bg-gray-800 rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-lg hover:shadow-xl transition"
              >
                <Link to="/About" className="flex-shrink-0">
                  <img
                    src={item.imgLink || item.ProductImage}
                    alt={item.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
                  />
                </Link>
                <div className="flex-1 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center gap-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-100">
                      {item.name}
                    </h3>
                    <p className="text-gray-400 mt-1">
                      Price: <span className="text-teal-400">₹{item.price}</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => removingElements(item._id)}
                      className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                    >
                      -
                    </button>
                    <span className="text-lg text-gray-100">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => addToCart(data, item._id.toString())}
                      className="w-8 h-8 flex items-center justify-center bg-gray-700 rounded-lg hover:bg-gray-600 transition"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item._id.toString())}
                      className="ml-4 text-red-400 hover:text-red-500 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-1/3 bg-gray-800 rounded-2xl p-6 shadow-lg flex flex-col">
            <h4 className="text-xl md:text-2xl font-semibold text-center text-teal-400 mb-4">
              Order Summary
            </h4>
            <div className="flex-1 space-y-3">
              <p className="text-gray-300">
                {cartDesccription()}
              </p>
              <div className="flex justify-between text-gray-100">
                <span>Subtotal</span>
                <span>₹{totalCartPrice()}</span>
              </div>
              <div className="flex justify-between text-gray-100">
                <span>Tax (18%)</span>
                <span>₹{Math.ceil(totalCartPrice() * 0.18)}</span>
              </div>
              <div className="border-t border-gray-700 pt-3 flex justify-between text-lg font-semibold text-gray-100">
                <span>Total</span>
                <span>₹{Math.ceil(totalCartPrice() * 0.18 + totalCartPrice())}</span>
              </div>
            </div>
            <Link to="/payments" className="mt-6">
              <button className="w-full py-3 bg-teal-500 hover:bg-teal-600 rounded-xl text-lg font-semibold transition">
                Pay Now
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
