import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Loader2, LogIn } from "lucide-react";

import UserContext from "../../context/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";

const Userlogin = () => {
  const { getUserDetail } = useContext(UserContext);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setErrorMessage("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/login`,
        loginData,
        { withCredentials: true }
      );

      if (response.status >= 200 && response.status < 300) {
        getUserDetail(response.data);
        navigate("/user");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Invalid username or password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

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
          {errorMessage && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="space-y-1">
                 <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="Username"
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
              placeholder="Password"
              value={loginData.password}
              onChange={handleInputChange}
              required
            />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
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
