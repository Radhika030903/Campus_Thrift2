import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contextStore/AuthContext';
import { collection, addDoc } from "firebase/firestore";
import { storage, db } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import './CreatePost.css';

function CreatePost() {
    const navigate = useNavigate();
    const { user } = useAuth();
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
    const [selectedImages, setSelectedImages] = useState([]);
    const [isDragOver, setIsDragOver] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(files);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        setSelectedImages(files);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!user) {
                alert("Please login to post items");
                return;
            }

            if (!formData.imageUrl) {
                alert("Please provide an image URL");
                return;
            }

            const postData = {
                sellerName: formData.sellerName,
                contactNumber: formData.contactNumber,
                name: formData.name,
                category: formData.category,
                price: formData.price,
                condition: formData.condition,
                age: formData.age,
                description: formData.description,
                imageUrls: [formData.imageUrl],
                userId: user.uid,
                createdAt: new Date().toISOString()
            };

            await addDoc(collection(db, "posts"), postData);
            alert("Post created successfully!");
            navigate("/");

        } catch (error) {
            console.error("Error creating post:", error);
            alert(`Error creating post: ${error.message}`);
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
                            <option value="Others">Others</option>
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
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            rows="4"
                        ></textarea>
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

                    <button type="submit" className="submitBtn">Post Now</button>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;
