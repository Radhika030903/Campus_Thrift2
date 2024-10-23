import React, { useContext } from "react";
import { useParams } from "react-router-dom"; // to access URL parameters
import { AllPostContext } from "../../contextStore/AllPostContext";
import "./Product.css"; // Assuming you have additional styling

function Product() {
  const { id } = useParams(); // Get the product ID from the URL
  const { allPost } = useContext(AllPostContext); // Get all posts from context

  // Find the product by ID
  const product = allPost.find((post) => post.id === parseInt(id));

  if (!product) {
    return <div>Product not found!</div>; // Handle case where product is not found
  }

  return (
    <div className="flex flex-col justify-center items-center w-auto h-auto gap-5 p-5 bg-gray-800 rounded-lg md:flex-row">
      {/* Product Image with Logo */}
      <div className="flex justify-center items-center w-28 h-28 p-5 bg-gradient-to-r from-green-400 to-[#002Ff9] rounded-lg hover:-translate-y-10 duration-700 hover:scale-125">
        <img src={product.imageUrl} alt={product.name} className="logo-svg" />
      </div>

      {/* Product Details */}
      <div className="max-w-sm h-auto space-y-3">
        <div className="flex justify-center items-center sm:justify-between">
          <h2 className="text-white text-2xl font-bold tracking-widest">{product.name}</h2>
          <svg viewBox="0 0 24 24" height="20" width="20" xmlns="http://www.w3.org/2000/svg" className="hidden sm:flex hover:scale-150 duration-300 fill-white cursor-pointer">
            <path d="M16 2v17.582l-4-3.512-4 3.512v-17.582h8zm2-2h-12v24l6-5.269 6 5.269v-24z"></path>
          </svg>
        </div>

        {/* Product Price */}
        <div className="flex gap-6 items-center justify-center">
          <p className="text-white font-bold text-lg">₹{product.price}</p>
          {product.originalPrice && (
            <p className="text-gray-300 font-semibold text-sm line-through">₹{product.originalPrice}</p>
          )}
        </div>

        {/* Product Details: Size, Age */}
        <p className="text-sm text-gray-200">Size: {product.size || "N/A"}</p>
        <p className="text-sm text-gray-200">Age: {product.age || "N/A"}</p>

        {/* Action Buttons */}
        <div className="flex justify-around items-center my-2">
          <button className="px-2 bg-blue-600 p-1 rounded-md text-white font-semibold shadow-xl shadow-blue-500/50 hover:ring-2 ring-blue-400 hover:scale-75 duration-500">
            Buy Now
          </button>
          <button className="px-2 border-2 border-white p-1 rounded-md text-white font-semibold shadow-lg shadow-white hover:scale-75 duration-500">
            Add to Cart
          </button>
        </div>

        {/* Product Description */}
        <p className="text-sm text-gray-200">Description: {product.description || "No description available."}</p>
      </div>
    </div>
  );
}

export default Product;

