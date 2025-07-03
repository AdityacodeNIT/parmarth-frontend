import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const VerifyOtp = () => {

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

      const userId = localStorage.getItem("otpUserId"); // ✅ get userId

  if (!userId) {
    setMessage("User ID not found. Please register again.");
    setLoading(false);
    return;
  }

    setLoading(true);
    setMessage("");



    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/v1/users/verify-otp`,
        {otp, userId },
      );
      if(res){
      setMessage(res.data.message || "Verified successfully!");
          localStorage.removeItem("otpUserId"); // ✅ Clean up
      navigate("/userLogin")


      }
    } catch (err) {
      setMessage(
        err?.response?.data?.message || "OTP verification failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <form
        onSubmit={handleVerify}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-md space-y-4"
      >
        <h2 className="text-2xl font-bold text-center">Verify Your Email</h2>
        

        <input
          type="text"
          required
          placeholder="Enter OTP"
          className="w-full border p-2 rounded-md"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Verifying..." : "Verify OTP"}
        </button>

        {message && (
          <p
            className={`text-center ${
              message.toLowerCase().includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default VerifyOtp;
