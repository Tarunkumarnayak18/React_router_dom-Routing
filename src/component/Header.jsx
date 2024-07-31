import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header>
      <nav className="navbar">
        <ul className="list">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/githubfinder">GitHubFinder</NavLink>
          </li>
          <li>
            <NavLink to="/moviefinder">MovieFinder</NavLink>
          </li>
          <li>
            <NavLink to="/weatherfinder">WeatherFinder</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
