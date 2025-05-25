import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <ul className="navList">
        <li className="navItem">
          <Link to="/" className="navLink">Home</Link>
        </li>
        <li className="navItem">
          <Link to="/patients" className="navLink">Patient List</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
