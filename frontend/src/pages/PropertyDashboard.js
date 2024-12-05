import React, { useState, useEffect } from 'react';
import { Search, Home, Bath, DollarSign, X, SlidersHorizontal } from 'lucide-react';
import '/Users/sshriv21/Desktop/CSE412/frontend/src/PropertyDashboard.css';

const PropertyDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    searchTerm: '',
  });

  const bedroomOptions = [1, 2, 3, 4, '5+'];
  const bathroomOptions = [1, 1.5, 2, 2.5, 3, '3+'];

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3001/api/properties');
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      searchTerm: '',
    });
  };

  const filteredProperties = properties.filter((property) => {
    if (
      !filters.minPrice &&
      !filters.maxPrice &&
      !filters.bedrooms &&
      !filters.bathrooms &&
      !filters.searchTerm
    ) {
      return true;
    }

    const matchesPrice =
      (!filters.minPrice || property.price >= Number(filters.minPrice)) &&
      (!filters.maxPrice || property.price <= Number(filters.maxPrice));
    const matchesBedrooms = !filters.bedrooms || property.numbedroom === Number(filters.bedrooms);
    const matchesBathrooms = !filters.bathrooms || property.numbathroom === Number(filters.bathrooms);
    const matchesSearch =
      !filters.searchTerm ||
      property.address.toLowerCase().includes(filters.searchTerm.toLowerCase());

    return matchesPrice && matchesBedrooms && matchesBathrooms && matchesSearch;
  });

  const renderFilters = () => (
    <div className="filters-panel">
      <div className="filters-grid">
        <div className="filter-input">
          <Search className="filter-icon" size={20} />
          <input
            type="text"
            name="searchTerm"
            placeholder="Search by address..."
            value={filters.searchTerm}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-input">
          <DollarSign className="filter-icon" size={20} />
          <input
            type="number"
            name="minPrice"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-input">
          <DollarSign className="filter-icon" size={20} />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={handleFilterChange}
          />
        </div>

        <div className="filter-input">
          <Home className="filter-icon" size={20} />
          <select
            name="bedrooms"
            value={filters.bedrooms}
            onChange={handleFilterChange}
          >
            <option value="">Bedrooms</option>
            {bedroomOptions.map((num) => (
              <option key={num} value={num}>
                {num} BR
              </option>
            ))}
          </select>
        </div>

        <div className="filter-input">
          <Bath className="filter-icon" size={20} />
          <select
            name="bathrooms"
            value={filters.bathrooms}
            onChange={handleFilterChange}
          >
            <option value="">Bathrooms</option>
            {bathroomOptions.map((num) => (
              <option key={num} value={num}>
                {num} BA
              </option>
            ))}
          </select>
        </div>
      </div>
      <button className="clear-filters" onClick={clearFilters}>
        <X size={16} />
        Clear Filters
      </button>
    </div>
  );

  const renderPropertyCard = (property) => (
    <div key={property.propertyid} className="property-card">
      <div className="property-image">
        <img
          src="/api/placeholder/400/200"
          alt="Property"
        />
        <div className="property-price">
          ${property.price?.toLocaleString()}
        </div>
      </div>
      <div className="property-details">
        <h3 className="property-address">{property.address}</h3>
        <div className="property-features">
          <div className="feature">
            <Home size={16} />
            <span>{property.numbedroom} BR</span>
          </div>
          <div className="feature">
            <Bath size={16} />
            <span>{property.numbathroom} BA</span>
          </div>
        </div>
        <div className="property-buttons">
          <button className="view-button">
            View Details
          </button>
          <button className="contact-button">
            Contact Owner
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="property-dashboard">
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Property Listings</h1>
          <button
            className="filter-button"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={20} />
            {showFilters ? 'Hide' : 'Show'} Filters
          </button>
        </div>

        {showFilters && renderFilters()}

        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <div className="results-count">
              Showing {filteredProperties.length} properties
            </div>
            <div className="properties-grid">
              {filteredProperties.map(renderPropertyCard)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PropertyDashboard;