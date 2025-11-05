import { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="navbar">
      <div className="logo" style={{ color: " #e0d4f7", fontWeight: "700" }}>
        TechStore
      </div>

      <div className={`nav-links ${showMenu ? "show" : ""}`}>
        <NavLink to="/" className="link">
          Main
        </NavLink>
        <NavLink to="/mobile-phones" className="link">
          Mobile Phones
        </NavLink>
        <NavLink to="/laptops" className="link">
          Laptops
        </NavLink>
        <NavLink to="/computers" className="link">
          Computers
        </NavLink>
        <NavLink to="/accessories" className="link">
          Accessories
        </NavLink>
        <NavLink to="/cart" className="link">
          Cart
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
