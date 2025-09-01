import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo3Recipe.png"; 

const Navbar = () => {
  return (
    <nav className="navbar">
     
      <div className="logo">
        <img src={logo} alt="RecipeApp Logo" className="logo-img" />
        <span>RecipeApp</span>
      </div>

    
      <div className="nav-links">
        <NavLink to="/" end className="nav-link">Home</NavLink>
        <NavLink to="/login" className="nav-link">Login</NavLink>
        <NavLink to="/signup" className="nav-link">SignUp</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;



