import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Updated import from useHistory to useNavigate
import { AllPostContext } from "../../contextStore/AllPostContext";
import { PostContext } from "../../contextStore/PostContext";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contextStore/AuthContext";
import "./Header.css";

function Header() {
  const { allPost } = useContext(AllPostContext);
  const { setPostContent } = useContext(PostContext);
  const navigate = useNavigate(); // Replacing useHistory with useNavigate
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allPost.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  const handleSelectedSearch = (value) => {
    setPostContent(value);
    navigate("/view"); // Updated history.push to navigate
  };

  const handleEmptyClick = () => {
    alert("No items found.., please search by product name");
  };

  const { user } = useContext(AuthContext);

  const logoutHandler = () => {
    // Removed Firebase authentication logic
    alert("You have logged out."); // Placeholder for logout action
    navigate("/login"); // Redirect to login
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="placeSearch">
          <input
            type="text"
            placeholder="Search specific product..."
            value={wordEntered}
            onChange={handleFilter}
          />
          {filteredData.length === 0 ? (
            <div onClick={handleEmptyClick}>
              <button>Search</button>
            </div>
          ) : (
            <div id="clearBtn" onClick={clearInput}>
              <button>Clear</button>
            </div>
          )}
          {filteredData.length !== 0 && (
            <div className="dataResult-header">
              {filteredData.slice(0, 15).map((value, key) => {
                return (
                  <div
                    key={key}
                    className="dataItem-header"
                    onClick={() => handleSelectedSearch(value)}
                  >
                    <p>{value.name} </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="loginPage">
          {user ? (
            user.displayName
          ) : (
            <Link to="/login">
              <span>Login</span>
            </Link>
          )}
          <hr />
        </div>
        {user && (
          <span onClick={logoutHandler} className="logout-span">
            Logout
          </span>
        )}

        <Link to="/create">
          <div className="sellMenu">
            <div className="sellMenuContent">
              <span>SELL</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;

