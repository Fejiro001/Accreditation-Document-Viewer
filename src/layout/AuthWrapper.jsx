import { useLocation } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthProvider";

// eslint-disable-next-line react/prop-types
const AuthWrapper = ({ children }) => {
  const location = useLocation();
  const isLoginRoute = location.pathname === "/login"; // Replace with your actual login route path

  // Only wrap with AuthProvider if not on the login route
  return isLoginRoute ? (
    <>{children}</>
  ) : (
    <AuthProvider>{children}</AuthProvider>
  );
};

export default AuthWrapper;
