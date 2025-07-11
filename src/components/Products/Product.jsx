import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import UserContext from "../../context/UserContext";
import { addToCart } from "../../features/cart/cartSlice";
import { setOrderFromBuyNow } from "../../features/product/orderSlice";

const Product = () => {
  /* ──────────────────────────── context & redux ──────────────────────────── */
  const {
    buyingProduct,
    addToFavourite,
    data,
    review,
    setReview,
    setProductId,
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
      setProductId(data._id);
      getReview(data._id);
    }
  }, [data]);

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
            <button
              className="flex items-center justify-center gap-2 text-md text-white bg-[#6366F1] hover:bg-[#4F46E5] lg:px-8 px-2 md:py-3 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
              onClick={() => dispatch(addToCart({ ...product, quantity }))}
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            <button
              className="flex items-center justify-center gap-2 lg:text-lg text-md text-white bg-violet-600 hover:bg-violet-700 lg:px-8 px-2 md:py-3 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
              onClick={handleCheckout}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

   



      <div className="shadow-lg h-auto bg-gray-800 lg:mx-4  mx-2 lg:p-6 p-3 rounded-lg">
        <h2 className="md:text-2xl text-xl font-semibold mb-4 text-white">Description:</h2>
        <p className="d:text-lg text-md text-[#9CA3AF] leading-relaxed">{product.description}</p>

        {/* Show More / Less */}
        <button className="text-lg text-blue-400 font-semibold mt-4" onClick={() => setShowMore(!showMore)}>
          {showMore ? "See Less" : "See More"}
        </button>

        {showMore && (
          <div className="text-gray-400 font-medium space-y-2 lg:mt-4 mt-3">
            {product.weight && <div>Weight: {product.weight} g</div>}
            {product.height && <div>Height: {product.height} cm</div>}
            {product.length && <div>Length: {product.length} cm</div>}
            {product.width && <div>Width: {product.width} cm</div>}
          </div>
        )}
      </div>




      {/* Add Review */}
      <div className="m-4 text-2xl font-semibold text-center text-white">Add a Review</div>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit} className="space-y-4 w-full md:w-1/2 p-4">
          {/* Star Rating Input */}
          <div className="flex justify-center gap-2 md:text-xl text-lg">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i + 1 <= review.rating ? "text-yellow-400 cursor-pointer" : "text-gray-500 cursor-pointer"}
                onClick={() => handleStarClick(i + 1)}
              />
            ))}
          </div>

          {/* Review Message Input */}
          <textarea
            className="w-full lg:p-3 p-2 border-2 rounded-md resize-none bg-gray-700 text-white"
            placeholder="Write your review..."
            value={review.message}
            onChange={(e) => setReview({ ...review, message: e.target.value })}
          ></textarea>

          <button className="w-full lg:p-3 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
            Submit Review
          </button>
        </form>
      </div>

      {/* Display Reviews */}
      <div className="m-4 text-2xl font-semibold text-center text-white">Reviews</div>
      {currentReviews.map((rev, index) => (
        <div key={index} className="p-4 border-b border-gray-600 bg-gray-800 rounded-lg shadow-md">
          <div className="text-gray-300 font-semibold">
            {rev.userId.fullName || "Anonymous"} •{" "}
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
          <div className="flex items-center gap-1 mt-1">
            {[...Array(rev.rating)].map((_, i) => (
              <FaStar key={i} className="text-yellow-400" />
            ))}
          </div>
          <p className="text-gray-300 mt-2">{rev.message}</p>
        </div>
      ))}

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-4 py-2 bg-gray-700 rounded-md hover:bg-gray-600">
          Previous
        </button>
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-4 py-2 ml-2 bg-gray-700 rounded-md hover:bg-gray-600">
          Next
        </button>
      </div>
    </div>
  );
};

export default Product;
