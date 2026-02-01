import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Loader2, Mail, ArrowLeft } from "lucide-react";

import { verifyOTP, resendOTP, clearError } from "@/features/Auth/authSlice";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { loadWishlist } from "@/features/wishlist/wishlistslice";

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error, user, userId, userEmail } = useSelector((state) => state.auth);

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  
  const inputRefs = useRef([]);

  // Redirect if no userId (user didn't come from login)
  useEffect(() => {
    if (!userId) {
      navigate("/userLogin");
    }
  }, [userId, navigate]);

  // Timer for resend OTP
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  // Navigate after successful verification
  useEffect(() => {
    if (status === "authenticated" && user) {
      dispatch(loadWishlist());
      navigate("/user");
    }
  }, [status, user, dispatch, navigate]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split("");
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill("")]);
    
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    
    if (otpString.length !== 6) {
      return;
    }

    dispatch(verifyOTP({ userId, otp: otpString }));
  };

  const handleResend = () => {
    if (!canResend) return;
    
    dispatch(resendOTP(userId));
    setResendTimer(60);
    setCanResend(false);
    setSuccessMessage("New OTP sent to your email");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleBackToLogin = () => {
    navigate("/userLogin");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Mail className="w-6 h-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">Verify Your Email</CardTitle>
          <p className="text-sm text-muted-foreground">
            We've sent a 6-digit code to
            <br />
            <span className="font-medium text-foreground">{userEmail}</span>
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {successMessage && (
            <Alert>
              <AlertDescription className="text-green-600">
                {successMessage}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleVerify} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 text-center text-2xl font-semibold border-2 rounded-lg focus:border-primary focus:outline-none transition-colors bg-background"
                  disabled={status === "loading"}
                />
              ))}
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={status === "loading" || otp.join("").length !== 6}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying…
                </>
              ) : (
                "Verify OTP"
              )}
            </Button>
          </form>

          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Didn't receive the code?
            </p>
            <Button
              variant="link"
              onClick={handleResend}
              disabled={!canResend}
              className="text-sm"
            >
              {canResend ? (
                "Resend OTP"
              ) : (
                `Resend in ${resendTimer}s`
              )}
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={handleBackToLogin}
            className="w-full"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyOtp;
