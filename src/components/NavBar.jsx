import { Link } from "react-router-dom";
import api from "../api";
import logo from "../assets/lbs-logo-white.png";
import PropTypes from "prop-types";
export default function NavBar({ userName }) {
  const logout = async () => {
    try {
      await api.post("/logout");

      document.cookie = "authToken=; Max-Age=-99999999;";

      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <nav className="w-full bg-[#12355B]">
      <div className="flex h-fit justify-between md:h-20">
        <Link to="/">
          <div className="flex items-center py-2 px-8">
            <img
              src={logo}
              alt="Lagos Business School logo"
              className="block h-14 w-auto fill-current text-black dark:text-white"
            />
          </div>
        </Link>

        <div className="flex items-center justify-evenly gap-6 pe-6">
          <div className="relative">
            <div className="flex items-center gap-2 p-2 hover:cursor-pointer">
              <span className=" text-white">
                Welcome, {userName ? userName : "Guest"}
              </span>
              <svg
                className="w-auto h-3 fill-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z" />
              </svg>
            </div>

            <div>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  userName: PropTypes.string,
};
