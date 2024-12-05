import { Link } from "react-router-dom";
import api from "../api";
import logo from "../assets/lbs-logo-white.png";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
export default function NavBar({ userName, userRole }) {
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownVisibility(true);
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, []);

  const logout = async () => {
    try {
      await api.post("/logout");

      document.cookie = "authToken=; Max-Age=-99999999;";

      window.location.href = "/login";
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  const toggleDropdown = () => {
    setDropdownVisibility((prev) => !prev);
  };

  return (
    <nav className="w-full bg-primary-color text-white">
      <div className="flex h-fit justify-between items-center md:h-20 px-6">
        <Link to="/">
          <div className="flex items-center py-2 ">
            <img
              src={logo}
              alt="Lagos Business School logo"
              className="block h-14 w-auto fill-current text-black dark:text-white"
            />
          </div>
        </Link>

        <div className="relative">
          <button
            aria-haspopup="true"
            onClick={toggleDropdown}
            className="flex items-center gap-2 p-2 hover:cursor-pointer relative"
          >
            <span>Welcome, {userName ? userName : "Guest"}</span>
            <svg
              className="w-auto h-3 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M207 381.5L12.7 187.1c-9.4-9.4-9.4-24.6 0-33.9l22.7-22.7c9.4-9.4 24.5-9.4 33.9 0L224 284.5l154.7-154c9.4-9.3 24.5-9.3 33.9 0l22.7 22.7c9.4 9.4 9.4 24.6 0 33.9L241 381.5c-9.4 9.4-24.6 9.4-33.9 0z" />
            </svg>
          </button>

          {dropdownVisibility && (
            <div
              aria-expanded={dropdownVisibility}
              role="menu"
              ref={dropdownRef}
              className="grid absolute top-16 bg-primary-color p-2 rounded-md w-full space-y-2 text-center"
            >
              {userRole === "admin" && (
                <>
                  <a href="/admin/users/add" role="menuitem">
                    Add Users
                  </a>
                  <hr className=" opacity-30" />
                  <a href="/admin/users" role="menuitem">
                    Manage Users
                  </a>
                  <hr className=" opacity-30" />
                </>
              )}
              <button role="menuitem" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  userName: PropTypes.string,
  userRole: PropTypes.string,
};
