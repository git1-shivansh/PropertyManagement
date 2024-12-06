import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../Navbar2.css'; // Import the CSS file for styling

function Navbar2() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      {/* Left Section - Menu */}
      <div className="menu-section">
        <button
          onClick={toggleDropdown}
          className="menu-button"
          aria-label="Toggle Menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
          <span className="menu-text">Menu</span>
        </button>

        {dropdownOpen && (
          <ul className="dropdown-menu">
            <li>
              <Link to="/" onClick={closeDropdown}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/owners" onClick={closeDropdown}>
                Owners
              </Link>
            </li>
            <li>
              <Link to="/renters" onClick={closeDropdown}>
                Renters
              </Link>
            </li>
            <li>
              <Link to="/properties" onClick={closeDropdown}>
                Properties
              </Link>
            </li>
            <li>
              <Link to="/property-dashboard" onClick={closeDropdown}>
                Dashboard
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
}

export default Navbar2;
