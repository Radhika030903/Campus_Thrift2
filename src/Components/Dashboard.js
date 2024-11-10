import React, { useEffect, useState } from 'react';
import { db, auth } from './firebase'; // Ensure you're importing from the correct path
import { collection, query, where, getDocs } from 'firebase/firestore';

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState({});
  const [products, setProducts] = useState({ sold: [], bought: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Reset loading state at the start of fetch
      try {
        const user = auth.currentUser;
        if (!user) {
          setError("User not authenticated. Please log in.");
          return; // Exit early if user is not authenticated
        }

        const userId = user.uid; // Get the logged-in user's ID

        // Fetch user data
        const userQuery = query(collection(db, 'users'), where('uid', '==', userId));
        const userDoc = await getDocs(userQuery);
        userDoc.forEach(doc => {
          setUserInfo(doc.data());
        });

        // Fetch products data
        const soldProductsQuery = query(collection(db, 'products'), where('sellerId', '==', userId));
        const boughtProductsQuery = query(collection(db, 'products'), where('buyerId', '==', userId));

        const soldProducts = await getDocs(soldProductsQuery);
        const boughtProducts = await getDocs(boughtProductsQuery);

        setProducts({
          sold: soldProducts.docs.map(doc => doc.data()),
          bought: boughtProducts.docs.map(doc => doc.data()),
        });
      } catch (err) {
        setError("Error fetching data: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch data once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>User Dashboard</h1>
      <h2>User Information</h2>
      <p>Name: {userInfo.name}</p>
      <p>Email: {userInfo.email}</p>
      <p>Address: {userInfo.address}</p>
      <p>Contact No: {userInfo.contactNo}</p>

      <h2>Your Products</h2>
      <h3>Sold Products</h3>
      <ul>
        {products.sold.map((product, index) => (
          <li key={index}>{product.name}</li>
        ))}
      </ul>
      <h3>Bought Products</h3>
      <ul>
        {products.bought.map((product, index) => (
          <li key={index}>{product.name}</li>
        ))}
      </ul>
    </div>
  );
};


export default Dashboard;
