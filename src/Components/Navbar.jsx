import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";
import logo from "../assets/logo3Recipe.png"; 

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <h2 className="logo">RecipeApp</h2>

      <div className="menu-toggle" onClick={() => setMenuOpen((prev) => !prev)}>
        ☰
      </div>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <NavLink to="/" end className="nav-link" onClick={() => setMenuOpen(false)}>
          Home
        </NavLink>

        {!user && (
          <>
            <NavLink to="/login" className="nav-link" onClick={() => setMenuOpen(false)}>
              Login
            </NavLink>
            <NavLink to="/signup" className="nav-link" onClick={() => setMenuOpen(false)}>
              Sign Up
            </NavLink>
          </>
        )}

        {user && (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        )}

      </div>
    </nav>
  );
};

export default Navbar;