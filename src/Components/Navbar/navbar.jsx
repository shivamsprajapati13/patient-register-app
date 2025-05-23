import React from 'react';
import './Navbar.css';  // Import the updated CSS

function Navbar() {
  return (
    <div className="navbar">
      <ul className="navList">
        <li className="navItem"><a href="#home" className="navLink">Home</a></li>
        <li className="navItem"><a href="#register" className="navLink">Register Patient</a></li>
        <li className="navItem"><a href="#patients" className="navLink">Patient List</a></li>
      </ul>
    </div>
  );
}

export default Navbar;
