import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostContext } from "../../contextStore/PostContext";
import "./postcards.css";

function PostCards({ product }) {
  const { setPostContent } = useContext(PostContext);
  const navigate = useNavigate();

  return (
    <div
      className="card"
      onClick={() => {
        setPostContent(product);
        navigate(`/view/${product.id}`); // Navigate to the product detail page with the product ID
      }}
    >
      <div className="favorite">
        <button>❤️</button>
      </div>
      <div className="image">
        <img
          src={product.imageUrl || "https://via.placeholder.com/150"}
          alt={product.name || "Product Image"}
        />
      </div>
      <div className="content">
        <p className="rate">
          {product.price ? `₹ ${product.price}` : "Price not available"}
        </p>
        <span className="category">{product.category || "Category"}</span>
        <p className="name">{product.name || "Product Name"}</p>
      </div>
      <div className="date">
        <span>{new Date(product.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
}

export default PostCards;




