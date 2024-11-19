import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Firebase config

const Productdetails = () => {
  const { id } = useParams(); // Extract product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Fetch product details from Firestore
        const productRef = doc(db, 'posts', id);
        const docSnapshot = await getDoc(productRef);

        if (docSnapshot.exists()) {
          setProduct(docSnapshot.data());
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching product details: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return <div>Loading product details...</div>;
  }

  if (!product) {
    return <div>Product not found!</div>;
  }

  // Inline styles
  const styles = {
    root: {
      '--main-color': '#000',
      '--bg-color': '#64ccc5',
      '--highlight-color': '#e67e22',
      '--button-hover-color': '#f39c12',
    },
    container: {
      padding: '20px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    productDetail: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      padding: '20px',
      backgroundColor: 'var(--bg-color)',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '20px',
    },
    productImg: {
      flex: 1,
      padding: '20px',
    },
    productImgImg: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: '10px',
    },
    productInfo: {
      flex: 2,
      padding: '20px',
    },
    productTitle: {
      fontSize: '2em',
      fontWeight: 'bold',
      marginBottom: '10px',
      color: 'var(--main-color)',
    },
    productDescription: {
      fontSize: '1.1em',
      lineHeight: '1.6',
      color: '#555',
    },
    productPrice: {
      fontSize: '1.5em',
      fontWeight: 'bold',
      color: 'var(--highlight-color)',
      marginTop: '20px',
    },
    productFooter: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '10px',
      borderTop: '1px solid #ddd',
    },
    productButton: {
      backgroundColor: 'var(--highlight-color)',
      color: 'white',
      padding: '10px 20px',
      fontSize: '1.2em',
      border: 'none',
      borderRadius: '30px',
      cursor: 'pointer',
      transition: '0.3s ease-in-out',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    productButtonHover: {
      backgroundColor: 'var(--button-hover-color)',
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.productDetail}>
        {/* Product Image Section */}
        <div style={styles.productImg}>
          <img src={product.imageUrl} alt={product.name} style={styles.productImgImg} />
        </div>

        {/* Product Information Section */}
        <div style={styles.productInfo}>
          <h1 style={styles.productTitle}>{product.name}</h1>
          <p style={styles.productDescription}>{product.description}</p>

          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Condition:</strong> {product.condition}</p>
          <p><strong>Age of Item:</strong> {product.age}</p>

          <p style={styles.productPrice}>₹{product.price}</p>

          {/* Action Button */}
          <div style={styles.productButton}>
            <button
              style={styles.productButton}
              onMouseOver={(e) => e.target.style.backgroundColor = styles.productButtonHover.backgroundColor}
              onMouseOut={(e) => e.target.style.backgroundColor = styles.productButton.backgroundColor}
            >
              Contact Seller
            </button>
          </div>
        </div>
      </div>

      {/* Product Footer Section */}
      <div style={styles.productFooter}>
        <p><strong>Seller:</strong> {product.userId || 'Anonymous'}</p>
      </div>
    </div>
  );
}

export default Productdetails;

