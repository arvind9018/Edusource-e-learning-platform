import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaUserCircle, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  useEffect(() => {
    const darkMode = localStorage.getItem("dark") === "true";
    const authStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsDark(darkMode);
    setIsLoggedIn(authStatus);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    const nextTheme = !isDark;
    setIsDark(nextTheme);
    localStorage.setItem("dark", nextTheme);
    document.documentElement.classList.toggle("dark", nextTheme);
  };

  const handleSpecializationClick = () => {
    if (location.pathname === "/dashboard") {
      const section = document.getElementById("specializations");
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Search: ${search}`);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide hover:text-yellow-300 transition"
        >
          🎓 Edusource
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center bg-white rounded-full px-3 py-1 w-64"
          >
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none px-2 py-1 w-full text-black"
            />
          </form>

          <Link to="/dashboard" className="hover:text-yellow-300">
            Home
          </Link>
          <Link to="/dashboard" onClick={handleSpecializationClick} className="hover:text-yellow-300">
            Specializations
          </Link>
          <Link to="/dashboard" className="hover:text-yellow-300">
            Courses
          </Link>

          <button onClick={toggleTheme} className="text-xl hover:text-yellow-300">
            {isDark ? <FaMoon /> : <FaSun />}
          </button>

          {isLoggedIn ? (
            <div className="relative" ref={menuRef}>
              <FaUserCircle
                className="text-2xl cursor-pointer hover:text-yellow-300"
                onClick={() => setUserMenuOpen((prev) => !prev)}
              />
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                  <Link
                    to="/user-dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    User Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-slate-900 font-semibold px-4 py-2 rounded-full hover:bg-yellow-200"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-white text-black p-4 rounded-lg">
          <form onSubmit={handleSearchSubmit} className="flex items-center bg-gray-100 rounded-full px-3 py-1">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none px-2 py-1 w-full"
            />
          </form>

          <Link to="/dashboard" className="hover:text-indigo-600" onClick={() => setMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/dashboard" onClick={() => {
            handleSpecializationClick();
            setMobileMenuOpen(false);
          }} className="hover:text-indigo-600">
            Specializations
          </Link>
          <Link to="/dashboard" className="hover:text-indigo-600" onClick={() => setMobileMenuOpen(false)}>
            Courses
          </Link>

          <button onClick={toggleTheme} className="text-left hover:text-indigo-600">
            {isDark ? "🌙 Dark Mode" : "☀️ Light Mode"}
          </button>

          {isLoggedIn ? (
            <>
              <Link to="/user-dashboard" onClick={() => setMobileMenuOpen(false)} className="hover:text-indigo-600">
                User Dashboard
              </Link>
              <button onClick={() => {
                handleLogout();
                setMobileMenuOpen(false);
              }} className="text-red-600 text-left">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="text-blue-600 font-semibold">
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
