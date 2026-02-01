import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MdPeople,
  MdInventory,
  MdShoppingCart,
  MdAttachMoney,
  MdTrendingUp,
  MdTrendingDown,
  MdVerifiedUser,
  MdPending,
} from "react-icons/md";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      // Fetch stats from your API
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/v1/users/dashboard-stats`,
        { withCredentials: true }
      );
      setStats(response.data.data);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      // Show error message instead of dummy data
      setStats(null);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-destructive">Failed to Load Dashboard</h2>
          <p className="text-muted-foreground mt-2">Unable to fetch dashboard statistics</p>
        </div>
        <button
          onClick={fetchDashboardStats}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
        >
          Retry
        </button>
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Users",
      value: stats?.totalUsers || 0,
      icon: MdPeople,
      color: "text-blue-500",
    
      link: "/admin/users",
      growth: stats?.userGrowth,
    },
    {
      title: "Total Products",
      value: stats?.totalProducts || 0,
      icon: MdInventory,
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
      link: "/admin/products",
    },
    {
      title: "Total Orders",
      value: stats?.totalOrders || 0,
      icon: MdShoppingCart,
      color: "text-green-500",
     
      link: "/admin/orders",
    },
    {
      title: "Total Revenue",
      value: `₹${(stats?.totalRevenue || 0).toLocaleString()}`,
      icon: MdAttachMoney,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      growth: stats?.revenueGrowth,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <Link key={index} to={stat.link || "#"}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`text-xl ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.growth && (
                  <div className="flex items-center gap-1 mt-1">
                    {stat.growth > 0 ? (
                      <>
                        <MdTrendingUp className="text-green-500" />
                        <span className="text-xs text-green-500">
                          +{stat.growth}% from last month
                        </span>
                      </>
                    ) : (
                      <>
                        <MdTrendingDown className="text-red-500" />
                        <span className="text-xs text-red-500">
                          {stat.growth}% from last month
                        </span>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link to="/admin/sellers?status=pending">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Sellers</CardTitle>
              <MdPending className="text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.pendingSellers || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting approval
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/sellers?status=approved">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Approved Sellers</CardTitle>
              <MdVerifiedUser className="text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.approvedSellers || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Active sellers
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/admin/products?status=pending">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Products</CardTitle>
              <MdInventory className="text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats?.pendingProducts || 0}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Awaiting approval
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/admin/sellers?status=pending"
              className="p-4 border rounded-lg hover:bg-accent transition-colors text-center"
            >
              <MdPending className="text-2xl mx-auto mb-2 text-orange-500" />
              <p className="text-sm font-medium">Review Sellers</p>
            </Link>
            <Link
              to="/admin/products?status=pending"
              className="p-4 border rounded-lg hover:bg-accent transition-colors text-center"
            >
              <MdInventory className="text-2xl mx-auto mb-2 text-purple-500" />
              <p className="text-sm font-medium">Approve Products</p>
            </Link>
            <Link
              to="/admin/orders"
              className="p-4 border rounded-lg hover:bg-accent transition-colors text-center"
            >
              <MdShoppingCart className="text-2xl mx-auto mb-2 text-green-500" />
              <p className="text-sm font-medium">View Orders</p>
            </Link>
            <Link
              to="/admin/users"
              className="p-4 border rounded-lg hover:bg-accent transition-colors text-center"
            >
              <MdPeople className="text-2xl mx-auto mb-2 text-blue-500" />
              <p className="text-sm font-medium">Manage Users</p>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
