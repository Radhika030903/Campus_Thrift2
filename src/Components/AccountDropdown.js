import React, { useContext } from 'react';
import { AuthContext } from '../contextStore/AuthContext'; // Adjust path as necessary
import { auth } from '../firebase'; // Adjust path as necessary
import { useNavigate } from 'react-router-dom'; // Importing useNavigate instead of useHistory

const AccountDropdown = ({ onClose }) => {
  const { user } = useContext(AuthContext); // Access user from AuthContext
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      navigate('/'); // Redirect to home after logout using useNavigate
      onClose(); // Close the dropdown
    } catch (error) {
      console.error("Logout error:", error); // Handle any errors during logout
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button type="button" className="flex items-center">
          {/* Add your account icon or image here */}
          <img src="path_to_account_icon" alt="Account" />
        </button>
      </div>

      {/* Dropdown menu */}
      <div className="absolute right-0 z-10 mt-2 w-56 bg-white rounded-md shadow-lg">
        <div className="py-1">
          <a href="/dashboard" className="block px-4 py-2 text-sm text-gray-700" onClick={onClose}>
            My Account
          </a>
          <button 
            onClick={handleLogout} 
            className="block w-full text-left px-4 py-2 text-sm text-gray-700">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountDropdown;



