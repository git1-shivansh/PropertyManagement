import React, { useState, useEffect } from 'react';
import { getProperties } from '../services/api';

function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const data = await getProperties();
                setProperties(Array.isArray(data) ? data : []);
                setLoading(false);
            } catch (err) {
                console.error('Error in component:', err);
                setError('Failed to fetch properties');
                setLoading(false);
            }
        };

        fetchProperties();
    }, []);

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
    if (properties.length === 0) return <div className="text-center p-4">No properties found</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Properties</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {properties.map((property) => (
                    <div key={property.propertyid} className="bg-white p-4 rounded shadow">
                        <h3 className="font-bold">{property.address}</h3>
                        <p>Price: ${property.price}</p>
                        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Properties;