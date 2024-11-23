import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <img className="navbar__logo" src="../../public/img/logo.png" alt="Foxbel Logo" />
        </Link>
      </div>
      <ul className="menu">
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/tracks">Buscar</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
