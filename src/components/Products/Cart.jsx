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
    <div className="bg-[#121212] min-h-screen">
      <h2 className="w-full text-teal-500 lg:text-2xl text-md  font-extrabold bg-slate-700 p-4 text-center">
        Shopping Cart
      </h2>
      {cartItems.length === 0 ? (
        <p className="flex items-center mt-2 justify-center h-full lg:text-3xl text-xl font-bold font-serif text-gray-700">
          Your cart is empty
        </p>
      ) : (
        <div className="Cart mx-auto p-6">
          <h4 className="font-bold w-[250px] rounded-xl  p-4 mt-2 mb-4 border-slate-600 text-teal-500 text-center">
            No of Items in the Cart: {cartItems.length}
          </h4>
          <div className="flex flex-wrap">
            <div className="Cartlist flex-1">
              <ul>
                {cartItems.map((item) => (
                  <div
                    className="flex items-center justify-between p-5 bg-[#1F2937] border-b-2 border-gray-300 shadow-sm rounded-lg mb-4"
                    key={item.id}
                    onClick={() => {
                      childToParent(item);
                    }}
                  >
                    <Link to="/About">
                      <div className="flex items-center">
                        <li>
                          <img
                            src={item.imgLink || item.ProductImage}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg text-[#E5E7EB]"
                          />
                        </li>

                        <div className="ml-4 text-center">
                          <div className="font-semibold text-[#E5E7EB] text-2xl">
                            {item.name}
                          </div>
                          <div className="text-xl text-[#E5E7EB] mt-2 ">
                            Price: ₹{item.price}
                          </div>
                        </div>
                      </div>
                    </Link>

                    <div className="flex items-center">
                      <button
                        className="mx-2 border-2 p-2 border-slate-900 rounded-lg font-bold text-xl text-[#E5E7EB]"
                        onClick={() => removingElements(item._id)}
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold mx-2 text-[#E5E7EB]">
                        {item.quantity}
                      </span>
                      <button
                        className="mx-2 border-2 p-2 border-slate-900 text-xl text-[#E5E7EB] rounded-lg font-bold"
                        onClick={() => addToCart(data, item._id.toString())}
                      >
                        +
                      </button>
                      <button
                        className="ml-4 text-red-400 hover:text-red-500 "
                        onClick={() => removeFromCart(item._id.toString())}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </ul>
            </div>

            <div className="ml-6 w-full md:w-1/3 bg-[#1F2937] p-6 rounded-lg shadow-lg">
              <div className="text-2xl text-center text-teal-500 bg-slate-600 p-3 mb-4 rounded-lg font-semibold">
                Your Bill Summary
              </div>
              <div className="text-lg font-medium mb-4">
                {cartDesccription()}
              </div>
              <div className="text-2xl font-semibold flex justify-between mb-4 text-[#E5E7EB]">
                <span>Subtotal</span>
                <span>₹{totalCartPrice()}</span>
              </div>
              <div className="text-2xl font-semibold flex justify-between mb-4 border-t pt-4 border-gray-300 text-[#E5E7EB]">
                <span>Tax (18%)</span>
                <span>₹{Math.ceil(totalCartPrice() * 0.18)}</span>
              </div>
              <div className="text-2xl font-semibold flex justify-between border-t pt-4 border-gray-400 text-[#E5E7EB]">
                <span>Total</span>
                <span>
                  ₹{Math.ceil(totalCartPrice() * 0.18 + totalCartPrice())}
                </span>
              </div>
              <Link to="/payments">
                <button
                  className="w-full bg-teal-500 shadow-lg text-white px-4 py-3 mt-6 rounded-lg text-xl font-bold hover:bg-indigo-700"
                  type="button"
                >
                  Pay Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
