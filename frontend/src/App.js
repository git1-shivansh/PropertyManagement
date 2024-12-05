import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar2 from './components/Navbar2';
import Home from './pages/Home';
import Properties from './pages/Properties';
import Owners from './pages/Owners';
import Renters from './pages/Renters';
import PropertyDashboard from './pages/PropertyDashboard';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar2 />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/owners" element={<Owners />} />
            <Route path="/renters" element={<Renters />} />
            <Route path="/property-dashboard" element={<PropertyDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;