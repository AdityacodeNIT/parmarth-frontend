import { useNavigate} from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import UserContext from "../../context/UserContext";

const Product = () => {
  const {
    buyingProduct,
    addToFavourite,
    handleAddToCart,
    data,
    review,
    setReview,
    setProductId,
    handleFormClick,
    averageRatings = 0,
    totalRatings = 0,
    getReview,
    gotReview,
    removeItemfromCheckout,
    setBuyProduct

  } = useContext(UserContext);

  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;

  useEffect(() => {
    if (data?._id) {
      setProductId(data._id);
      getReview(data._id);
    }
  }, [data, setProductId]);

  const product = data?.productId || data || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormClick();
  };

  const handleBuyNow = (product) => {

    setBuyProduct([]);
  
    // Optionally, navigate after the state has been updated
    setTimeout(() => {
      buyingProduct(product, product._id?.toString());
      navigate("/BuyProduct");
    }, 100);
  };
  
  

  const handleStarClick = (rating) => {
    setReview({ ...review, rating });
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = gotReview.slice(indexOfFirstReview, indexOfLastReview);
  const totalPages = Math.ceil(gotReview.length / reviewsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-gray-800 text-gray-200 p-8">
      {/* Product Name */}


      {/* Product Section */}
      <div className="lg:p-6 lg:mt-6 mt-2 py-4 flex flex-row items-center justify-between md:gap-10 gap-4">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.imgLink || product.ProductImage || "/placeholder.png"}
            alt={product.name}
            className="shadow-lg bg-gray-700 md:w-96 md:h-96 w-56 h-56 rounded-lg transition-transform transform hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 space-y-6 text-center lg:text-left">
          <div className="text-xl lg:text-3xl font-extrabold">{product.name}</div>

          {/* Wishlist Button */}
          <button
            className="lg:text-lg text-md flex items-center justify-center lg:justify-start gap-2 text-red-500 font-semibold hover:text-red-600 transition"
            onClick={() => addToFavourite(product._id)}
          >
            <FaHeart className="md:text-2xl text-xl text-[#EF4444]" />
            <span>Add to Wishlist</span>
          </button>


          {/* Ratings */}
          <div className="tlg:ext-2xl text-lg flex justify-center lg:justify-start gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className={i + 1 <= averageRatings ? "text-yellow-400" : "text-gray-500"} />
            ))}
            <span className="text-sm ml-2 text-gray-300">({Math.round(averageRatings * 100) / 100})</span>
          </div>

          {/* Price */}
          <div className="text-lg md:text-xl font-semibold">
            Price: <span className="text-[#22C55E]">₹{product.price}</span>
          </div>

          {/* Add to Cart & Buy Now Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              className="flex items-center justify-center gap-2 text-md text-white bg-[#6366F1] hover:bg-[#4F46E5] lg:px-8 px-4 md:py-3 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
              onClick={() => handleAddToCart(product._id)}
            >
              <FaShoppingCart />
              Add to Cart
            </button>

            
            <button
  className="flex items-center justify-center gap-2 text-lg text-white bg-violet-600 hover:bg-violet-700 lg:px-8 px-4 md:py-3 py-2 rounded-md shadow-md transition-transform transform hover:scale-105"
  onClick={()=>handleBuyNow(product)}
>
  Buy Now
</button>

          
          </div>
        </div>
      </div>
      <div className="shadow-lg h-auto bg-gray-800 mx-4 p-6 rounded-lg">
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
