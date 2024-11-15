import React, { useContext } from 'react';
import { AuthContext } from '../../contextStore/AuthContext'; // Ensure this import is correct
import Header from '../../Components/Header/Header';
import Banner from '../../Components/Banner/Banner';
import Post from '../../Components/Post/Post';
import Footer from '../../Components/Footer/Footer';

function Home() {
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


