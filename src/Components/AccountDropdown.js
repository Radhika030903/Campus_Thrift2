import React from 'react';
import { auth } from './firebaseConfig';
import { signOut } from "firebase/auth";
import { useHistory } from 'react-router-dom';

const AccountDropdown = ({ onClose }) => {
  const history = useHistory();

  const handleLogout = async () => {
    await signOut(auth);
    history.push('/'); // Redirect to home after logout
    onClose();
  };

  return (
    <div className="dropdown">
      <a href="/dashboard" onClick={onClose}>My Account</a>
      <a href="#" onClick={handleLogout}>Logout</a>
    </div>
  );
};

export default AccountDropdown;
