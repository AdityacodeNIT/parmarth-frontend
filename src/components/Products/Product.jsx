import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import UserContext from "../../context/UserContext";
import { addToCart } from "../../features/cart/cartSlice";
import { setOrderFromBuyNow } from "../../features/product/orderSlice";
import{Button} from "../components/ui/button"

const Product = () => {
  /* ──────────────────────────── context & redux ──────────────────────────── */
  const {
    buyingProduct,
    addToFavourite,
    data,
    review,
    setReview,
    handleFormClick,
    averageRatings = 0,
    totalRatings = 0,
    getReview,
    gotReview,
    setBuyProduct,
  } = useContext(UserContext);

  const dispatch = useDispatch();
  const navigate  = useNavigate();

  const { list: addressList, selectedId: addressId } = useSelector(
    (s) => s.address
  );

  /* ───────────────────────────── component state ──────────────────────────── */
  const [showMore,   setShowMore]   = useState(false);
  const [currentPage,setCurrentPage]= useState(1);
  const [quantity,   setQuantity]   = useState(1);     // NEW

  const reviewsPerPage = 5;
  const product        = data?.productId || data || {};

  /* ───────────────────────────── side‑effects ─────────────────────────────── */
  useEffect(() => {
    if (data?._id) {
      console.log(data)
      getReview(data?._id);
    }
  }, [data?._id]);
  

  /* ────────────────────────────── handlers ────────────────────────────────── */
  const handleCheckout = () => {
    // guard: need an address first
    const finalAddressId = addressId || addressList[0]?._id;
    if (!finalAddressId) {
      alert("Please add/select an address before checkout.");
      navigate('/addressUpdate');
      return;
    }

    // 1️⃣ store order in Redux
    dispatch(setOrderFromBuyNow({ product, addressId: finalAddressId, quantity }));

    // 2️⃣ navigate
    navigate("/BuyProduct");
  };

  const handleSubmit= (e) => {
    e.preventDefault();
    handleFormClick();
  };

  const handleStarClick = (rating) => {
    setReview({ ...review, rating });
  };

  /* ──────────────────────────── pagination math ───────────────────────────── */
  const indexOfLast   = currentPage * reviewsPerPage;
  const indexOfFirst  = indexOfLast - reviewsPerPage;
  const currentReviews= gotReview.slice(indexOfFirst, indexOfLast);
  const totalPages    = Math.ceil(gotReview.length / reviewsPerPage);

  /* ──────────────────────────── render ────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 text-gray-200 md:p-8 p-3">

      {/* PRODUCT DISPLAY */}
      <div className="lg:p-6 lg:mt-6 mt-2 py-6 flex flex-row items-center justify-between md:gap-10 gap-4">

        {/* IMAGE */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.imgLink || product.ProductImage || "/placeholder.png"}
            alt={product.name}
            className="shadow-lg bg-gray-700 md:w-96 md:h-96 w-72 h-72 rounded-lg transition-transform transform hover:scale-105"
          />
        </div>

        {/* DETAILS */}
        <div className="w-full md:w-1/2 md:space-y-6 space-y-3 text-center lg:text-left">
          <div className="text-xl lg:text-3xl font-extrabold">{product.name}</div>

          {/* WISHLIST */}
          <button
            className="lg:text-lg text-md flex items-center justify-center lg:justify-start gap-2 text-red-500 font-semibold hover:text-red-600 transition"
            onClick={() => addToFavourite(product._id)}
          >
            <FaHeart className="md:text-2xl text-xl text-[#EF4444]" />
            <span>Add to Wishlist</span>
          </button>

          {/* RATINGS */}
          <div className="text-lg flex justify-center lg:justify-start gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i + 1 <= averageRatings ? "text-yellow-400" : "text-gray-500"} />
            ))}
            <span className="text-sm ml-2 text-gray-300">
              ({Math.round(averageRatings * 100) / 100})
            </span>
          </div>

          {/* PRICE */}
          <div className="text-lg md:text-xl font-semibold">
            Price: <span className="text-[#22C55E]">₹{product.price}</span>
          </div>

          {/* QUANTITY PICKER */}
          <div className="flex items-center gap-3 justify-center lg:justify-start">
            <button
              className="px-3 py-1 bg-gray-700 rounded-md"
              disabled={quantity <= 1}
              onClick={() => setQuantity(quantity - 1)}
            >
              −
            </button>
            <span>{quantity}</span>
            <button
              className="px-3 py-1 bg-gray-700 rounded-md"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button
              className="flex items-center justify-center gap-2 text-md text-white bg-[#6366F1] hover:bg-[#4F46E5] lg:px-8 px-2 md:py-3 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
              onClick={() => dispatch(addToCart({ ...product, quantity }))}
            >
              <FaShoppingCart />
              Add to Cart
            </Button>

            <Button
              className="flex items-center justify-center gap-2 lg:text-lg text-md text-white bg-violet-600 hover:bg-violet-700 lg:px-8 px-2 md:py-3 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
              onClick={handleCheckout}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

   



   <div className="bg-gray-900 text-white rounded-2xl shadow-xl px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-12 mx-2 lg:mx-4 transition-all duration-300">
  <h2 className="text-2xl md:text-3xl font-bold mb-4">Description</h2>

  <p className="text-base md:text-lg text-gray-300 leading-relaxed">
    {product.description}
  </p>

  {/* Toggle button */}
  <button
    className="mt-5 text-blue-400 hover:text-blue-300 text-sm md:text-base font-semibold transition-colors duration-200"
    onClick={() => setShowMore(!showMore)}
  >
    {showMore ? "See Less" : "See More"}
  </button>

  {/* Expanded Details */}
 {showMore && (
  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm md:text-base text-gray-300 font-medium border-t border-gray-700 pt-4">
    {product.weight && (
      <div className="flex items-center">
        <span className="w-24 font-semibold text-gray-400">Weight:</span>
        <span>{product.weight} g</span>
      </div>
    )}
    {product.height && (
      <div className="flex items-center">
        <span className="w-24 font-semibold text-gray-400">Height:</span>
        <span>{product.height} cm</span>
      </div>
    )}
    {product.length && (
      <div className="flex items-center">
        <span className="w-24 font-semibold text-gray-400">Length:</span>
        <span>{product.length} cm</span>
      </div>
    )}
    {product.width && (
      <div className="flex items-center">
        <span className="w-24 font-semibold text-gray-400">Width:</span>
        <span>{product.width} cm</span>
      </div>
    )}
  </div>
)}

</div>




      {/* Add Review */}
      <div className="my-8 px-4">
  {/* Add Review Heading */}
  <h2 className="text-3xl font-bold text-center text-white mb-6">Add a Review</h2>

  {/* Review Form */}
  <div className="flex justify-center">
    <form
      onSubmit={handleSubmit}
      className="bg-gray-900/80 backdrop-blur-md p-6 rounded-xl w-full md:w-2/3 lg:w-1/2 shadow-2xl transition-all duration-300"
    >
      {/* Star Rating */}
      <div className="flex justify-center gap-2 text-2xl mb-4">
        {[...Array(5)].map((_, i) => (
          <FaStar
            key={i}
            className={`transition-transform duration-200 hover:scale-125 ${
              i + 1 <= review.rating ? "text-yellow-400" : "text-gray-500"
            } cursor-pointer`}
            onClick={() => handleStarClick(i + 1)}
          />
        ))}
      </div>

      {/* Message Input */}
      <textarea
        className="w-full p-4 rounded-lg bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all duration-200"
        placeholder="Write your review..."
        rows={4}
        value={review.message}
        onChange={(e) => setReview({ ...review, message: e.target.value })}
      ></textarea>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-4 py-3 text-white font-semibold bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-300 shadow-lg"
      >
        Submit Review
      </button>
    </form>
  </div>

  {/* Reviews Section */}
  <h2 className="text-3xl font-bold text-center text-white mt-10 mb-4">Reviews</h2>

  <div className="space-y-4">
    {currentReviews.map((rev, index) => (
      <div
        key={index}
        className="p-5 bg-gray-800 border border-gray-700 rounded-lg shadow-md hover:scale-[1.01] transition-transform duration-200"
      >
        <div className="flex justify-between items-center text-gray-300 font-semibold">
          <span>{rev.userId?.fullName || "Anonymous"}</span>
          <span className="text-sm text-gray-400">
            {new Date(rev.createdAt).toLocaleString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center mt-2 gap-1">
          {[...Array(rev.rating)].map((_, i) => (
            <FaStar key={i} className="text-yellow-400" />
          ))}
        </div>

        {/* Message */}
        <p className="text-gray-300 mt-2">{rev.message}</p>
      </div>
    ))}
  </div>

  {/* Pagination */}
  <div className="flex justify-center gap-4 mt-6">
    <button
      disabled={currentPage === 1}
      onClick={() => setCurrentPage(currentPage - 1)}
      className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Previous
    </button>
    <button
      disabled={currentPage === totalPages}
      onClick={() => setCurrentPage(currentPage + 1)}
      className="px-5 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next
    </button>
  </div>
</div>

      </div>

  );
};

export default Product;
