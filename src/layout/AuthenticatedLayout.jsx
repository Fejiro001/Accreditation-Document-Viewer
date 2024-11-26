import PropTypes from "prop-types";
import NavBar from "../components/NavBar";

function AuthenticatedLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen items-center bg-slate-100 dark:bg-black">
      <NavBar />
      {children}
    </div>
  );
}

AuthenticatedLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthenticatedLayout;
