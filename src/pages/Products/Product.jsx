import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaStar, FaHeart, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../../features/cart/cartSlice";
import { setOrderFromBuyNow } from "../../features/product/orderSlice";
import {
  fetchReviewsByProduct,
  selectReviewsByProduct,
  submitReview,
} from "../../features/review/reviewSlice";
import { fetchProductById } from "../../features/product/productSlice";
import { addWishlistItem } from "@/features/wishlist/wishlistslice";

import { Button } from "@/components/ui/button";
import ProductReviews from "./ProductReviews";
import ProductGallery from "./ProductGallery";

/* ───────── Health Components ───────── */
import HealthScoreCard from "./HealthScoreCard";
import NutrientCard from "./NutrientBar";
import WhyHealthy from "./WhyHealthy";
import NutritionCompare from "./NutritionCompare";

const Product = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const user = useSelector((state) => state.auth.user);
  const userId = user?.data?._id;

  const product = useSelector((state) => state.product.currentProduct);
  const wishlist = useSelector((state) => state.wishlist.items);

  const reviews = useSelector((state) =>
    selectReviewsByProduct(state, productId)
  );

  const isWishlisted = wishlist.some(
    (item) => item.productId?._id === productId
  );

  const hasReviewed = reviews.some(
    (r) => r.userId?._id === userId
  );

  const [quantity, setQuantity] = useState(1);
  const [reviewDraft, setReviewDraft] = useState({
    rating: 0,
    message: "",
  });
  const [page, setPage] = useState(1);

  const reviewsPerPage = 5;
  const currentReviews = reviews.slice(
    (page - 1) * reviewsPerPage,
    page * reviewsPerPage
  );

  useEffect(() => {
    if (!productId) return;
    dispatch(fetchProductById(productId));
    dispatch(fetchReviewsByProduct(productId));
  }, [dispatch, productId]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading product…
      </div>
    );
  }

  /* ───────── Images ───────── */
  const images = [
    product.ProductImage,
    ...(product.images || []),
  ].filter(Boolean);

  /* ───────── CORRECT NUTRITION NORMALIZATION ───────── */
  const nutrition = {
    energy: product.nutrition?.energy ?? { calories: 0 },

    macros: product.nutrition?.macros ?? {
      protein: 0,
      carbs: 0,
      sugar: 0,
      fat: 0,
      fibre: 0,
    },

    micros: product.nutrition?.micros ?? {
      vitamins: {},
      minerals: {},
    },
  };

  /* ───────── NUTRIENT CARD DATA ───────── */
  const nutrientCardData = {
    productName: product.name,

    calories: nutrition.energy.calories,

    nutriScore: "A",
    healthGrade:
      nutrition.macros.sugar <= 7 ? "Good" : "Moderate",

    macros: [
      {
        label: "Protein",
        value: `${nutrition.macros.protein}g`,
        percentage: Math.min(
          (nutrition.macros.protein / 50) * 100,
          100
        ),
        color: "bg-green-500",
      },
      {
        label: "Carbs",
        value: `${nutrition.macros.carbs}g`,
        percentage: Math.min(
          (nutrition.macros.carbs / 300) * 100,
          100
        ),
        color: "bg-orange-400",
      },
      {
        label: "Fibre",
        value: `${nutrition.macros.fibre}g`,
        percentage: Math.min(
          (nutrition.macros.fibre / 30) * 100,
          100
        ),
        color: "bg-green-600",
      },
       {
        label: "Sugar",
        value: `${nutrition.macros.sugar}g`,
        percentage: Math.min(
          (nutrition.macros.sugar / 30) * 100,
          100
        ),
        color: "bg-red-600",
      },
      {
        label: "Fat",
        value: `${nutrition.macros.fat}g`,
        percentage: Math.min(
          (nutrition.macros.fat / 70) * 100,
          100
        ),
        color: "bg-yellow-400",
      },
    ],

    micros: [
      ...Object.entries(nutrition.micros.vitamins || {}).map(
        ([key, value]) => ({
          label: key.replace(/([A-Z])/g, " $1").trim(),
          value: `${value}%`,
          active: value > 0,
        })
      ),
      ...Object.entries(nutrition.micros.minerals || {}).map(
        ([key, value]) => ({
          label: key.replace(/([A-Z])/g, " $1").trim(),
          value: key === "sodium" ? `${value}mg` : `${value}%`,
          active: value > 0,
        })
      ),
    ],

    benefits: product.dietary
      ? Object.entries(product.dietary)
          .filter(([_, value]) => value === true)
          .map(([key]) => ({
            label: key
              .replace(/^is/, "")
              .replace(/([A-Z])/g, " $1")
              .trim(),
          }))
      : [],
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-4 md:px-8 py-10 max-w-7xl mx-auto">

      {/* ───────── HERO ───────── */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <ProductGallery images={images} name={product.name} />

        <div className="space-y-3">
          <div className="text-sm text-muted-foreground">
            {product.Category}
            {product.brand && ` · ${product.brand}`}
          </div>

          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={
                  i + 1 <= Math.round(product.rating)
                    ? "text-yellow-400"
                    : "text-muted-foreground"
                }
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              {product.rating.toFixed(1)} · {product.reviewCount} reviews
            </span>
          </div>

          <div className="text-3xl font-semibold text-emerald-600">
            ₹{product.discountedPrice ?? product.price}
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              disabled={quantity <= 1}
              onClick={() => setQuantity(q => q - 1)}
            >
              −
            </Button>
            <span>{quantity}</span>
            <Button
              variant="outline"
              disabled={quantity >= product.stocks}
              onClick={() => setQuantity(q => q + 1)}
            >
              +
            </Button>
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() =>
                dispatch(addToCart({ ...product, quantity }))
              }
            >
              <FaShoppingCart className="mr-2" />
              Add to Cart
            </Button>

            <Button
              variant="secondary"
              onClick={() => {
                dispatch(setOrderFromBuyNow({ product, quantity }));
                navigate("/BuyProduct");
              }}
            >
              Buy Now
            </Button>
          </div>

          <button
            onClick={() =>
              userId && dispatch(addWishlistItem(product._id))
            }
            className={`flex items-center gap-2 mt-2 ${
              isWishlisted ? "text-muted-foreground" : "text-red-500"
            }`}
          >
            <FaHeart />
            {isWishlisted ? "In Wishlist" : "Add to Wishlist"}
          </button>
        </div>
      </div>

      {/* ───────── HEALTH ───────── */}
      <div className="space-y-14 mb-20">
        <HealthScoreCard nutrition={nutrition} />
        <NutrientCard {...nutrientCardData} />
        <WhyHealthy   productId={product._id} nutrition={nutrition} dietary={product.dietary} />
        <NutritionCompare nutrition={nutrition} category={product.Category} />
      </div>

      {/* ───────── REVIEWS ───────── */}
      <ProductReviews
        reviews={currentReviews}
        avg={product.rating}
        count={product.reviewCount}
        reviewDraft={reviewDraft}
        setReviewDraft={setReviewDraft}
        onSubmit={async () => {
          if (!reviewDraft.rating || !reviewDraft.message) return;
          await dispatch(
            submitReview({ productId, ...reviewDraft })
          ).unwrap();
          dispatch(fetchReviewsByProduct(productId));
          setReviewDraft({ rating: 0, message: "" });
        }}
        currentPage={page}
        totalPages={Math.ceil(reviews.length / reviewsPerPage)}
        hasReviewed={hasReviewed}
        onPrev={() => setPage(p => p - 1)}
        onNext={() => setPage(p => p + 1)}
      />
    </div>
  );
};

export default Product;
