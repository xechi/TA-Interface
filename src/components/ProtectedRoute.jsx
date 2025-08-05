import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/ServiceContext";

const ProtectedRoute = ({ requireAuth = false, guestOnly = false }) => {
  const { token } = useAuth();
  const isAuthenticated = !!token;

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (guestOnly && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
