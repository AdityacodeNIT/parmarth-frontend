import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  MdLogout,
  MdCheckCircle,
  MdArrowBack,
  MdHome,
  MdShoppingBag,
  MdPerson,
} from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { logout } from "@/features/Auth/authSlice";
import { userAPI } from "@/api/userAPI";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [logoutSuccess, setLogoutSuccess] = useState(false);

  const logoutUser = async () => {
    setIsLoggingOut(true);

    try {
      const response = await userAPI.logout();

      if (response.status === 200) {
        // Clear Redux auth state
        dispatch(logout());
        setLogoutSuccess(true);

        // Redirect after showing success message
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        alert("Unexpected response from server. Please try again.");
        setIsLoggingOut(false);
      }
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Failed to logout. Please check your network.");
      setIsLoggingOut(false);
    }
  };

  const quickActions = [
    {
      icon: MdHome,
      label: "Home",
      description: "Return to homepage",
      action: () => navigate("/"),
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: MdShoppingBag,
      label: "Shop",
      description: "Continue shopping",
      action: () => navigate("/shop"),
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: MdPerson,
      label: "Profile",
      description: "View your profile",
      action: () => navigate("/user"),
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  if (logoutSuccess) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center">
          <CardContent className="pt-12 pb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6">
              <MdCheckCircle className="text-6xl text-green-500" />
            </div>
            <h2 className="text-3xl font-bold mb-3">Logged Out Successfully</h2>
            <p className="text-muted-foreground mb-6">
              You have been safely logged out. Redirecting to homepage...
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Main Logout Card */}
          <Card className="lg:col-span-2">
            <CardHeader className="text-center pb-4">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4 mx-auto">
                <MdLogout className="text-4xl text-destructive" />
              </div>
              <CardTitle className="text-3xl">Confirm Logout</CardTitle>
              <p className="text-muted-foreground mt-2">
                {user?.fullName ? `Goodbye, ${user.fullName}!` : "Are you sure you want to leave?"}
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted/50 rounded-lg p-6 space-y-3">
                <h3 className="font-semibold text-lg">Before you go...</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Your cart items will be saved for your next visit</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>You'll need to log in again to access your account</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>Your wishlist and orders will remain safe</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="destructive"
                  size="lg"
                  className="flex-1"
                  onClick={logoutUser}
                  disabled={isLoggingOut}
                >
                  {isLoggingOut ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Logging out...
                    </>
                  ) : (
                    <>
                      <MdLogout className="mr-2" />
                      Yes, Logout
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="flex-1"
                  onClick={() => navigate(-1)}
                  disabled={isLoggingOut}
                >
                  <MdArrowBack className="mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-center">Or continue exploring</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  onClick={action.action}
                  disabled={isLoggingOut}
                  className="group p-6 border rounded-lg hover:border-primary/50 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className={`w-12 h-12 rounded-lg ${action.bgColor} flex items-center justify-center mb-3 mx-auto group-hover:scale-110 transition-transform`}>
                    <action.icon className={`text-2xl ${action.color}`} />
                  </div>
                  <h4 className="font-semibold mb-1">{action.label}</h4>
                  <p className="text-xs text-muted-foreground">{action.description}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* User Info */}
        {user && (
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Logged in as <span className="font-medium text-foreground">{user.email}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Logout;
