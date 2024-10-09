import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import "./Post.css";
import PostCards from "../PostCards/PostCards";
import { AllPostContext } from "../../contextStore/AllPostContext";

function Posts() {
  const { setAllPost } = useContext(AllPostContext);
  let [posts, setPosts] = useState([]); // For showing all posts in Descending order of date
  let [posts2, setPosts2] = useState([]); // For showing all posts in Ascending order of date
  let [loading, setLoading] = useState(false);
  let [loading2, setLoading2] = useState(false);

  useEffect(() => {
    // Simulate fetching posts
    setLoading(true);
    setLoading2(true);

    // Simulated data fetch
    const simulatedFetchPosts = () => {
      // Simulate a delay
      return new Promise((resolve) => {
        setTimeout(() => {
          const allPostsDescendingOrder = [
            { id: 1, name: "Post 1", createdAt: new Date() },
            { id: 2, name: "Post 2", createdAt: new Date() },
            { id: 3, name: "Post 3", createdAt: new Date() },
          ];

          const allPostsAscendingOrder = [...allPostsDescendingOrder].reverse();

          resolve({ allPostsDescendingOrder, allPostsAscendingOrder });
        }, 1000);
      });
    };

    simulatedFetchPosts().then(({ allPostsDescendingOrder, allPostsAscendingOrder }) => {
      setPosts(allPostsAscendingOrder); // Set posts for ascending order
      setPosts2(allPostsDescendingOrder); // Set posts for descending order
      setAllPost(allPostsDescendingOrder); // Update all posts in context
      setLoading(false);
      setLoading2(false);
    });
  }, [setAllPost]);

  // quickMenuCards assign all cards of post item later it will be displayed
  let quickMenuCards = posts.map((product, index) => {
    return (
      <div className="quick-menu-cards" key={index}>
        <PostCards product={product} index={index} />
      </div>
    );
  });

  let freshRecommendationCards = posts2.map((product, index) => {
    if (index < 4) {
      return (
        <div className="fresh-recommendation-card" key={index}>
          <PostCards product={product} index={index} />
        </div>
      );
    }
    return null;
  });

  return (
    <div className="postParentDiv">
      {posts && (
        <div className="moreView">
          <div className="heading">
            <span>Quick Menu</span>
            <Link to="./viewmore">
              <span>View more</span>
            </Link>
          </div>
          <div className="cards">
            {loading ? <div>Loading...</div> : quickMenuCards}
          </div>
        </div>
      )}
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="fresh-recommendation-cards cards">
          {loading2 ? <div>Loading...</div> : freshRecommendationCards}
        </div>
      </div>
    </div>
  );
}

export default Posts;

