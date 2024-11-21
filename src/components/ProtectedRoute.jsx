/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  // Redirect unauthenticated users to /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Render the protected component
  return children;
}

export default ProtectedRoute;
