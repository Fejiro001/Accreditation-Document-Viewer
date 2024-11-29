import PropTypes from "prop-types";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";

function AuthenticatedLayout({ children }) {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/user");
        setUserName(response.data.name);
        setIsAuthenticated(true);
      } catch (error) {
        console.log(error);
        navigate("/login", {
          state: {
            message: "You must be logged in to view this page.",
          },
        });
      }
    };

    checkAuth();
  });

  return (
    <div className="flex flex-col min-h-screen items-center bg-slate-100 dark:bg-black">
      <NavBar userName={userName} />
      {isAuthenticated && children}
    </div>
  );
}

AuthenticatedLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthenticatedLayout;
