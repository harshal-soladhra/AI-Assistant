import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../store/auth";

export const Navbar = () => {
  const { isLoggedIn, user } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-container">

        {/* LOGO */}
        <div className="logo">
          <NavLink to="/">EduLearn</NavLink>
          {user && <span className="nav-item greeting">Hi, {user.username}!</span>}
        </div>

        {/* RIGHT SECTION */}
        <div className="right-section">

          {/* NAV LINKS */}
          <nav className="nav-links">
            <NavLink to="/" className="nav-item">
              Home
            </NavLink>

            <NavLink to="/about" className="nav-item">
              About
            </NavLink>

            <NavLink to="/service" className="nav-item">
              Courses
            </NavLink>

            <NavLink to="/contact" className="nav-item">
              Contact
            </NavLink>
          </nav>

          {/* AUTH LINKS */}
          <div className="auth-links">
            {isLoggedIn ? (
              <>
                <NavLink to="/logout" className="nav-item">
                  Logout
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/login" className="nav-item">
                  Login
                </NavLink>

                <NavLink to="/register" className="signup-btn">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};