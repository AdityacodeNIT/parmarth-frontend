import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSellerInfo } from "../../features/seller/sellerslice.jsx";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Store, LogIn } from "lucide-react";

const SellerLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/seller/login`,
        loginData,
        { withCredentials: true }
      );

      if (response.status >= 200 && response.status < 300) {
        dispatch(setSellerInfo(response.data));
        navigate("/seller");
      }
    } catch (error) {
      console.error('Seller login error:', error);
      setErrorMessage(
        error.response?.data?.message || "Invalid login credentials. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-center mb-2">
            <div className="p-3 bg-primary/10 rounded-full">
              <Store className="w-8 h-8 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Seller Login</CardTitle>
          <CardDescription className="text-center">
            Access your seller dashboard
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleFormSubmit} className="space-y-4">
            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                name="username"
                placeholder="Enter your username"
                value={loginData.username}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleInputChange}
                required
                disabled={isLoading}
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <Alert variant="destructive">
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full"
              size="lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Logging in...
                </>
              ) : (
                <>
                  <LogIn className="w-4 h-4 mr-2" />
                  Login
                </>
              )}
            </Button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-3 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have a seller account?{" "}
              <Link to="/sellerRegister" className="text-primary hover:underline font-medium">
                Register here
              </Link>
            </p>
            <p className="text-muted-foreground">
              <Link to="/sellerForgotPassword" className="text-primary hover:underline font-medium">
                Forgot Password?
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerLogin;
