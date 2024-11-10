
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { AllPostContext } from "../../contextStore/AllPostContext";
import { PostContext } from "../../contextStore/PostContext";
import "./Header.css";
import SearchIcon from "../../assets/SearchIcon";
import Arrow from "../../assets/Arrow";
import SellButton from "../../assets/SellButton";  
import SellButtonPlus from "../../assets/SellButtonPlus";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contextStore/AuthContext";
import Search from "../Search/Search";
import AccountDropdown from '../AccountDropdown'; // Import AccountDropdown

function Header() {
  const { allPost } = useContext(AllPostContext);
  const { setPostContent } = useContext(PostContext);
  const navigate = useNavigate(); 
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const { user } = useContext(AuthContext); 

  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
    const newFilter = allPost ? allPost.filter((value) =>
      value.name.toLowerCase().includes(searchWord.toLowerCase())
    ) : [];

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
    navigate("/view"); 
  };

  const handleEmptyClick = () => {
    alert("No items found.., please search by product name");
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
            aria-label="Search specific product"
          />
          {filteredData.length === 0 ? (
            <div onClick={handleEmptyClick}>
              <SearchIcon />
            </div>
          ) : (
            <div id="clearBtn" onClick={clearInput}>
              <Arrow />
            </div>
          )}
          {filteredData.length !== 0 && (
            <div className="dataResult-header">
              {filteredData.slice(0,  15).map((value, key) => (
                <div
                  key={key}
                  className="dataItem-header"
                  onClick={() => handleSelectedSearch(value)}
                >
                  <p>{value.name}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="productSearch">
          <Search />
        </div>

        <div className="language">
          <span>ENGLISH</span>
          <Arrow />
        </div>

        <div className="loginPage">
          {user ? (
            <>
              <AccountDropdown /> 
            </>
          ) : (
            <Link to="/login">
              <span>Login</span>
            </Link>
          )}
          <hr />
        </div>

        <Link to="/create">
          <div className="sellMenu">
            <SellButton />
            <div className="sellMenuContent">
              <SellButtonPlus />
              <span>SELL</span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;

