import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { auth, db } from '../firebase';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import PostCards from './PostCards/PostCards';

const Dashboard = () => {
  const [user, setUser] = useState({
    profilePicture: null,
    name: '',
    email: '',
    institute: '',
    state: '',
    city: '',
  });

  const [listings, setListings] = useState({
    active: [],
    sold: [],
    bought: [],
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [showPopup, setShowPopup] = useState(true); // State for controlling popup visibility

  // Function to fetch user data based on email
  const fetchUserData = async (userEmail) => {
    try {
      const usersRef = collection(db, 'User');  // Ensure the collection name is correct
      const q = query(usersRef, where('email', '==', userEmail));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log('No user found with this email');
        return;
      }

      const userDocSnap = querySnapshot.docs[0];
      const userData = userDocSnap.data();
      setUser({
        name: userData.name || '',
        email: userData.email || '',
        institute: userData.institute || '',
        state: userData.state || '',
        city: userData.city || '',
        createdAt: userData.createdAt || new Date(),
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Function to fetch user listings
  const fetchUserListings = async (userEmail) => {
    try {
      const listingsRef = collection(db, 'listings');
      const activeQuery = query(
        listingsRef,
        where('userEmail', '==', userEmail),
        where('status', '==', 'Available')
      );
      const activeSnapshot = await getDocs(activeQuery);
      const activeListings = activeSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setListings(prev => ({
        ...prev,
        active: activeListings
      }));
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  // Function to fetch posts
  const fetchPosts = async () => {
    try {
      const postCollection = collection(db, 'posts');
      const q = query(postCollection, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      const allPosts = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate?.() || new Date(data.createdAt) || new Date()
        };
      });

      setPosts(allPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Effect hook to fetch data when email is entered and valid
  useEffect(() => {
    if (email) {
      setLoading(true);  // Set loading state to true when fetching starts

      // Convert the email to lowercase to ensure case-insensitive comparison
      const userEmailLowercase = email.toLowerCase();

      // Fetch user data and related listings and posts based on the email
      Promise.all([
        fetchUserData(userEmailLowercase),
        fetchUserListings(userEmailLowercase),
        fetchPosts()
      ]).finally(() => {
        setLoading(false);  // Set loading state to false after data is fetched
      });
    }
  }, [email]);  // Trigger when the email state changes

  // Handle the form submission for the email input
  const handleSubmitEmail = () => {
    if (email) {
      setShowPopup(false);  // Hide the popup when email is submitted
    } else {
      alert("Please enter a valid email.");
    }
  };

  // If the popup is shown, display it
  if (showPopup) {
    return (
      <div className="email-popup">
        <h2>Welcome! Please Enter Your Email</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={handleSubmitEmail}>Submit</button>
      </div>
    );
  }

  // Show loading state while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  // Render the Dashboard once data is fetched
  return (
    <div className="dashboard-container">
      <div className="profile-info">
        <h2>Profile Information</h2>
        <div className="profile-details">
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Institute: {user.institute}</p>
          <p>State: {user.state}</p>
          <p>City: {user.city}</p>
        </div>
      </div>

      <div className="user-listings">
        <h2>My Listings</h2>
        {listings.active.length > 0 ? (
          listings.active.map((listing) => (
            <div key={listing.id} className="listing-item">
              <h4>{listing.name}</h4>
              <p>Price: {listing.price}</p>
            </div>
          ))
        ) : (
          <p>No active listings</p>
        )}
      </div>

      <div className="user-posts">
        <h2>Recent Posts</h2>
        <div className="post-cards">
          {posts.map((post) => (
            <PostCards key={post.id} product={post} index={post.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


