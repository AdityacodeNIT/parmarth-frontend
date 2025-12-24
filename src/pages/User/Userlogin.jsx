import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader2, LogIn } from "lucide-react";

import { loginUser, verifyAuth } from "@/features/Auth/authSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { loadWishlist } from "@/features/wishlist/wishlistslice";

const Userlogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error,user } = useSelector((state) => state.auth);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  };

  // Navigate after successful login
useEffect(() => {
  if (status === "authenticated") {
    dispatch(verifyAuth());
       dispatch(loadWishlist());
  }
}, [status, dispatch]);

useEffect(() => {
  if (user) {
    navigate("/user");
  }
}, [user, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <LogIn className="w-6 h-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <p className="text-sm text-muted-foreground">
            Log in to continue to your account
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                name="username"
                value={loginData.username}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={status === "loading"}>
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Logging in…
                </>
              ) : (
                "Log In"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Userlogin;
