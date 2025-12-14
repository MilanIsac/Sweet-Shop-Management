import { Navigate } from "react-router-dom";
import { useAuth } from "./auth/useAuth";

const ProtectedRoute = ({ children }) => {
  const auth = useAuth();

  if (!auth || !auth.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
