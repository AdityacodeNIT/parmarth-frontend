import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";
import {
  MdAdminPanelSettings,
  MdPeople,
  MdInventory,
  MdShoppingCart,
  MdVerifiedUser,
  MdDashboard,
  MdLogout,
  MdSettings,
  MdNotifications,
  MdCheckCircle,
} from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const linkBase =
  "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all hover:bg-accent";
const activeLink = " text-primary-foreground shadow-md";
const inactiveLink = "text-muted-foreground hover:text-foreground";

const AdminLayout = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      // Fetch pending items that need admin attention
      const [sellersRes, statsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/sellers?status=pending&limit=5`, {
          withCredentials: true,
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/dashboard-stats`, {
          withCredentials: true,
        }),
      ]);

      const pendingSellers = sellersRes.data?.data?.sellers || [];
      const pendingProductsCount = statsRes.data?.data?.pendingProducts || 0;

      const notifs = [
        ...pendingSellers.map((seller) => ({
          id: `seller-${seller._id}`,
          type: "seller",
          title: "New Seller Application",
          message: `${seller.businessName || seller.fullName} is waiting for approval`,
          link: "/admin/sellers?status=pending",
          time: new Date(seller.createdAt).toLocaleDateString(),
        })),
      ];

      // Add product notification if there are pending products
      if (pendingProductsCount > 0) {
        notifs.push({
          id: "products-pending",
          type: "product",
          title: "Products Need Approval",
          message: `${pendingProductsCount} product${pendingProductsCount > 1 ? "s" : ""} waiting for review`,
          link: "/admin/products?status=pending",
          time: "Pending",
        });
      }

      setNotifications(notifs.slice(0, 5)); // Show max 5 notifications
      setNotificationCount(pendingSellers.length + pendingProductsCount);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      setNotifications([]);
      setNotificationCount(0);
    }
  };

  const handleLogout = () => {
    // Implement logout logic
    navigate("/userLogin");
  };

  const handleNotificationClick = (link) => {
    navigate(link);
  };

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* ───────── Sidebar ───────── */}
      <aside className="w-64 border-r bg-card flex flex-col shadow-sm">
        {/* Logo / Title */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
              <MdAdminPanelSettings className="text-primary-foreground text-xl" />
            </div>
            <div>
              <h2 className="font-bold text-lg">Admin Panel</h2>
              <p className="text-xs text-muted-foreground">Management Console</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <MdDashboard className="text-lg" />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <MdPeople className="text-lg" />
            <span>Users</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <MdInventory className="text-lg" />
            <span>Products</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <MdShoppingCart className="text-lg" />
            <span>Orders</span>
          </NavLink>

          <NavLink
            to="/admin/sellers"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? activeLink : inactiveLink}`
            }
          >
            <MdVerifiedUser className="text-lg" />
            <span>Sellers</span>
          </NavLink>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-3 h-auto p-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback>{user?.fullName?.[0] || "A"}</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium">{user?.fullName || "Admin"}</p>
                  <p className="text-xs text-muted-foreground">{user?.role || "Administrator"}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <MdSettings className="mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <MdLogout className="mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Footer */}
        <div className="p-4 border-t text-xs text-center text-muted-foreground">
          © {new Date().getFullYear()} E-Commerce
        </div>
      </aside>

      {/* ───────── Main Content ───────── */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-card px-8 py-4 flex items-center justify-between shadow-sm">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-sm text-muted-foreground">Manage your e-commerce platform</p>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <MdNotifications className="text-xl" />
                  {notificationCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {notificationCount > 9 ? "9+" : notificationCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel className="flex items-center justify-between">
                  <span>Notifications</span>
                  {notificationCount > 0 && (
                    <Badge variant="secondary">{notificationCount} pending</Badge>
                  )}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                
                {notifications.length > 0 ? (
                  <>
                    {notifications.map((notif) => (
                      <DropdownMenuItem
                        key={notif.id}
                        onClick={() => handleNotificationClick(notif.link)}
                        className="flex flex-col items-start gap-1 p-3 cursor-pointer"
                      >
                        <div className="flex items-start gap-2 w-full">
                          <div className="mt-1">
                            {notif.type === "seller" ? (
                              <MdVerifiedUser className="text-orange-500" />
                            ) : (
                              <MdInventory className="text-purple-500" />
                            )}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{notif.title}</p>
                            <p className="text-xs text-muted-foreground">{notif.message}</p>
                            <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => navigate("/admin/sellers?status=pending")}
                      className="text-center justify-center text-primary"
                    >
                      View All Notifications
                    </DropdownMenuItem>
                  </>
                ) : (
                  <div className="p-8 text-center">
                    <MdCheckCircle className="text-4xl text-green-500 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">All caught up!</p>
                    <p className="text-xs text-muted-foreground">No pending items</p>
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Routed Content */}
        <section className="flex-1 overflow-auto p-8 bg-muted/30">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default AdminLayout;
