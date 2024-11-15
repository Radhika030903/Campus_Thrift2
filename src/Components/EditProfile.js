import React, { useState, useEffect } from 'react';
import './EditProfile.css';
import { db, auth } from '../firebase'; // Adjust this path based on your project structure

const EditProfile = ({ user, setUser, onCancel, onSave }) => {
  // Local state to manage input values
  const [editedProfile, setEditedProfile] = useState({
    name: user.name || '',
    email: user.email || '',
    contact: user.contact || '',
    address: user.address || '',
    profilePicture: user.profilePicture || null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile({
      ...editedProfile,
      [name]: value,
    });
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditedProfile({
        ...editedProfile,
        profilePicture: URL.createObjectURL(file),
      });
    }
  };

  const handleSave = () => {
    // Here you can save the updated profile to Firebase
    onSave(editedProfile); // Pass the updated profile data
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <div className="edit-profile-form">
        <div className="edit-profile-picture">
          <img
            src={editedProfile.profilePicture || 'https://via.placeholder.com/150'}
            alt="Profile"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfilePictureChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={editedProfile.name}
            onChange={handleInputChange}
            placeholder="Enter your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={editedProfile.email}
            onChange={handleInputChange}
            placeholder="Enter your email"
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact">Contact Number</label>
          <input
            type="text"
            id="contact"
            name="contact"
            value={editedProfile.contact}
            onChange={handleInputChange}
            placeholder="Enter your contact number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name="address"
            value={editedProfile.address}
            onChange={handleInputChange}
            placeholder="Enter your address"
          />
        </div>

        <div className="form-actions">
          <button className="save-btn" onClick={handleSave}>Save</button>
          <button className="cancel-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
