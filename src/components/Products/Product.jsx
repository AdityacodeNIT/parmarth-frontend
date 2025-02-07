import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import UserContext from "../../context/UserContext";

const Product = () => {
  const {
    buyingProduct,
    addToFavourite,
    handleDisplay,
    handleAddToCart,
    notification,
    data,
    review,
    setReview,
    setProductId,
    handleFormClick,
    averageRatings = 0,
    totalRatings = 0,
  } = useContext(UserContext);

  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    if (data?._id) {
      setProductId(data._id);
    }
  }, [data, setProductId]);

  const product = data?.productId || data || {};

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFormClick();
  };

  return (
    <div key={product._id} className="w-full">
      {/* Product Name */}
      <div className="w-full text-yellow-500 text-2xl md:text-3xl font-extrabold bg-slate-600 p-2 flex justify-center">
        {product.name}
      </div>

      {/* Product Image & Details */}
      <div className="p-5 m-2 flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
        {/* Image Section */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={product.imgLink || product.ProductImage || "/placeholder.png"}
            alt={product.name}
            className="shadow-2xl bg-slate-100 font-bold w-full max-w-sm md:max-w-md lg:max-w-lg h-auto rounded-lg"
          />
        </div>

        {/* Product Info & Actions */}
        <div className="w-full md:w-1/2 space-y-4 text-center lg:text-left">
          <div className="font-extrabold text-3xl md:text-4xl">{product.name}</div>

          {/* Add to Favourites */}
          <button
            className="text-xl font-semibold flex items-center justify-center lg:justify-start space-x-2 text-black"
            onClick={() => addToFavourite(product._id)}
          >
            <span>Add to Favourites</span>
            <CiHeart className="text-3xl text-purple-500" />
          </button>

          {/* Rating Stars */}
          <div className="text-3xl flex justify-center lg:justify-start">
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;
              return (
                <span
                  key={i}
                  className={`fa fa-star ${
                    ratingValue <= averageRatings ? "text-orange-300" : "text-gray-400"
                  }`}
                ></span>
              );
            })}
            <button className="ml-2">({Math.round(averageRatings * 100) / 100})</button>
          </div>

          {/* Price */}
          <div className="text-xl font-semibold text-gray-900">
            Price: <span className="text-green-600">₹{product.price}</span>
          </div>

          {/* Add to Cart Button */}
          <button
            className="w-full md:w-auto text-2xl border-2 text-white font-semibold border-slate-600 bg-blue-600 px-10 py-2 rounded-md"
            onClick={() => handleAddToCart(product._id)}
          >
            Add to cart
          </button>

          {/* Notification Popup */}
          {notification && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg">
              {notification}
            </div>
          )}

          {/* Buy Now Button */}
          <Link to="/BuyProduct">
            <button
              className="w-full md:w-auto text-2xl px-10 py-2 mt-3 font-semibold text-white bg-violet-600 rounded-lg"
              onClick={() => buyingProduct(product, product._id?.toString())}
            >
              Buy Now
            </button>
          </Link>
        </div>
      </div>

      {/* Product Description */}
      <div className="shadow-lg h-auto bg-white mx-4 p-6 rounded-lg text-center lg:text-left">
        <div className="text-2xl font-semibold mb-4 text-gray-800">Description:</div>
        <p className="text-lg text-gray-700 leading-relaxed font-semibold">{product.description}</p>

        {/* Show More / Less Button */}
        <button
          className="text-xl text-blue-500 font-semibold mt-4"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "See Less" : "See More"}
        </button>

        {/* Additional Details */}
        {showMore && (
          <div className="text-gray-800 font-medium space-y-2 mt-4">
            <div>Weight: {product.weight} g</div>
            <div>Height: {product.height} cm</div>
            <div>Length: {product.length} cm</div>
            <div>Width: {product.width} cm</div>
          </div>
        )}
      </div>

      {/* Product Reviews */}
      <div className="m-4 text-2xl font-semibold text-center lg:text-left">
        Product Reviews
        <div className="flex flex-col md:flex-row justify-between items-center mx-4 space-y-6 md:space-y-0">
          {/* Review Summary */}
          <div className="text-lg font-semibold">
            <p>Total Reviews</p>
            <div>{totalRatings}</div>
          </div>

          <div className="text-lg font-semibold">
            <p>Average Rating</p>
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;
              return (
                <span
                  key={i}
                  className={`fa fa-star ${
                    ratingValue <= averageRatings ? "text-orange-300" : "text-gray-400"
                  }`}
                ></span>
              );
            })}
            <button onClick={handleDisplay} className="ml-2">
              {Math.round(averageRatings * 100) / 100}
            </button>
          </div>

          {/* Review Form */}
          <div className="w-full md:w-1/2 p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex justify-center space-x-2">
                {[1, 2, 3, 4, 5].map((value) => (
                  <input
                    key={value}
                    type="button"
                    name="rating"
                    value={value}
                    className={`border-2 p-2 rounded-md transition duration-200 ${
                      review.rating === value ? "bg-yellow-300" : "hover:bg-gray-200"
                    }`}
                    onClick={() => setReview({ ...review, rating: value })}
                  />
                ))}
              </div>

              <textarea
                id="reviewDescription"
                name="description"
                value={review.description}
                onChange={(e) =>
                  setReview({ ...review, description: e.target.value })
                }
                className="w-full p-2 border-2 rounded-md resize-none"
                placeholder="Write your review..."
              ></textarea>

              <button
                type="submit"
                className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
