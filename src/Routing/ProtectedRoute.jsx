import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated && localStorage.getItem("token") == null) {
    // hna fe 7alt el token low msh mogod msh hywadeh ay Page tanya 3'er Login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
