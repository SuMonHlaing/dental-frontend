import React, { useState } from "react";
import {
  Home,
  Info,
  Phone,
  Stethoscope,
  Users,
  Menu,
  X,
  LogIn,
  UserPlus,
  LogOut,
  User,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/services", icon: Stethoscope, label: "Services" },
    { path: "/doctors", icon: Users, label: "Doctors" },
    { path: "/contact", icon: Phone, label: "Contact" },
    { path: "/about", icon: Info, label: "About" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Stethoscope className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">
                DentalCare
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-blue-600"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden lg:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive(link.path)
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            ))}

            {isAuthenticated ? (
              <>
                <Link
                  to="/profile"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                    isActive("/profile")
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                >
                  <User className="h-4 w-4" />
                  <span>{user?.name || "Profile"}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-blue-600"
                >
                  <LogIn className="h-4 w-4" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.path)
                  ? "text-blue-600 bg-blue-50"
                  : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          ))}

          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                  isActive("/profile")
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
              <Link
                to="/register"
                className="flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white hover:bg-blue-700"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserPlus className="h-5 w-5" />
                <span>Register</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
