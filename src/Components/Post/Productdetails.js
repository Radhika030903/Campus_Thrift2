import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase'; // Firebase config
import './ProductDetail.css'; // Importing the external CSS

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

  return (
    <div className="container">
      <div className="product-detail">
        {/* Product Image Section */}
        <div className="product-img">
          <img src={product.imageUrl} alt={product.name} />
        </div>

        {/* Product Information Section */}
        <div className="product-info">
          <h1 className="product-title">{product.name}</h1>  {/* Product name highlighted */}
          
          {/* Seller Name */}
          <p className="seller-name"><strong>Seller:</strong> {product.sellerName || 'Anonymous'}</p>  {/* Seller name displayed in product info */}

          <p className="product-description">{product.description}</p>

          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Condition:</strong> {product.condition}</p>
          <p><strong>Age of Item:</strong> {product.age}</p>

          <p className="product-price">₹{product.price}</p>

          {/* Action Button */}
          <div>
            <button
              className="product-button"
            >
              Contact Seller
            </button>
          </div>
        </div>
      </div>

      {/* Product Footer Section (optional, since seller's name is already added in the main product info) */}
    </div>
  );
};

export default Productdetails;