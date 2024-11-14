import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { auth, db } from '../firebase'; // Adjust this path based on your project structure

const Dashboard = () => {
  const [user, setUser] = useState({
    profilePicture: null,
    name: '',
    email: '',
    contact: '',
    address: '',
    university: '',
    verified: false,
  });

  const [listings, setListings] = useState({
    active: [],
    sold: [],
    bought: [],
  });

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('profile'); // State to track the active tab

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = auth.currentUser?.uid; // Get current user's ID from Firebase auth
      if (userId) {
        try {
          const userDoc = await db.collection('users').doc(userId).get();
          if (userDoc.exists) {
            setUser(userDoc.data());
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      }
    };

    const fetchUserListings = async () => {
      const userId = auth.currentUser?.uid;
      if (userId) {
        try {
          // Fetch Active Listings
          const activeSnapshot = await db.collection('listings').where('userId', '==', userId).where('status', '==', 'Available').get();
          const activeListings = activeSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          // Fetch Sold Listings
          const soldSnapshot = await db.collection('listings').where('userId', '==', userId).where('status', '==', 'Sold').get();
          const soldListings = soldSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          // Fetch Bought Listings
          const boughtSnapshot = await db.collection('purchases').where('buyerId', '==', userId).get();
          const boughtListings = boughtSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

          setListings({
            active: activeListings,
            sold: soldListings,
            bought: boughtListings,
          });
        } catch (error) {
          console.error('Error fetching listings:', error);
        }
      }
    };

    fetchUserData();
    fetchUserListings();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleProfilePictureChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUser({ ...user, profilePicture: URL.createObjectURL(file) });
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleListingAction = (id, action) => {
    alert(`${action} action on listing ID: ${id}`);
  };

  return (
    <div className="dashboard-container">
      {!user.verified && (
        <div className="status-warning">
          Your account is still in Pending State, <span>Verify Mobile</span> to activate.
        </div>
      )}

      <div className="dashboard-tabs">
        <button
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => handleTabChange('profile')}
        >
          Profile
        </button>
        <button
          className={`tab ${activeTab === 'listings' ? 'active' : ''}`}
          onClick={() => handleTabChange('listings')}
        >
          My Listings
        </button>
        <button
          className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => handleTabChange('settings')}
        >
          Settings
        </button>
      </div>

      <div className="dashboard-content">
        {activeTab === 'profile' && (
          <div className="profile-info">
            <h2>Profile Information</h2>
            <div className="profile-picture">
              <img
                src={user.profilePicture || 'https://via.placeholder.com/150'}
                alt="Profile"
              />
              <input type="file" onChange={handleProfilePictureChange} />
            </div>
            <div className="profile-details">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    placeholder="Full Name"
                  />
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Email"
                  />
                  <input
                    type="text"
                    value={user.contact}
                    onChange={(e) => setUser({ ...user, contact: e.target.value })}
                    placeholder="Contact Number"
                  />
                  <input
                    type="text"
                    value={user.university}
                    onChange={(e) => setUser({ ...user, university: e.target.value })}
                    placeholder="University"
                  />
                  <input
                    type="text"
                    value={user.address}
                    onChange={(e) => setUser({ ...user, address: e.target.value })}
                    placeholder="Address"
                  />
                </>
              ) : (
                <>
                  <input type="text" value={user.name} readOnly placeholder="Full Name" />
                  <input type="email" value={user.email} readOnly placeholder="Email" />
                  <input type="text" value={user.contact} readOnly placeholder="Contact Number" />
                  <input type="text" value={user.university} readOnly placeholder="University" />
                  <input type="text" value={user.address} readOnly placeholder="Address" />
                </>
              )}
            </div>
            <button
              className="edit-profile-btn"
              onClick={isEditing ? handleSaveProfile : handleEditProfile}
            >
              {isEditing ? 'Save Profile' : 'Edit Profile'}
            </button>
            {isEditing && (
              <button className="cancel-profile-btn" onClick={handleCancelEdit}>
                Cancel
              </button>
            )}
          </div>
        )}

        {activeTab === 'listings' && (
          <div className="user-listings">
            <h2>My Listings</h2>

            <div className="listings-container">
              <h3>Active Listings</h3>
              {listings.active.length > 0 ? (
                listings.active.map((listing) => (
                  <div key={listing.id} className="listing-item">
                    <h4>{listing.name}</h4>
                    <p>Price: {listing.price}</p>
                    <p>Description: {listing.description}</p>
                    <p>Status: {listing.status}</p>
                    <p>Date Listed: {listing.date}</p>
                    <div className="listing-actions">
                      <button onClick={() => handleListingAction(listing.id, 'Edit')}>Edit</button>
                      <button onClick={() => handleListingAction(listing.id, 'Delete')}>Delete</button>
                      {listing.status !== 'Sold' && (
                        <button onClick={() => handleListingAction(listing.id, 'Mark as Sold')}>
                          Mark as Sold
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p>No active listings</p>
              )}
            </div>

            <div className="listings-container">
              <h3>Sold Listings</h3>
              {listings.sold.length > 0 ? (
                listings.sold.map((listing) => (
                  <div key={listing.id} className="listing-item">
                    <h4>{listing.name}</h4>
                    <p>Price: {listing.price}</p>
                    <p>Description: {listing.description}</p>
                    <p>Status: {listing.status}</p>
                    <p>Date Sold: {listing.date}</p>
                  </div>
                ))
              ) : (
                <p>No sold listings</p>
              )}
            </div>

            <div className="listings-container">
              <h3>Bought Listings</h3>
              {listings.bought.length > 0 ? (
                listings.bought.map((listing) => (
                  <div key={listing.id} className="listing-item">
                    <h4>{listing.name}</h4>
                    <p>Price: {listing.price}</p>
                    <p>Description: {listing.description}</p>
                    <p>Seller: {listing.sellerName}</p>
                    <p>Date Purchased: {listing.date}</p>
                  </div>
                ))
              ) : (
                <p>No purchased listings</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="settings">
            <h2>Settings</h2>
            {/* Settings content */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;


