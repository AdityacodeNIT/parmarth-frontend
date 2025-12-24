import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeartBroken } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";


import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  loadWishlist,
  removeWishlistItem
} from "@/features/wishlist/wishlistslice";

const Wishlisted = () => {
  const dispatch = useDispatch();

  /* ---------- AUTH ---------- */
  const user = useSelector((state) => state.auth.user);
  const userId = user?.data?._id;

  /* ---------- WISHLIST FROM REDUX ---------- */
  const { items: wishlist, loading } = useSelector(
    (state) => state.wishlist
  );

  /* ---------- LOAD WISHLIST ONCE ---------- */
  useEffect(() => {
    if (userId) {
      dispatch(loadWishlist());
    }
  }, [userId, dispatch]);

  const hasItems = wishlist.length > 0;

  return (
    <section className="min-h-screen bg-background px-4 sm:px-8 py-10">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-10 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">
          My Wishlist
        </h1>
        <p className="mt-2 text-muted-foreground text-sm">
          Products you’ve saved for later
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {loading ? (
          <p className="text-center text-muted-foreground">
            Loading wishlist…
          </p>
        ) : hasItems ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {wishlist.map((item) => (
              <Card
                key={item.productId._id}
                className="flex flex-col justify-between"
              >
                {/* Image */}
                <Link to={`/product/${item.productId._id}`}>
                  <div className="h-48 flex items-center justify-center bg-muted rounded-t-md">
                    <img
                      src={item.productId.ProductImage}
                      alt={item.productId.name}
                      className="h-32 w-auto object-contain"
                    />
                  </div>
                </Link>

                {/* Content */}
                <CardContent className="pt-4 space-y-2">
                  <h3 className="text-sm font-medium truncate">
                    {item.productId.name}
                  </h3>

                  <span className="text-lg font-semibold text-emerald-600">
                    ₹{item.productId.price}
                  </span>
                </CardContent>

                {/* Footer */}
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-destructive border-destructive hover:bg-destructive hover:text-white"
                    onClick={() =>
                      dispatch(removeWishlistItem(item.productId._id))
                    }
                  >
                    <FaHeartBroken className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <FaHeartBroken className="text-4xl text-muted-foreground mb-4" />
            <p className="text-lg font-medium">
              Your wishlist is empty
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Save products to find them easily later
            </p>

            <Link to="/shop">
              <Button className="mt-6">
                Browse Products
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlisted;
