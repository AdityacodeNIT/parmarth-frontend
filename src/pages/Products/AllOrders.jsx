import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setOrderDetails } from "../../features/product/orderSlice";
import {
  MdShoppingBag,
  MdLocalShipping,
  MdCheckCircle,
  MdCancel,
  MdKeyboardReturn,
  MdRefresh,
  MdSearch,
} from "react-icons/md";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [lastRefreshTime, setLastRefreshTime] = useState(Date.now());
  const dispatch = useDispatch();

  const fetchOrders = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/shiprocket/getOrder`,
        { withCredentials: true }
      );
      setOrders(res?.data?.data?.data || []);
      setLastRefreshTime(Date.now());
    } catch (err) {
      setError("Failed to fetch orders. Please try again.");
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleManualRefresh = () => {
    console.log('Manual refresh triggered');
    fetchOrders(true);
  };

  // Categorize orders
  const categorizeOrders = () => {
    const categories = {
      all: orders,
      current: orders.filter(
        (o) =>
          ["NEW", "READY TO SHIP", "SHIPPED", "IN TRANSIT", "OUT FOR DELIVERY"].includes(
            o.status?.toUpperCase()
          )
      ),
      delivered: orders.filter((o) => o.status?.toUpperCase() === "DELIVERED"),
      cancelled: orders.filter((o) =>
        ["CANCELLED", "CANCELED", "RTO", "LOST"].includes(o.status?.toUpperCase())
      ),
      returns: orders.filter((o) =>
        ["RETURN", "RETURNED", "RTO DELIVERED"].includes(o.status?.toUpperCase())
      ),
    };
    return categories;
  };

  const categories = categorizeOrders();

  // Filter by search
  const filteredOrders = categories[activeTab].filter((order) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      order.id?.toString().includes(searchLower) ||
      order.customer_name?.toLowerCase().includes(searchLower) ||
      order.products?.some((p) => p.name?.toLowerCase().includes(searchLower))
    );
  });

  // Tab configuration
  const tabs = [
    {
      id: "all",
      label: "All Orders",
      icon: MdShoppingBag,
      count: categories.all.length,
      color: "text-blue-600",
    },
    {
      id: "current",
      label: "In Progress",
      icon: MdLocalShipping,
      count: categories.current.length,
      color: "text-orange-600",
    },
    {
      id: "delivered",
      label: "Delivered",
      icon: MdCheckCircle,
      count: categories.delivered.length,
      color: "text-green-600",
    },
    {
      id: "returns",
      label: "Returns",
      icon: MdKeyboardReturn,
      count: categories.returns.length,
      color: "text-purple-600",
    },
    {
      id: "cancelled",
      label: "Cancelled",
      icon: MdCancel,
      count: categories.cancelled.length,
      color: "text-red-600",
    },
  ];

  // Status badge styling
  const getStatusBadge = (status) => {
    const statusUpper = status?.toUpperCase();
    const statusMap = {
      NEW: { variant: "secondary", label: "New Order" },
      "READY TO SHIP": { variant: "default", label: "Ready to Ship" },
      SHIPPED: { variant: "default", label: "Shipped" },
      "IN TRANSIT": { variant: "default", label: "In Transit" },
      "OUT FOR DELIVERY": { variant: "default", label: "Out for Delivery" },
      DELIVERED: { variant: "default", label: "Delivered", className: "bg-green-500" },
      CANCELLED: { variant: "destructive", label: "Cancelled" },
      CANCELED: { variant: "destructive", label: "Cancelled" },
      RTO: { variant: "destructive", label: "Return to Origin" },
      RETURNED: { variant: "secondary", label: "Returned" },
      "RTO DELIVERED": { variant: "secondary", label: "Return Delivered" },
    };

    const config = statusMap[statusUpper] || { variant: "secondary", label: status };
    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">My Orders</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your healthy food orders
            </p>
            {lastRefreshTime && (
              <p className="text-xs text-muted-foreground mt-1">
                Last updated: {new Date(lastRefreshTime).toLocaleTimeString()}
              </p>
            )}
          </div>
          <Button 
            variant="outline" 
            onClick={handleManualRefresh} 
            className="gap-2"
            disabled={loading}
          >
            <MdRefresh className={loading ? "animate-spin" : ""} />
            {loading ? 'Refreshing...' : 'Refresh'}
          </Button>
        </div>

        {/* Info Banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
          <div className="text-amber-600 mt-0.5">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-amber-900 font-medium">
              Status updates may take 2-5 minutes
            </p>
            <p className="text-xs text-amber-800 mt-1">
              Order changes (cancellations, status updates) are processed by our shipping partner Shiprocket. Their system typically takes 2-5 minutes to update. Click "Refresh" after a few minutes to see the latest status.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                <tab.icon className={`text-xl ${activeTab === tab.id ? tab.color : ""}`} />
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs ${
                      activeTab === tab.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        {!loading && orders.length > 0 && (
          <div className="relative max-w-md">
            <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xl" />
            <Input
              type="text"
              placeholder="Search by order ID, product name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <MdCancel className="text-6xl text-destructive mx-auto" />
              <p className="text-destructive font-medium">{error}</p>
              <Button onClick={fetchOrders}>Retry</Button>
            </div>
          </Card>
        )}

        {/* Orders Grid */}
        {!loading && !error && filteredOrders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrders.map((order) => {
              const total = order.products?.reduce((acc, item) => {
                const qty = item.quantity || 1;
                const price = item.selling_price + (item.tax_percentage || 0);
                return acc + price * qty;
              }, 0);

              const orderDate = order.created_at
                ? new Date(order.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "N/A";

              return (
                <Link
                  key={order.id}
                  to="/orderitems"
                  onClick={() => dispatch(setOrderDetails(order))}
                  className="block"
                >
                  <Card className="hover:shadow-lg hover:border-primary/50 transition-all h-full">
                    <CardHeader className="space-y-3 pb-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base font-semibold">
                            Order #{order.id}
                          </CardTitle>
                          <p className="text-xs text-muted-foreground mt-1">
                            {orderDate}
                          </p>
                        </div>
                        {getStatusBadge(order.status)}
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-4 text-sm">
                      {/* Delivery Address */}
                      <div className="flex items-start gap-2">
                        <MdLocalShipping className="text-muted-foreground mt-0.5 flex-shrink-0" />
                        <p className="text-muted-foreground text-xs">
                          {order.customer_city}, {order.customer_state}
                        </p>
                      </div>

                      {/* Products */}
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">
                          Items ({order.products?.length || 0})
                        </p>
                        <div className="space-y-1">
                          {order.products?.slice(0, 2).map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center justify-between text-xs"
                            >
                              <span className="truncate flex-1">
                                {item.name}
                              </span>
                              <span className="text-muted-foreground ml-2">
                                × {item.quantity || 1}
                              </span>
                            </div>
                          ))}
                          {order.products?.length > 2 && (
                            <p className="text-xs text-primary">
                              +{order.products.length - 2} more items
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Total */}
                      <div className="pt-3 border-t flex justify-between items-center">
                        <span className="text-muted-foreground font-medium">
                          Total Amount
                        </span>
                        <span className="font-semibold text-lg">
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

        {/* Empty State */}
        {!loading && !error && filteredOrders.length === 0 && (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <MdShoppingBag className="text-6xl text-muted-foreground mx-auto" />
              <div>
                <h3 className="text-lg font-semibold">
                  {searchQuery
                    ? "No orders found"
                    : `No ${activeTab === "all" ? "" : activeTab} orders yet`}
                </h3>
                <p className="text-muted-foreground mt-1">
                  {searchQuery
                    ? "Try adjusting your search"
                    : "Start shopping for healthy products!"}
                </p>
              </div>
              {!searchQuery && (
                <Link to="/shop">
                  <Button>Browse Products</Button>
                </Link>
              )}
            </div>
          </Card>
        )}

        {/* Order Summary Stats */}
        {!loading && !error && orders.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-8 border-t">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className="text-center p-4 rounded-lg border bg-card"
              >
                <tab.icon className={`text-3xl mx-auto mb-2 ${tab.color}`} />
                <p className="text-2xl font-bold">{tab.count}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {tab.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllOrders;
