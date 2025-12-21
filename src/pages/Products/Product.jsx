import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { FaStar, FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';

import UserContext from '../../context/UserContext';
import { addToCart } from '../../features/cart/cartSlice';
import { setOrderFromBuyNow } from '../../features/product/orderSlice';
import { Button } from '@/components/ui/button';
import {
  fetchAverageForProduct,
  fetchReviewsByProduct,
  selectAverageForProduct,
  selectReviewsByProduct,
  submitReview
} from '../../features/review/reviewSlice';
import { fetchProductById, fetchProducts } from '../../features/product/productSlice';
import ProductReviews from './ProductReviews.jsx';
import ProductGallery from './ProductGallery';


const Product = () => {
  /* ──────────────────────────── global redux ──────────────────────────── */
  const { addToFavourite } = useContext(UserContext);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [reviewDraft, setReviewDraft] = useState({
    rating: 0,
    message: ''
  });

  const user = useContext(UserContext)?.userDetail?.data?.user;

  const loading = useSelector(state => state.review.loading);

  const { list: addressList, selectedId: addressId } = useSelector(s => s.address);

  // fetching reviews

  const { id: productId } = useParams();

  console.log(productId);

  const product = useSelector(state => state.product.currentProduct);
  console.log(product);

  useEffect(() => {
    if (!productId) return;

    dispatch(fetchProductById(productId));
  }, [productId, dispatch]);

  const reviews = useSelector(state => selectReviewsByProduct(state, productId));
  console.log(reviews);
  const hasReviewed = reviews.some(
  r => r.userId?._id === user?._id
);
console.log(hasReviewed);
selectAverageForProduct
const { avg, count } = useSelector(state =>
  selectAverageForProduct(state, productId)
);


  useEffect(() => {
    if (productId) {
      dispatch(fetchReviewsByProduct(productId));
      dispatch(fetchAverageForProduct(productId));
    }
  }, [productId, dispatch]);

  /* ───────────────────────────── component state ──────────────────────────── */
  const [showMore, setShowMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [quantity, setQuantity] = useState(1); // NEW

  const reviewsPerPage = 5;

  /* ────────────────────────────── handlers ────────────────────────────────── */
  const handleCheckout = () => {
    // guard: need an address first
    const finalAddressId = addressId || addressList[0]?._id;
    if (!finalAddressId) {
      alert('Please add/select an address before checkout.');
      navigate('/addressUpdate');
      return;
    }

    //  store order in Redux
    dispatch(setOrderFromBuyNow({ product, addressId: finalAddressId, quantity }));

    // navigate
    navigate('/BuyProduct');
  };

const handleSubmit = async () => {
  if (!reviewDraft.rating || !reviewDraft.message) {
    alert('Please add rating and review message');
    return;
  }

  try {
    await dispatch(
      submitReview({
        productId,
        rating: reviewDraft.rating,
        message: reviewDraft.message
      })
    ).unwrap(); // ⭐ CRITICAL

    dispatch(fetchReviewsByProduct(productId));
    dispatch(fetchAverageForProduct(productId));
    dispatch(fetchProducts())

    setReviewDraft({ rating: 0, message: '' });
  } catch (err) {
    alert(err); // shows "You have already reviewed this product"
  }
};


  /* ──────────────────────────── pagination math ───────────────────────────── */
  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  /* ──────────────────────────── render ────────────────────────────────────── */

  if (!product) {
    return (
      <div className='min-h-screen flex items-center justify-center text-white'>
        Loading product...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground md:p-8 p-3">


      {/* PRODUCT DISPLAY */}
      <div className='lg:p-6 lg:mt-6 mt-2 py-6 flex flex-row items-center justify-between md:gap-10 gap-4'>
        {/* IMAGE */}
        <ProductGallery image={product.ProductImage || product.imgLink} name={product.name} />

        {/* DETAILS */}
        <div className='w-full md:w-1/2 md:space-y-6 space-y-3 text-center lg:text-left'>
          <div className='text-xl lg:text-3xl font-extrabold'>{product.name}</div>

          {/* WISHLIST */}
          <button
            className='lg:text-lg text-md flex items-center justify-center lg:justify-start gap-2 text-red-500 font-semibold hover:text-red-600 transition'
            onClick={() => addToFavourite(product._id)}
          >
            <FaHeart className='md:text-2xl text-xl text-[#EF4444]' />
            <span>Add to Wishlist</span>
          </button>

          {/* RATINGS */}
          <div className='text-lg flex justify-center lg:justify-start gap-1'>
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={i + 1 <= Math.round(avg) ? 'text-yellow-400' : 'text-gray-500'}
              />
            ))}
            <span className='text-sm ml-2 '>
              ({avg.toFixed(1)} · {count} ratings)
            </span>
          </div>

          {/* PRICE */}
          <div className='text-lg md:text-xl font-semibold'>
            Price: <span className='text-[#22C55E]'>₹{product.price}</span>
          </div>

          {/* QUANTITY PICKER */}
          <div className='flex items-center gap-3 justify-center lg:justify-start'>
            <Button
            variant="outline"
            size='sm'
            disabled={quantity <= 1}
              onClick={() => setQuantity(quantity - 1)}
            >
              −
            </Button>

            <span>{quantity}</span>

            <Button
              variant='outline'
              size='sm'
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>

          {/* ACTION BUTTONS */}
          <div className='flex flex-col sm:flex-row gap-4 pt-2'>
            <Button
              className='flex items-center justify-center gap-2 text-md text-white bg-[#6366F1] hover:bg-[#4F46E5] lg:px-8 px-2 md:py-3 py-2 rounded-md shadow-md transition-transform transform hover:scale-105'
              onClick={() => dispatch(addToCart({ ...product, quantity }))}
            >
              <FaShoppingCart />
              Add to Cart
            </Button>

            <Button
              className='flex items-center justify-center gap-2 lg:text-lg text-md text-white bg-violet-600 hover:bg-violet-700 lg:px-8 px-2 md:py-3 py-2 rounded-md shadow-md transition-transform transform hover:scale-105'
              onClick={handleCheckout}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>

      <div className=' rounded-2xl shadow-xl px-4 py-6 sm:px-6 md:px-8 lg:px-10 xl:px-12 mx-2 lg:mx-4 transition-all duration-300'>
        <h2 className='text-2xl md:text-3xl font-bold mb-4'>Description</h2>

        <p className='text-base md:text-lg leading-relaxed'>{product.description}</p>

        {/* Toggle button */}
        <button
          className='mt-5 text-blue-400 hover:text-blue-300 text-sm md:text-base font-semibold transition-colors duration-200'
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? 'See Less' : 'See More'}
        </button>

        {/* Expanded Details */}
        {showMore && (
          <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm md:text-base font-medium border-t border-gray-700 pt-4'>
            {product.weight && (
              <div className='flex items-center'>
                <span className='w-24 font-semibold'>Weight:</span>
                <span>{product.weight} g</span>
              </div>
            )}
            {product.height && (
              <div className='flex items-center'>
                <span className='w-24 font-semibold '>Height:</span>
                <span>{product.height} cm</span>
              </div>
            )}
            {product.length && (
              <div className='flex items-center'>
                <span className='w-24 font-semibold '>Length:</span>
                <span>{product.length} cm</span>
              </div>
            )}
            {product.width && (
              <div className='flex items-center'>
                <span className='w-24 font-semibold '>Width:</span>
                <span>{product.width} cm</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add Review */}
      <ProductReviews
        reviews={currentReviews}
        avg={avg}
        count={count}
        reviewDraft={reviewDraft}
        setReviewDraft={setReviewDraft}
        loading={loading}
        onSubmit={handleSubmit}
        currentPage={currentPage}
        totalPages={totalPages}
        hasReviewed={hasReviewed}
        onPrev={() => setCurrentPage(p => p - 1)}
        onNext={() => setCurrentPage(p => p + 1)}
      />
    </div>
  );
};

export default Product;
