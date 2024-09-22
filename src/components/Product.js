import { Link } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import UserContext from "../context/UserContext";

const Product = () => {
  const {
    addToCart,
    buyingProduct,
    addToFavourite,
    productRating,
    handleDisplay,
    averagereview,
    productReview,
    totalProductReview,
    handleAddToCart,
    notification,
  } = useContext(UserContext);

  const { data } = useContext(UserContext);

  const [review, setReview] = useState({
    rating: 0,
    productId: data._id,
    description: "",
  });

  const handleFormClick = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v2/feedback/review",
        review
      );

      if (response && response.data) {
        productRating(response.data.data.rating);
        console.log(productReview);

        // Clear the review form after successful submission
        setReview({ rating: 0, productId: data._id, description: "" });
      } else {
        console.error("Unable to submit review");
      }
    } catch (error) {
      console.error("Issue in review", error);
    }
  };

  return (
    <div key={data._id}>
      <div className="w-full text-yellow-500 text-2xl font-extrabold bg-slate-600 p-2 flex justify-center">
        {data.name}
      </div>
      <div className="p-5 w-full m-2 flex justify-around">
        <div className="list-none w-auto">
          <li>
            <img
              src={data.imgLink || data.ProductImage}
              alt={data.name}
              className="shadow-2xl bg-slate-100 font-bold w-96 h-96"
            />
          </li>
        </div>
        <div className="grid">
          <div className="font-extrabold text-4xl"> {data.name}</div>
          <button
            className="text-3xl text-white font-semibold rounded-md"
            onClick={() => addToFavourite(data, data._id)}
          >
            Favourites
          </button>
          <div className="text-3xl inline-flex">
            {[...Array(5)].map((star, i) => {
              const ratingValue = i + 1;
              return (
                <span
                  key={i}
                  className={`fa fa-star ${
                    ratingValue <= averagereview ? "text-orange-300 " : ""
                  }`}
                  onClick={() => productRating(ratingValue)}
                ></span>
              );
            })}
            <div>
              <button className="mb-6 mx-2">
                ({`${Math.ceil(averagereview)}`})
              </button>
            </div>
          </div>

          <div className="text-2xl font-semibold">Price: ₹{data.price}</div>

          <button
            className="text-3xl border-2 text-white font-semibold border-slate-600 bg-blue-600 px-40 py-2 rounded-md"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
          {notification && (
            <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg">
              {notification}
            </div>
          )}

          <Link to="/BuyProduct">
            <button
              className="text-3xl px-44 py-2 mt-3 font-semibold text-white bg-violet-600 rounded-lg"
              onClick={() => buyingProduct(data, data._id.toString())}
            >
              Buy Now
            </button>
          </Link>
        </div>
      </div>
      <div className="shadow-lg h-auto bg-green-100 mx-4 p-6 rounded-lg">
        <div className="mt-10 mx-4 h-auto p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Description:
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed font-semibold">
            {data.description}
          </p>
        </div>

        <div className="m-2 h-96 text-2xl font-semibold">
          Product review
          <div className="justify-evenly mx-12 flex text-lg font-semibold">
            <div>
              <p>Total Reviews</p>
              <h>{`${totalProductReview}`}</h>
            </div>
            <div>
              <p>Average Rating</p>
              {[...Array(5)].map((star, i) => {
                const ratingValue = i + 1;
                return (
                  <span
                    key={i}
                    className={`fa fa-star ${
                      ratingValue <= averagereview ? "text-orange-300 " : ""
                    }`}
                    onClick={() => productRating(ratingValue)}
                  ></span>
                );
              })}
              <button onClick={() => handleDisplay()}>
                {`${averagereview}`}
              </button>

              <div className="p-4">
                <form onSubmit={handleFormClick} className="space-y-4">
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <input
                        key={value}
                        type="button"
                        name="rating"
                        value={value}
                        className={`border-2 p-2 rounded-md transition-colors duration-200 ${
                          review.rating === value
                            ? "bg-yellow-300"
                            : "hover:bg-gray-200"
                        }`}
                        onClick={() => setReview({ ...review, rating: value })}
                      />
                    ))}
                  </div>
                  <input
                    type="text"
                    id="reviewDescription"
                    name="description"
                    value={review.description}
                    onChange={(e) =>
                      setReview({ ...review, description: e.target.value })
                    }
                    className="h-36 w-full p-2 border-2 rounded-md resize-none"
                    placeholder="Write your review..."
                  />
                  <button
                    type="submit"
                    onClick={(e) => {
                      const inputField =
                        document.getElementById("reviewDescription");
                      // Reset the input value
                      inputField.value = "";
                    }}
                    className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
            <div>March 2024 - May 2024</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
