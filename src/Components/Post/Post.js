import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase"; // Adjust the path to your Firebase config
import "./Post.css";
import PostCards from "../PostCards/PostCards";
import { AllPostContext } from "../../contextStore/AllPostContext";

function Posts() {
  const { setAllPost } = useContext(AllPostContext);
  const [posts, setPosts] = useState([]); // For showing all posts in Ascending order of date
  const [posts2, setPosts2] = useState([]); // For showing all posts in Descending order of date
  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setLoading2(true);
      
      try {
        // Fetch data from Firestore
        const postCollection = collection(db, "posts");
        const q = query(postCollection, orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);

        const allPosts = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt), // Convert Firestore timestamp to Date
        }));

        const allPostsDescendingOrder = allPosts; // Already sorted by "desc" in query
        const allPostsAscendingOrder = [...allPosts].reverse(); // Create ascending order copy

        setPosts(allPostsAscendingOrder);
        setPosts2(allPostsDescendingOrder);
        setAllPost(allPostsDescendingOrder); // Update context
        setLoading(false);
        setLoading2(false);
      } catch (error) {
        console.error("Error fetching posts: ", error);
        setLoading(false);
        setLoading2(false);
      }
    };

    fetchPosts();
  }, [setAllPost]);

  const renderQuickMenuCards = () =>
    posts.map((product, index) => (
      <div className="quick-menu-cards" key={index}>
        <PostCards product={product} index={index} />
      </div>
    ));

  const renderFreshRecommendationCards = () =>
    posts2.slice(0, 4).map((product, index) => (
      <div className="fresh-recommendation-card" key={index}>
        <PostCards product={product} index={index} />
      </div>
    ));

  return (
    <div className="postParentDiv">
      {posts.length > 0 && (
        <div className="moreView">
          <div className="heading">
            <span>Quick Menu</span>
            <Link to="./viewmore">
              <span>View more</span>
            </Link>
          </div>
          <div className="cards">
            {loading ? <div>Loading...</div> : renderQuickMenuCards()}
          </div>
        </div>
      )}
      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="fresh-recommendation-cards cards">
          {loading2 ? <div>Loading...</div> : renderFreshRecommendationCards()}
        </div>
      </div>
    </div>
  );
}

export default Posts;