import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div>© {new Date().getFullYear()} Mayank Store. All rights reserved.</div>
      <div className="footer-links">
        <Link to="/" className="footer-link">
          Main
        </Link>
        <Link to="/home" className="footer-link">
          Home
        </Link>
        <Link to="/products" className="footer-link">
          Products
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
