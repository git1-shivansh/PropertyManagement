import React, { useState, useEffect } from 'react';
import { getOwners } from '../services/api';

function Owners() {
    const [owners, setOwners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOwners = async () => {
            try {
                const data = await getOwners();
                setOwners(Array.isArray(data) ? data : []);
                setLoading(false);
            } catch (err) {
                console.error('Error in component:', err);
                setError('Failed to fetch owners');
                setLoading(false);
            }
        };

        fetchOwners();
    }, []);

    if (loading) return <div className="text-center p-4">Loading...</div>;
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
    if (owners.length === 0) return <div className="text-center p-4">No owners found</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Property Owners</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {owners.map((owner) => (
                    <div key={owner.ownerid} className="bg-white p-4 rounded shadow">
                        <h3 className="font-bold">{owner.ownername}</h3>
                        <p>Email: {owner.email}</p>
                        <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                            View Properties
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Owners;