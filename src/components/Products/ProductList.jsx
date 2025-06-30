import { useDispatch, useSelector } from "react-redux";
import { useEffect,useContext } from "react";
import { fetchProducts } from "../../features/product/productSlice";
import { Link } from "react-router-dom";
import Categories from "./Categories.jsx";
import Reminder from "../App/Reminder.jsx";
import UserContext from "../../context/UserContext.jsx";

const ProductList = () => {
  const {childToParent}=useContext(UserContext)
  const dispatch = useDispatch();
  const { products: productsData, loading, error } = useSelector(state => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <Reminder />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-purple-800 via-indigo-700 to-blue-700 py-12">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-3xl font-bold text-white mb-2">
            Discover Amazing Products
          </h1>
          <p className="text-base text-gray-100 max-w-xl mx-auto">
            Explore our exclusive collection of top-notch products curated just for you.
          </p>
        </div>
      </section>

      {/* Error / Loading States */}
      {loading && <p className="text-center mt-4">Loading products...</p>}
      {error && <p className="text-center text-red-600 mt-4">{error}</p>}

      {/* Product Background */}
      <div
        className="bg-cover bg-center w-full h-auto"
        style={{ backgroundImage: 'url("/src/assets/design/d.jpg")' }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-2 md:gap-8 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {productsData.map((product) => (
              <div
                key={product._id}
                onClick={()=>childToParent(product)}
                className="bg-white rounded-xl shadow-md overflow-hidden border hover:shadow-xl transition-transform duration-200 transform hover:-translate-y-1"
              >
                <Link to="/About">
                  <div className="aspect-[3/4] bg-gray-100 flex items-center justify-center overflow-hidden">
                    <img
                      src={product.ProductImage}
                      alt={product.name}
                      className="object-contain w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </div>

                  <div className="p-2 text-center">
                    <h2 className="text-sm font-medium text-gray-900 truncate">{product.name}</h2>
                    <p className="text-lg font-semibold text-teal-600 mt-1">₹{product.price}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ProductList;
