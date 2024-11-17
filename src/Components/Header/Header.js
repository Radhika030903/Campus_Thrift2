import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AllPostContext } from "../../contextStore/AllPostContext";
import { PostContext } from "../../contextStore/PostContext";
import { useAuth } from "../../contextStore/AuthContext";
import "./Header.css";
import SearchIcon from "../../assets/SearchIcon";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";
import SellButtonPlus from "../../assets/SellButtonPlus";
import Search from "../Search/Search";

function Header() {
  const { user, logout } = useAuth(); // Using logout from AuthContext
  const { allPost } = useContext(AllPostContext);
  const { setPostContent } = useContext(PostContext);
  const navigate = useNavigate();

  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Function to handle search filtering
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    if (!allPost) return;

    const filtered = searchWord
      ? allPost.filter((post) =>
          post.name.toLowerCase().includes(searchWord.toLowerCase())
        )
      : [];

    setFilteredData(filtered);
  };

  const clearInput = () => {
    setWordEntered("");
    setFilteredData([]);
  };

  const handleSelectedSearch = (post) => {
    setPostContent(post);
    navigate("/view");
  };

  const handleEmptyClick = () => {
    alert("No items found. Please refine your search!");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        {/* Search Input */}
        <div className="placeSearch">
          <input
            type="text"
            placeholder="Search specific product..."
            value={wordEntered}
            onChange={handleFilter}
            aria-label="Search specific product"
          />
          {filteredData.length === 0 ? (
            <div onClick={handleEmptyClick} role="button" tabIndex="0" aria-label="Search button">
              <SearchIcon />
            </div>
          ) : (
            <div id="clearBtn" onClick={clearInput} role="button" tabIndex="0" aria-label="Clear search">
              <Arrow />
            </div>
          )}
          {filteredData.length > 0 && (
            <div className="dataResult-header">
              {filteredData.slice(0, 15).map((value, key) => (
                <div
                  key={key}
                  className="dataItem-header"
                  onClick={() => handleSelectedSearch(value)}
                  role="button"
                  tabIndex="0"
                >
                  <p>{value.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Search */}
        <div className="productSearch">
          <Search />
        </div>

        {/* Language Selector */}
        <div className="language">
          <span>ENGLISH</span>
          <Arrow />
        </div>

        {/* User Account & Dropdown */}
        <div className="loginPage">
          {user ? (
            <div
              className="userMenu"
              onClick={() => setDropdownOpen((prev) => !prev)}
              role="button"
              tabIndex="0"
              aria-label="Toggle user menu"
            >
              <span>Welcome, {user.displayName || "User"}</span>
              <Arrow />
              {dropdownOpen && (
                <div className="dropdownMenu">
                  <Link to="/dashboard" className="dropdownItem" aria-label="My Account">
                    My Account
                  </Link>
                  <div
                    className="dropdownItem"
                    onClick={handleLogout}
                    role="button"
                    tabIndex="0"
                    aria-label="Logout"
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" aria-label="Login">
              <span>Login</span>
            </Link>
          )}
          <hr />
        </div>

        {/* Sell Button */}
        <Link to="/create" className="sellMenu" aria-label="Create a post">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;
