import { Navigate } from "react-router-dom";
import { useAuth } from "./auth/useAuth";

const AdminRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== "admin") {
    return <Navigate to="/sweets" replace />;
  }

  return children;
};

export default AdminRoute;
