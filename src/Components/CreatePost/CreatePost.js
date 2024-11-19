import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contextStore/AuthContext'; // Use useAuth hook instead of useContext
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path to your Firebase config
import './CreatePost.css';

function CreatePost() {
    const navigate = useNavigate();
    const { user } = useAuth(); // Use useAuth to get user details
    const [formData, setFormData] = useState({
        sellerName: '',
        contactNumber: '',
        name: '',
        category: '',
        price: '',
        description: '',
        condition: '',
        age: '',
        imageUrl: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const postRef = collection(db, "posts");
            const newPost = {
                ...formData,
                userId: user?.uid || "anonymous", // Use user from context
                createdAt: new Date().toISOString(),
            };

            await addDoc(postRef, newPost);

            console.log("Post added successfully!");
            alert("Your post has been submitted!");
            navigate("/");
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Failed to submit your post. Please try again.");
        }
    };

    return (
        <div className="createPost">
            <div className="postForm">
                <h2>POST ITEM</h2>
                <form onSubmit={handleSubmit}>
                    <div className="formInput">
                        <label>Seller's Name</label>
                        <input
                            type="text"
                            name="sellerName"
                            value={formData.sellerName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="formInput">
                        <label>Contact Number</label>
                        <input
                            type="tel"
                            name="contactNumber"
                            value={formData.contactNumber}
                            onChange={handleChange}
                            pattern="[0-9]{10}"
                            placeholder="Enter 10-digit mobile number"
                            required
                        />
                    </div>

                    <div className="formInput">
                        <label>Item Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="formInput">
                        <label>Category</label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Category</option>
                            <option value="Mobile Phones">Mobile Phones</option>
                            <option value="Computers & Laptops">Computers & Laptops</option>
                            <option value="Cameras & Lenses">Cameras & Lenses</option>
                            <option value="Tablets">Tablets</option>
                            <option value="Books">Books</option>
                            <option value="Other Electronics">Other Electronics</option>
                        </select>
                    </div>

                    <div className="formInput">
                        <label>Price (₹)</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="formInput">
                        <label>Condition</label>
                        <select
                            name="condition"
                            value={formData.condition}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Condition</option>
                            <option value="New">New</option>
                            <option value="Like New">Like New</option>
                            <option value="Good">Good</option>
                            <option value="Fair">Fair</option>
                        </select>
                    </div>

                    <div className="formInput">
                        <label>Age of Item</label>
                        <input
                            type="text"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="e.g., 6 months"
                            required
                        />
                    </div>

                    <div className="formInput">
                        <label>Image URL</label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                            required
                        />
                    </div>

                    <div className="formInput">
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                        ></textarea>
                    </div>

                    <button type="submit" className="submitBtn">Post Now</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
