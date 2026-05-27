import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Mayank Store</div>

      <div className="navbar-links">
        <Link to="/" className="nav-link">
          Main
        </Link>

        <Link to="/home" className="nav-link">
          Home
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;