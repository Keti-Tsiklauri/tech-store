import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  const handleLinkClick = () => {
    setShowMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="logo" style={{ color: "#e0d4f7", fontWeight: "700" }}>
        TechStore
      </div>

      <div className={`nav-links ${showMenu ? "show" : ""}`}>
        <NavLink to="/" className="link" onClick={handleLinkClick}>
          Main
        </NavLink>
        <NavLink to="/mobile-phones" className="link" onClick={handleLinkClick}>
          Mobile Phones
        </NavLink>

        <NavLink to="/laptops" className="link" onClick={handleLinkClick}>
          Laptops
        </NavLink>

        <NavLink to="/cart" className="link" onClick={handleLinkClick}>
          Cart
        </NavLink>
        <NavLink to="/review" className="link" onClick={handleLinkClick}>
          Reviews
        </NavLink>
      </div>

      <div className="hamburger" onClick={() => setShowMenu(!showMenu)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
}
