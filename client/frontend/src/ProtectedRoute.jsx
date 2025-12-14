import { Navigate } from "react-router-dom";
import { useAuth } from "./auth/useAuth";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const auth = useAuth();

  if (!auth || !auth.user) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && auth.user.role !== "admin") {
    return <Navigate to="/sweets" replace />;
  }

  return children;
};

export default ProtectedRoute;
