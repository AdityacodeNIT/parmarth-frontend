import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOrderDetails } from "../../features/order/orderSlice";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const statusVariant = (status) => {
  switch (status) {
    case "Delivered":
      return "success";
    case "Shipped":
      return "default";
    case "Pending":
    default:
      return "secondary";
  }
};

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/shiprocket/getOrder`,
        { withCredentials: true }
      );

      setOrders(res?.data?.data?.data || []);
    } catch (err) {
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10 no-underline!">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold">Order History</h1>
          <Button variant="outline" onClick={fetchOrders}>
            Refresh
          </Button>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6 space-y-4">
                  <Skeleton className="h-5 w-1/2" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <div className="text-center space-y-4">
            <p className="text-destructive">{error}</p>
            <Button onClick={fetchOrders}>Retry</Button>
          </div>
        )}

        {/* Orders */}
        {!loading && !error && orders.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => {
              const total = order.products?.reduce((acc, item) => {
                const qty = item.quantity || 1;
                const price = item.selling_price + item.tax_percentage;
                return acc + price * qty;
              }, 0);

              return (
                <Link
                  key={order.id}
                  to="/OrderItems"
                  onClick={() => dispatch(setOrderDetails(order))}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardHeader className="space-y-2">
                      <CardTitle className="text-base">
                        Order #{order.id}
                      </CardTitle>

                      <Badge variant={statusVariant(order.status)}>
                        {order.status}
                      </Badge>
                    </CardHeader>

                    <CardContent className="space-y-3 text-sm">
                      <p className="text-muted-foreground">
                        {order.customer_city}, {order.customer_state}
                      </p>

                      <div className="space-y-1">
                        {order.products?.slice(0, 2).map((item, idx) => (
                          <p key={idx} className="truncate">
                            {item.name} × {item.quantity || 1}
                          </p>
                        ))}
                        {order.products?.length > 2 && (
                          <p className="text-muted-foreground">
                            +{order.products.length - 2} more items
                          </p>
                        )}
                      </div>

                      <div className="pt-2 border-t flex justify-between items-center">
                        <span className="text-muted-foreground ">
                          Total
                        </span>
                        <span className="font-semibold">
                          ₹{Math.ceil(total).toFixed(2)}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}

        {/* Empty */}
        {!loading && !error && orders.length === 0 && (
          <div className="text-center text-muted-foreground">
            No orders found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
