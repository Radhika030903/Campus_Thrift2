import React, { useContext } from 'react';
import { useNavigate } from "react-router-dom"; // Replacing useHistory with useNavigate
import { PostContext } from "../../contextStore/PostContext";
import "./postcards.css";

function PostCards({ product, index }) {
    const { setPostContent } = useContext(PostContext); // Setting the post content globally using PostContext
    const navigate = useNavigate(); // Replacing useHistory with useNavigate

    return (
        <div 
            className="card" 
            key={index} 
            onClick={() => {
                setPostContent(product);
                navigate("/view"); // Updated history.push to navigate
            }}
        >
            <div className="favorite">
                {/* Removed undefined Heart component */}
                <button>❤️</button> {/* Placeholder for a heart icon */}
            </div>
            <div className="image">
                <img src={product.url} alt={product.name} /> {/* Improved alt text */}
            </div>
            <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="category"> {product.category} </span>
                <p className="name"> {product.name}</p>
            </div>
            <div className="date">
                <span>{new Date(product.createdAt).toLocaleDateString()}</span> {/* Formatted date */}
            </div>
        </div>
    );
}

export default PostCards;
