import React, { useState, useEffect } from 'react';
import { getOwners, getOwnerProperties, updateOwner } from '../services/api';
import '../shared.css';

function Owners() {
    const [owners, setOwners] = useState([]);
    const [ownerProperties, setOwnerProperties] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingOwner, setEditingOwner] = useState(null);
    const [editForm, setEditForm] = useState({
        ownerid: '',
        ownername: '',
        email: ''
    });

    const fetchOwnersAndProperties = async () => {
        try {
            const ownersData = await getOwners();
            setOwners(Array.isArray(ownersData) ? ownersData : []);

            const propertiesPromises = ownersData.map(async (owner) => {
                const properties = await getOwnerProperties(owner.ownerid);
                return [owner.ownerid, properties];
            });

            const propertiesResults = await Promise.all(propertiesPromises);
            const propertiesMap = Object.fromEntries(propertiesResults);
            setOwnerProperties(propertiesMap);
            setLoading(false);
        } catch (err) {
            console.error('Error:', err);
            setError('Failed to fetch owners and properties');
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOwnersAndProperties();
    }, []);

    const handleEdit = (owner) => {
        setEditingOwner(owner.ownerid);
        setEditForm({
            ownerid: owner.ownerid,
            ownername: owner.ownername,
            email: owner.email
        });
    };

    const handleCancelEdit = () => {
        setEditingOwner(null);
        setEditForm({
            ownerid: '',
            ownername: '',
            email: ''
        });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async (oldOwnerId) => {
        try {
            await updateOwner(oldOwnerId, editForm);
            await fetchOwnersAndProperties();
            setEditingOwner(null);
            setEditForm({
                ownerid: '',
                ownername: '',
                email: ''
            });
        } catch (err) {
            console.error('Error updating owner:', err);
            setError('Failed to update owner');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="container">
            <div className="header">
                <h1>Property Owners</h1>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Properties</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {owners.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">No owners found</td>
                            </tr>
                        ) : (
                            owners.map((owner) => (
                                <tr key={owner.ownerid}>
                                    <td>
                                        {editingOwner === owner.ownerid ? (
                                            <input
                                                type="text"
                                                name="ownerid"
                                                value={editForm.ownerid}
                                                onChange={handleEditInputChange}
                                            />
                                        ) : (
                                            owner.ownerid
                                        )}
                                    </td>
                                    <td>
                                        {editingOwner === owner.ownerid ? (
                                            <input
                                                type="text"
                                                name="ownername"
                                                value={editForm.ownername}
                                                onChange={handleEditInputChange}
                                            />
                                        ) : (
                                            owner.ownername
                                        )}
                                    </td>
                                    <td>
                                        {editingOwner === owner.ownerid ? (
                                            <input
                                                type="email"
                                                name="email"
                                                value={editForm.email}
                                                onChange={handleEditInputChange}
                                            />
                                        ) : (
                                            owner.email
                                        )}
                                    </td>
                                    <td>
                                        {ownerProperties[owner.ownerid]?.length > 0 ? (
                                            <div>
                                                {ownerProperties[owner.ownerid].map(property => (
                                                    <div key={property.propertyid}>
                                                        {property.propertyid}
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <span>No properties</span>
                                        )}
                                    </td>
                                    <td>
                                        {editingOwner === owner.ownerid ? (
                                            <>
                                                <button
                                                    className="button save-btn"
                                                    onClick={() => handleUpdate(owner.ownerid)}
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    className="button cancel-btn"
                                                    onClick={handleCancelEdit}
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                className="button edit-btn"
                                                onClick={() => handleEdit(owner)}
                                            >
                                                Edit
                                            </button>
                                        )}
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

export default Owners;
