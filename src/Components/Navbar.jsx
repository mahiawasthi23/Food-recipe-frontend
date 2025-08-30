import { Link } from "react-router-dom"; 
import "./Navbar.css"; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">RecipeApp</h2>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
};

export default Navbar;
