import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "./UserContext";

const ProtectedRoute = ({ children, allowedRoles }) => {

  const { userDetail } = useContext(UserContext);
  console.log(userDetail)
  const user = userDetail?.data?.user;

  useEffect(()=>
console.log(userDetail),[])

  // Check if user exists and has the required role
  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return <Navigate to="/" replace />; // Redirect unauthorized users to home
  }

  return children;
};

export default ProtectedRoute;
