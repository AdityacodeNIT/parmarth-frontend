import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const {user,status} = useSelector(state => state.auth);
    if (status === "idle" || status === "loading") {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/userLogin" replace />;
  }

  // ⚠️ ROLE CHECK
  const role = user?.data?.role;
  

  // Check if user exists and has the required role
  if (!user || (allowedRoles && !allowedRoles.includes(user?.data?.role))) {
    return <Navigate to='/' replace />; // Redirect unauthorized users to home
  }

  return children;
};

export default ProtectedRoute;
