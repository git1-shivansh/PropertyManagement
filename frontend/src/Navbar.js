import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between">
        <Link to="/" className="text-xl font-bold">Property Management</Link>
        <div className="space-x-4">
          <Link to="/properties" className="hover:text-gray-300">Properties</Link>
          <Link to="/owners" className="hover:text-gray-300">Owners</Link>
          <Link to="/renters" className="hover:text-gray-300">Renters</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;