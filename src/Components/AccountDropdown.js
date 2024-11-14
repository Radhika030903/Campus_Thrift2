
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contextStore/AuthContext";

function AccountDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleMyAccount = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="account-dropdown">
      <button onClick={() => setDropdownOpen(!dropdownOpen)}>
        Welcome, {user?.displayName || "User"}
      </button>
      {dropdownOpen && (
        <div className="dropdown-menu">
          <div onClick={handleMyAccount}>My Account</div>
          <div onClick={handleLogout}>Logout</div>
        </div>
      )}
    </div>
  );
}

export default AccountDropdown;




