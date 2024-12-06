import React from 'react';
import { Link } from 'react-router-dom';
import '../Navbar2.css'; // Import the CSS file

function Navbar2() {
  return (
    <nav className="navbar">
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/owners">Owners</Link>
        </li>
        <li>
          <Link to="/renters">Renters</Link>
        </li>
        <li>
          <Link to="/properties">Properties</Link>
        </li>
        <li>
          <Link to="/property-dashboard">Dashboard</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar2;
