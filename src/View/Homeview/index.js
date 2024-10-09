import React, { useEffect, useContext } from 'react';
import { AuthContext } from '../../contextStore/AuthContext'; // Ensure this import is correct
import Header from '../../Components/Header/Header';
import Banner from '../../Components/Banner/Banner';
import Post from '../../Components/Post/Post';
import Footer from '../../Components/Footer/Footer';

function Home() {
  const { user, setUser } = useContext(AuthContext); // Destructure user and setUser

  useEffect(() => {
    // Simulate user authentication
    const fetchedUser = null; // You can replace this with actual user data fetching logic
    setUser(fetchedUser);
  }, [setUser]);

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


 