import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = useSelector(state => state.auth.user);

  // Check if user exists and has the required role
  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return <Navigate to='/' replace />; // Redirect unauthorized users to home
  }

  return children;
};

export default ProtectedRoute;
