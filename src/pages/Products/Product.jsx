import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../features/cart/cartSlice";
import { setOrderFromBuyNow } from "../../features/product/orderSlice";

import {
  fetchAverageForProduct,
  fetchReviewsByProduct,
  selectAverageForProduct,
  selectReviewsByProduct,
  submitReview
} from "../../features/review/reviewSlice";

import {
  fetchProductById,
  fetchProducts
} from "../../features/product/productSlice";

import {
  addWishlistItem
} from "@/features/wishlist/wishlistslice.jsx";

import { Button } from "@/components/ui/button";
import ProductReviews from "./ProductReviews.jsx";
import ProductGallery from "./ProductGallery";

const Product = () => {
  /* ───────── Redux / Router ───────── */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();

  /* ───────── Auth ───────── */
  const user = useSelector((state) => state.auth.user);
  const userId = user?.data?._id;

  /* ───────── Product & Wishlist ───────── */
  const product = useSelector((state) => state.product.currentProduct);
  const wishlist = useSelector((state) => state.wishlist.items);

  const isWishlisted = wishlist.some(
    (item) => item.productId?._id === productId
  );

  /* ───────── Reviews ───────── */
  const reviews = useSelector((state) =>
    selectReviewsByProduct(state, productId)
  );

  const { avg, count } = useSelector((state) =>
    selectAverageForProduct(state, productId)
  );

  const hasReviewed = reviews.some(
    (r) => r.userId?._id === userId
  );

  /* ───────── Local State ───────── */
  const [reviewDraft, setReviewDraft] = useState({
    rating: 0,
    message: ""
  });
  const [quantity, setQuantity] = useState(1);
  const [showMore, setShowMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 5;

  /* ───────── Fetch Product ───────── */
  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId));
      dispatch(fetchReviewsByProduct(productId));
      dispatch(fetchAverageForProduct(productId));
    }
  }, [productId, dispatch]);

  /* ───────── Handlers ───────── */

  const handleAddToWishlist = () => {
    if (!userId) {
      alert("Please login to add items to wishlist");
      return;
    }

    if (!isWishlisted) {
      dispatch(addWishlistItem(product._id));
    }
  };

  const handleCheckout = () => {
    dispatch(setOrderFromBuyNow({ product, quantity }));
    navigate("/BuyProduct");
  };

  const handleSubmitReview = async () => {
    if (!reviewDraft.rating || !reviewDraft.message) {
      alert("Please add rating and review message");
      return;
    }

    try {
      await dispatch(
        submitReview({
          productId,
          rating: reviewDraft.rating,
          message: reviewDraft.message
        })
      ).unwrap();

      dispatch(fetchReviewsByProduct(productId));
      dispatch(fetchAverageForProduct(productId));
      dispatch(fetchProducts());

      setReviewDraft({ rating: 0, message: "" });
    } catch (err) {
      alert(err);
    }
  };

  /* ───────── Pagination ───────── */
  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  /* ───────── Loading Guard ───────── */
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading product...
      </div>
    );
  }

  /* ───────── Render ───────── */
  return (
    <div className="min-h-screen bg-background text-foreground p-4 md:p-8">

      {/* Product Section */}
      <div className="flex flex-col lg:flex-row gap-10">

        <ProductGallery
          image={product.ProductImage || product.imgLink}
          name={product.name}
        />

        <div className="flex-1 space-y-4">

          <h1 className="text-3xl font-bold">{product.name}</h1>

          {/* Wishlist Button */}
          <button
            onClick={handleAddToWishlist}
            disabled={isWishlisted}
            className={`flex items-center gap-2 font-semibold transition
              ${
                isWishlisted
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-red-500 hover:text-red-600"
              }`}
          >
            <FaHeart />
            {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
          </button>

          {/* Ratings */}
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i + 1 <= Math.round(avg)
                    ? "text-yellow-400"
                    : "text-gray-400"
                }
              />
            ))}
            <span className="text-sm ml-2">
              ({avg.toFixed(1)} · {count})
            </span>
          </div>

          {/* Price */}
          <div className="text-xl font-semibold text-emerald-600">
            ₹{product.price}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              disabled={quantity <= 1}
              onClick={() => setQuantity(quantity - 1)}
            >
              −
            </Button>
            <span>{quantity}</span>
            <Button
              variant="outline"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              onClick={() => dispatch(addToCart({ ...product, quantity }))}
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </Button>

            <Button variant="secondary" onClick={handleCheckout}>
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-2">Description</h2>
        <p>{product.description}</p>

        <button
          onClick={() => setShowMore(!showMore)}
          className="mt-3 text-blue-500"
        >
          {showMore ? "See Less" : "See More"}
        </button>
      </div>

      {/* Reviews */}
      <ProductReviews
        reviews={currentReviews}
        avg={avg}
        count={count}
        reviewDraft={reviewDraft}
        setReviewDraft={setReviewDraft}
        onSubmit={handleSubmitReview}
        currentPage={currentPage}
        totalPages={totalPages}
        hasReviewed={hasReviewed}
        onPrev={() => setCurrentPage((p) => p - 1)}
        onNext={() => setCurrentPage((p) => p + 1)}
      />
    </div>
  );
};

export default Product;
