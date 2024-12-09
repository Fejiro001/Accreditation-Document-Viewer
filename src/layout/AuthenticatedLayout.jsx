import PropTypes from "prop-types";
import NavBar from "../components/NavBar";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

function AuthenticatedLayout({ children, className }) {
  const { isAuthenticated, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center bg-slate-100 dark:bg-black">
      <NavBar />
      <div
        className={`${
          className || ""
        } flex flex-col justify-center w-full max-w-[60rem] px-10 py-16`}
      >
        {isAuthenticated && children}
      </div>
    </div>
  );
}

AuthenticatedLayout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default AuthenticatedLayout;
