import React from "react";
import { Link } from "react-router-dom";
import { User, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useSelector } from "react-redux";

const UserDetails = () => {
  /* --------- AUTH FROM REDUX --------- */
  const { user, status } = useSelector((state) => state.auth);

  /* --------- NOT LOGGED IN --------- */
 if (status === "loading") {
  return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
}

if (status === "unauthenticated") {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card>
        <CardContent className="p-8 text-center space-y-4">
          <h2 className="text-xl font-semibold">You are not logged in</h2>
          <Button asChild>
            <Link to="/userLogin">Log In</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}


  /* --------- USER DATA --------- */
  const data = user?.data
  const role = data?.role || "customer";
  console.log(role)

  const actionsByRole = {
    superadmin: [
      { to: "/admin", label: "Admin Panel" },
      { to: "/helpdesk", label: "Helpdesk" },
      { to: "/logout", label: "Log Out" },
    ],
    seller: [
      { to: "/sellerDashboard", label: "Seller Dashboard" },
      { to: "/seller/products", label: "My Products" },
      { to: "/seller/addProduct", label: "Add Product" },
      { to: "/seller/orders", label: "Orders" },
      { to: "/updateDetails", label: "Update Profile" },
      { to: "/helpdesk", label: "Helpdesk" },
      { to: "/logout", label: "Log Out" },
    ],
    customer: [
      { to: "/cart", label: "My Cart" },
      { to: "/myOrder", label: "My Orders" },
      { to: "/wishlist", label: "Wishlist" },
      { to: "/seller", label: "Become a Seller" },
      { to: "/updateDetails", label: "Update Details" },
      { to: "/helpdesk", label: "Helpdesk" },
      { to: "/logout", label: "Log Out" },
    ],
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* LEFT: PROFILE */}
        <Card className="lg:col-span-1">
          <CardContent className="p-8 flex flex-col items-center text-center space-y-6">
            {data?.avatar ? (
              <img
                src={data.avatar}
                alt="User Avatar"
                className="w-28 h-28 rounded-full object-cover border border-border"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-muted border border-border flex items-center justify-center">
                <User className="w-12 h-12 text-muted-foreground" />
              </div>
            )}

            <div className="space-y-1">
              <h2 className="text-2xl font-semibold">{data?.username}</h2>
              <p className="text-sm text-muted-foreground">{data?.email}</p>
            </div>

            <Separator />

            <p className="text-sm">
              <span className="font-medium">Full Name:</span>{" "}
              {data?.fullName || "—"}
            </p>
          </CardContent>
        </Card>

        {/* CENTER: ACTIONS */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-xl">Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {actionsByRole[role].map((action) => (
              <Button
                key={action.to}
                variant="ghost"
                className="w-full justify-between no-underline!"
                asChild
              >
                <Link to={action.to}>
                  <span>{action.label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* RIGHT: INFO */}
        <Card className="lg:col-span-1">
          <CardContent className="p-10 flex items-center justify-center text-center">
            <div className="space-y-3">
              <p className="text-lg font-medium">
                Your account is evolving 🚀
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                We’re working on analytics, saved addresses, faster checkout,
                and seller insights to enhance your experience.
              </p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default UserDetails;
