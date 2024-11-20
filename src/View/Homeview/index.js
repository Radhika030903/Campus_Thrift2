import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contextStore/AuthContext'; // Keep only this import

import Header from '../../Components/Header/Header';
import Banner from '../../Components/Banner/Banner';
import Post from '../../Components/Post/Post';
import Footer from '../../Components/Footer/Footer';


import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';

function Home() {
  const { user } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Simulate user authentication
    const fetchedUser = user;
    setCurrentUser(fetchedUser);
  }, [user]);

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




