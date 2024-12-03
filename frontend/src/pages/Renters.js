import React, { useState, useEffect } from 'react';
import { getRenters } from '../services/api';

function Renters() {
    const [renters, setRenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRenters = async () => {
            try {
                const data = await getRenters();
                setRenters(Array.isArray(data) ? data : []);
                setLoading(false);
            } catch (err) {
                console.error('Error in component:', err);
                setError('Failed to fetch renters');
                setLoading(false);
            }
        };

        fetchRenters();
    }, []);

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
    if (renters.length === 0) return <div className="text-center p-4">No renters found</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Property Renters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {renters.map((renter) => (
                    <div key={renter.renterid} className="bg-white p-4 rounded shadow">
                        <h3 className="font-bold">{renter.rentername}</h3>
                        <p>Email: {renter.email}</p>
                        <p>Property ID: {renter.propertyid}</p>
                        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Renters;