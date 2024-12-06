import React, { useState, useEffect } from 'react';
import { getRenters, addRenter, deleteRenter } from '../services/api';
import '../shared.css';

function Renters() {
    const [renters, setRenters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newRenter, setNewRenter] = useState({
        renterid: '',
        rentername: '',
        email: '',
        propertyid: ''
    });

    useEffect(() => {
        fetchRenters();
    }, []);

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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRenter(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addRenter(newRenter);
            await fetchRenters();
            setNewRenter({
                renterid: '',
                rentername: '',
                email: '',
                propertyid: ''
            });
        } catch (err) {
            setError('Failed to add renter');
        }
    };

    const handleDelete = async (renterId) => {
        if (!window.confirm('Are you sure you want to delete this renter?')) return;

        try {
            await deleteRenter(renterId);
            await fetchRenters();
        } catch (err) {
            setError('Failed to delete renter');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="container">
            <div className="header">
                <h1>Property Renters</h1>
            </div>
            <div className="form-container">
                <h2>Add New Renter</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="renterid"
                            value={newRenter.renterid}
                            onChange={handleInputChange}
                            placeholder="Renter ID"
                            required
                        />
                        <input
                            type="text"
                            name="rentername"
                            value={newRenter.rentername}
                            onChange={handleInputChange}
                            placeholder="Renter Name"
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            value={newRenter.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                            required
                        />
                        <input
                            type="text"
                            name="propertyid"
                            value={newRenter.propertyid}
                            onChange={handleInputChange}
                            placeholder="Property ID"
                            required
                        />
                        <button type="submit" className="button add-btn">
                            Add Renter
                        </button>
                    </div>
                </form>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Property ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renters.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">No renters found</td>
                            </tr>
                        ) : (
                            renters.map((renter) => (
                                <tr key={renter.renterid}>
                                    <td>{renter.renterid}</td>
                                    <td>{renter.rentername}</td>
                                    <td>{renter.email}</td>
                                    <td>{renter.propertyid}</td>
                                    <td>
                                        <button
                                            className="button delete-btn"
                                            onClick={() => handleDelete(renter.renterid)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Renters;
