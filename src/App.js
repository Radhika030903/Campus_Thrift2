import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginView from "./View/LoginView";
import SignupView from "./View/SignupView";
import HomeView from "./View/Homeview";
import Posts from "./Components/Post/Post"; // Import Posts component
import Product from "./Components/Product/Product"; // Import ProductDetail component
import AuthProvider from './contextStore/AuthContext';
import PostProvider from './contextStore/PostContext';
import AllPostProvider from './contextStore/AllPostContext';

function App() {
  return (
    <AuthProvider>
      <AllPostProvider>
        <PostProvider>
          <Router>
            <Routes>
              <Route path="/signup" element={<SignupView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/home" element={<HomeView />} />
              <Route path="/posts" element={<Posts />} /> {/* Route for Posts */}
              <Route path="/view/:id" element={<Product />} /> {/* Route for Product Details */}
              <Route path="/" element={<LoginView />} /> {/* Default route */}
            </Routes>
          </Router>
        </PostProvider>
      </AllPostProvider>
    </AuthProvider>
  );
}

export default App;








