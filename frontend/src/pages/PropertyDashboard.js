import React, { useState, useEffect } from 'react';
import { Search, Home, Bath, DollarSign, X, SlidersHorizontal, Mail, Square} from 'lucide-react';
import '../PropertyDashboard.css';

const PropertyDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedOwner, setSelectedOwner] = useState(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [message, setMessage] = useState('');
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    searchTerm: '',
  });

  const bedroomOptions = [1, 2, 3, 4, '5+'];
  const bathroomOptions = [1, 1.5, 2, 2.5, 3, '3+'];

  const propertyFeatures = React.useMemo(() => ({
    styles: ['Contemporary', 'Colonial', 'Mediterranean', 'Modern', 'Traditional', 'Craftsman'],
    views: ['Mountain', 'City', 'Garden', 'Park', 'Lake', 'Forest'],
    amenities: ['Granite Countertops', 'Hardwood Floors', 'Stainless Steel Appliances', 'Walk-in Closet', 'Crown Molding', 'French Doors'],
    extras: ['Smart Home System', 'Solar Panels', 'Wine Cellar', 'Home Theater', 'Gym', 'Pool'],
    heating: ['Forced Air', 'Radiant', 'Heat Pump', 'Baseboard', 'Geothermal'],
    cooling: ['Central Air', 'Ductless Mini-Split', 'Window Units', 'Evaporative Cooling'],
  }), []);
  const importAll = (r) => r.keys().map(r);
  const houseImages = importAll(require.context('../pictures', false, /\.(jpg|jpeg)$/i));

  const generatePropertyDetails = () => {
    const getRandomItems = (array, count) => {
      const shuffled = [...array].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    return {
      style: propertyFeatures.styles[Math.floor(Math.random() * propertyFeatures.styles.length)],
      view: propertyFeatures.views[Math.floor(Math.random() * propertyFeatures.views.length)],
      amenities: getRandomItems(propertyFeatures.amenities, 3),
      extras: getRandomItems(propertyFeatures.extras, 2),
      heating: propertyFeatures.heating[Math.floor(Math.random() * propertyFeatures.heating.length)],
      cooling: propertyFeatures.cooling[Math.floor(Math.random() * propertyFeatures.cooling.length)],
      yearBuilt: Math.floor(Math.random() * (2024 - 1980) + 1980),
      squareFeet: Math.floor(Math.random() * (4000 - 1000) + 1000),
      lotSize: ((Math.random() * (1 - 0.1) + 0.1).toFixed(2)) + ' acres',
      parkingSpaces: Math.floor(Math.random() * 3) + 1,
    };
  };

  useEffect(() => {
    const generatePropertyDetails = () => {
      const getRandomItems = (array, count) => {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
      };
  
      return {
        style: propertyFeatures.styles[Math.floor(Math.random() * propertyFeatures.styles.length)],
        view: propertyFeatures.views[Math.floor(Math.random() * propertyFeatures.views.length)],
        amenities: getRandomItems(propertyFeatures.amenities, 3),
        extras: getRandomItems(propertyFeatures.extras, 2),
        heating: propertyFeatures.heating[Math.floor(Math.random() * propertyFeatures.heating.length)],
        cooling: propertyFeatures.cooling[Math.floor(Math.random() * propertyFeatures.cooling.length)],
        yearBuilt: Math.floor(Math.random() * (2024 - 1980) + 1980),
        squareFeet: Math.floor(Math.random() * (4000 - 1000) + 1000),
        lotSize: ((Math.random() * (1 - 0.1) + 0.1).toFixed(2)) + ' acres',
        parkingSpaces: Math.floor(Math.random() * 3) + 1,
      };
    };
  
    const fetchProperties = async () => {
        try {
          setLoading(true);
          const response = await fetch('http://localhost:3001/api/properties');
          const data = await response.json();
          
          // Add random property details and fetch owner information
          const enhancedProperties = await Promise.all(
            data.map(async (property) => {
              const ownerResponse = await fetch(`http://localhost:3001/api/owners/${property.ownerid}`);
              const ownerData = await ownerResponse.json();
              
              // Assign a random image from the imported images
              const randomImage = houseImages[Math.floor(Math.random() * houseImages.length)];
  
              return {
                ...property,
                owner: ownerData,
                details: generatePropertyDetails(),
                image: randomImage
              };
            })
          );
          
          setProperties(enhancedProperties);
        } catch (error) {
          console.error('Error fetching properties:', error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchProperties();
    }, [propertyFeatures]);// Add propertyFeatures as a dependency

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
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

  const handleContactOwner = (owner) => {
    setSelectedOwner(owner);
    setShowContactModal(true);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log('Sending message to owner:', selectedOwner);
    console.log('Message content:', message);
    setMessage('');
    setShowContactModal(false);
    setSelectedOwner(null);
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setShowDetailsModal(true);
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

  const renderContactModal = () => {
    if (!showContactModal || !selectedOwner) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <div className="modal-header">
            <h2>Contact Owner</h2>
            <button 
              className="modal-close"
              onClick={() => setShowContactModal(false)}
            >
              <X size={24} />
            </button>
          </div>
          <form onSubmit={handleSendMessage} className="contact-form">
            <div className="form-group">
              <label>To:</label>
              <p>{selectedOwner.ownername} ({selectedOwner.email})</p>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message here..."
                required
              />
            </div>
            <div className="modal-actions">
              <button 
                type="button" 
                className="cancel-button"
                onClick={() => setShowContactModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="send-button">
                <Mail size={16} />
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const renderDetailsModal = () => {
    if (!showDetailsModal || !selectedProperty) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal-content details-modal">
          <div className="modal-header">
            <h2>Property Details</h2>
            <button 
              className="modal-close"
              onClick={() => setShowDetailsModal(false)}
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="property-details-content">
            <div className="property-detail-image">
              <img 
                src={selectedProperty.image} 
                alt={`Property at ${selectedProperty.address}`}
                onError={(e) => {
                  e.target.src = '/api/placeholder/400/200';
                }}
              />
            </div>
  
            <div className="details-address">
              <h3>{selectedProperty.address}</h3>
              <p className="property-style">{selectedProperty.details.style} Style Home</p>
            </div>
  
            <div className="details-grid">
                <div className="detail-item"> 
                    <Home size={20} />
                    <span>{selectedProperty.numbedroom} Bedrooms</span>
                </div>
                <div className="detail-item">
                    <Bath size={20} />
                    <span>{selectedProperty.numbathroom} Bathrooms</span>
                </div>
                <div className="detail-item">
                    <Square size={20} />
                    <span>{selectedProperty.details.squareFeet.toLocaleString()} sq ft</span>
                </div>
            </div>
  
            <div className="details-section">
              <h4>Featured Amenities</h4>
              <ul className="amenities-list">
                {selectedProperty.details.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>
  
            <div className="details-section">
              <h4>Premium Features</h4>
              <ul className="features-list">
                {selectedProperty.details.extras.map((extra, index) => (
                  <li key={index}>{extra}</li>
                ))}
              </ul>
            </div>
  
            <div className="details-section">
              <div className="systems-info">
                <p><strong>Heating:</strong> {selectedProperty.details.heating}</p>
                <p><strong>Cooling:</strong> {selectedProperty.details.cooling}</p>
                <p><strong>Parking:</strong> {selectedProperty.details.parkingSpaces} Car Garage</p>
              </div>
            </div>
  
            <div className="details-section">
              <button 
                className="contact-button full-width"
                onClick={() => {
                  setShowDetailsModal(false);
                  handleContactOwner(selectedProperty.owner);
                }}
              >
                Contact Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

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
          src={property.image} 
          alt={`Property at ${property.address}`}
          onError={(e) => {
            e.target.src = '/api/placeholder/400/200';
          }}
        />
        <div className="property-price">
          ${property.price?.toLocaleString()}
        </div>
      </div>
      {/* Rest of the property card remains the same */}
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
          <div className="feature">
            <Square size={16} />
            <span>{property.details.squareFeet.toLocaleString()} sqft</span>
          </div>
        </div>
        
        <div className="property-buttons">
          <button 
            className="view-button"
            onClick={() => handleViewDetails(property)}
          >
            View Details
          </button>
          <button 
            className="contact-button"
            onClick={() => handleContactOwner(property.owner)}
          >
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
      {renderContactModal()}
      {renderDetailsModal()}
    </div>
  );
};

export default PropertyDashboard;