import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import PropTypes from "prop-types";
import { AuthContext } from "./AuthContext";

/**
 * AuthProvider component that manages user authentication state and provides
 * authentication-related functionality to its children components.
 *
 * @param {Object} props
 * @param {ReactNode} props.children
 *
 * @returns {JSX.Element}
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const response = await api.get("/user");
      const name = response.data.name;
      setUser(response.data);
      localStorage.setItem("userName", name);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
      navigate("/login", {
        state: {
          message: "You must be logged in to view this page.",
        },
      });
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.any,
};
