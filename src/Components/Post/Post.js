import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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
    // Simulated data fetch
    const simulatedFetchPosts = () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          const allPosts = [
            {
              id: 1,
              name: "iPhone 14 - Red",
              price: "$999",
              createdAt: new Date("2023-10-01"),
              imageUrl: "https://m.xcite.com/media/catalog/product/i/p/iphone_14_5g_-_red_1_3.jpg",
            },
            {
              id: 6,
              name: "Digital Camera",
              price: "$499",
              createdAt: new Date("2023-09-05"),
              imageUrl: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0",
            },
            {
              id: 7,
              name: "Bluetooth Speaker",
              price: "$199",
              createdAt: new Date("2023-09-01"),
              imageUrl: "https://th.bing.com/th/id/OIP.XbrFx6W0hObvguLGIFWPaQAAAA?rs=1&pid=ImgDetMain",
            },
            {
              id: 8,
              name: "E-Book Reader",
              price: "$120",
              createdAt: new Date("2023-08-28"),
              imageUrl: "https://th.bing.com/th/id/OIP.ZnMV40kDZa26nXmBR8LcoAHaHa?rs=1&pid=ImgDetMain",
            },
            {
              id: 9,
              name: "Gaming Mouse",
              price: "$60",
              createdAt: new Date("2023-08-20"),
              imageUrl: "https://cdn.windowsreport.com/wp-content/uploads/2020/11/Gaming-mouse-min.jpeg",
            },
            {
              id: 10,
              name: "Mechanical Keyboard",
              price: "$150",
              createdAt: new Date("2023-08-15"),
              imageUrl: "https://i.pinimg.com/originals/ad/ce/4f/adce4f29cac66e793fd076652c795249.jpg",
            },
            {
              id: 11,
              name: "Fitness Tracker",
              price: "$80",
              createdAt: new Date("2023-08-10"),
              imageUrl: "https://th.bing.com/th/id/OIP.NvATc9bJK33WLY0SOp0DvgHaJR?rs=1&pid=ImgDetMain",
            },
            {
              id: 12,
              name: "VR Headset",
              price: "$350",
              createdAt: new Date("2023-08-01"),
              imageUrl: "https://th.bing.com/th/id/OIP.roCAOIqOkXpewd23gCXErwAAAA?rs=1&pid=ImgDetMain",
            },
          ];

          // Filter out unwanted posts
          const filteredPosts = allPosts.filter((post) => {
            return (
              post.name !== "Wireless Earbuds" &&
              post.name !== "Smart Watch" &&
              post.name !== "Mobile - Samsung Galaxy" &&
              post.name !== "Laptop - Dell Inspiron"
            );
          });

          const allPostsDescendingOrder = filteredPosts.sort((a, b) => b.createdAt - a.createdAt);
          const allPostsAscendingOrder = [...allPostsDescendingOrder].reverse();

          resolve({ allPostsDescendingOrder, allPostsAscendingOrder });
        }, 1000);
      });
    };

    setLoading(true);
    setLoading2(true);

    simulatedFetchPosts().then(({ allPostsDescendingOrder, allPostsAscendingOrder }) => {
      setPosts(allPostsAscendingOrder); // Set posts for ascending order
      setPosts2(allPostsDescendingOrder); // Set posts for descending order
      setAllPost(allPostsDescendingOrder); // Update all posts in context
      setLoading(false);
      setLoading2(false);
    });
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


