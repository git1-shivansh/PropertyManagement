import React, { useState, useEffect } from 'react';
import { getProperties, addProperty, deleteProperty, updateProperty } from '../services/api';
import '../shared.css';

function Properties() {
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingProperty, setEditingProperty] = useState(null);
    const [editForm, setEditForm] = useState({
        propertyid: '',
        address: '',
        price: '',
        numbedroom: '',
        numbathroom: ''
    });
    const [newProperty, setNewProperty] = useState({
        propertyid: '',
        address: '',
        price: '',
        ownerid: '',
        numbedroom: '',
        numbathroom: ''
    });

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

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleEdit = (property) => {
        setEditingProperty(property.propertyid);
        setEditForm({
            propertyid: property.propertyid,
            address: property.address,
            price: property.price,
            numbedroom: property.numbedroom,
            numbathroom: property.numbathroom
        });
    };

    const handleCancelEdit = () => {
        setEditingProperty(null);
        setEditForm({
            propertyid: '',
            address: '',
            price: '',
            numbedroom: '',
            numbathroom: ''
        });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async (oldPropertyId) => {
        try {
            await updateProperty(oldPropertyId, editForm);
            await fetchProperties();
            setEditingProperty(null);
            setEditForm({
                propertyid: '',
                address: '',
                price: '',
                numbedroom: '',
                numbathroom: ''
            });
        } catch (err) {
            console.error('Error updating property:', err);
            setError('Failed to update property');
        }
    };

    const handleAddInputChange = (e) => {
        const { name, value } = e.target;
        setNewProperty(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddProperty = async () => {
        try {
            await addProperty(newProperty);
            await fetchProperties();
            setNewProperty({
                propertyid: '',
                address: '',
                price: '',
                ownerid: '',
                numbedroom: '',
                numbathroom: ''
            });
        } catch (err) {
            console.error('Error adding property:', err);
            setError('Failed to add property');
        }
    };

    const handleDeleteProperty = async (propertyid) => {
        try {
            await deleteProperty(propertyid);
            await fetchProperties();
        } catch (err) {
            console.error('Error deleting property:', err);
            setError('Failed to delete property');
        }
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="container">
            <div className="header">
                <h1>Properties</h1>
            </div>
            <div className="form-container">
                <h2>Add New Property</h2>
                <div className="form-group">
                    <input
                        type="text"
                        name="propertyid"
                        placeholder="Property ID"
                        value={newProperty.propertyid}
                        onChange={handleAddInputChange}
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={newProperty.address}
                        onChange={handleAddInputChange}
                    />
                    <input
                        type="text"
                        name="price"
                        placeholder="Price"
                        value={newProperty.price}
                        onChange={handleAddInputChange}
                    />
                    <input
                        type="text"
                        name="ownerid"
                        placeholder="Owner ID"
                        value={newProperty.ownerid}
                        onChange={handleAddInputChange}
                    />
                    <input
                        type="text"
                        name="numbedroom"
                        placeholder="Number of Bedrooms"
                        value={newProperty.numbedroom}
                        onChange={handleAddInputChange}
                    />
                    <input
                        type="text"
                        name="numbathroom"
                        placeholder="Number of Bathrooms"
                        value={newProperty.numbathroom}
                        onChange={handleAddInputChange}
                    />
                    <button className="button add-btn" onClick={handleAddProperty}>Add Property</button>
                </div>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Property ID</th>
                            <th>Address</th>
                            <th>Price</th>
                            <th>Number of Bedrooms</th>
                            <th>Number of Bathrooms</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center">No properties found</td>
                            </tr>
                        ) : (
                            properties.map((property) => (
                                <tr key={property.propertyid}>
                                    <td>
                                        {editingProperty === property.propertyid ? (
                                            <input
                                                type="text"
                                                name="propertyid"
                                                value={editForm.propertyid}
                                                onChange={handleEditInputChange}
                                            />
                                        ) : (
                                            property.propertyid
                                        )}
                                    </td>
                                    <td>
                                        {editingProperty === property.propertyid ? (
                                            <input
                                                type="text"
                                                name="address"
                                                value={editForm.address}
                                                onChange={handleEditInputChange}
                                            />
                                        ) : (
                                            property.address
                                        )}
                                    </td>
                                    <td>
                                        {editingProperty === property.propertyid ? (
                                            <input
                                                type="text"
                                                name="price"
                                                value={editForm.price}
                                                onChange={handleEditInputChange}
                                            />
                                        ) : (
                                            `$${property.price}`
                                        )}
                                    </td>
                                    <td>
                                        {editingProperty === property.propertyid ? (
                                            <input
                                                type="text"
                                                name="numbedroom"
                                                value={editForm.numbedroom}
                                                onChange={handleEditInputChange}
                                            />
                                        ) : (
                                            property.numbedroom
                                        )}
                                    </td>
                                    <td>
                                        {editingProperty === property.propertyid ? (
                                            <input
                                                type="text"
                                                name="numbathroom"
                                                value={editForm.numbathroom}
                                                onChange={handleEditInputChange}
                                            />
                                        ) : (
                                            property.numbathroom
                                        )}
                                    </td>
                                    <td className="action-buttons">
                                        {editingProperty === property.propertyid ? (
                                            <>
                                                <button
                                                    className="button save-btn"
                                                    onClick={() => handleUpdate(property.propertyid)}
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
                                            <div className="action-buttons">
                                                <button
                                                    className="button edit-btn"
                                                    onClick={() => handleEdit(property)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="button delete-btn"
                                                    onClick={() => handleDeleteProperty(property.propertyid)}
                                                >
                                                    Delete
                                                </button>
                                            </div>
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

export default Properties;
