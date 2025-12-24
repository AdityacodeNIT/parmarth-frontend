import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser, logout } from "@/features/Auth/authSlice";

const RefreshAuth = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const restoreSession = async () => {
      try {
        // 1️⃣ Refresh access token (cookie-based)
        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/v1/users/refresh-token`,
          {},
          { withCredentials: true }
        );

        // 2️⃣ Fetch user data
        const me = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/v1/users/me`,
          { withCredentials: true }
        );
        console.log(me.data);
        if(me.data){

        dispatch(setUser(me.data));
        }
      } catch (err) {
        dispatch(logout());
      }
    };

    restoreSession();
  }, [dispatch]);

  return children;
};

export default RefreshAuth;
