import React from 'react';
import '../Home.css'; // Import the CSS file

function Home() {
  return (
    <div className="home-container">
      <div className="overlay">
        <div className="home-content">
          <h1 className="home-title">Welcome to Property Management</h1>
          <p className="home-subtitle">
            Manage your properties, owners, and renters all in one place.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
