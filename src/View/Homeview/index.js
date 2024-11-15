
import React, { useEffect, useState, useContext } from 'react';
import { useAuth } from '../../contextStore/AuthContext'; // Ensure this import is correct

import React, { useContext } from 'react';
import { AuthContext } from '../../contextStore/AuthContext'; // Ensure this import is correct

import Header from '../../Components/Header/Header';
import Banner from '../../Components/Banner/Banner';
import Post from '../../Components/Post/Post';
import Footer from '../../Components/Footer/Footer';

function Home() {

  const { user } = useAuth(); // Destructure user from context
  const [currentUser, setCurrentUser] = useState(user); // Use local state for user

  useEffect(() => {
    // Simulate user authentication
    const fetchedUser = null; // Replace this with actual user data fetching logic
    setCurrentUser(fetchedUser); // Update the local user state
  }, [user]); // Dependency array now tracks user context updates

  const { user } = useContext(AuthContext);


  return (
    <div className="homeParentDiv">
      <Header />
      <Banner />
      <Post />
      <Footer />
    </div>
  );
}

export default Home;




