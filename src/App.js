import React from "react";

import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from './contextStore/AuthContext'; // Moved imports to top
import PostProvider from './contextStore/PostContext';
import AllPostProvider from './contextStore/AllPostContext';
import LoginView from "./View/LoginView";
import SignupView from "./View/SignupView";
import HomeView from "./View/Homeview"; // Corrected import name
import Posts from "./Components/Post/Post";
import Product from "./Components/Product/Product";
import Dashboard from './Components/Dashboard';
import Header from './Components/Header/Header.js';

import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import LoginView from "./View/LoginView";
import SignupView from "./View/SignupView";
import HomeView from "./View/Homeview";
import Posts from "./Components/Post/Post"; // Import Posts component
import Product from "./Components/Product/Product"; // Import ProductDetail component
import AuthProvider, { AuthContext } from './contextStore/AuthContext';
import PostProvider from './contextStore/PostContext';
import AllPostProvider from './contextStore/AllPostContext';
import CreatePost from "./Components/CreatePost/CreatePost";
import 'react-toastify/dist/ReactToastify.css';


// Custom Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, login, logout } = useAuth();

  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  console.log('Rendering App component');

  return (
    <AuthProvider>
      <AllPostProvider>
        <PostProvider>
          <Router>
            <Header />
            <Routes>
              {/* Public Routes */}
              <Route path="/signup" element={<SignupView />} />
              <Route path="/login" element={<LoginView />} />


              {/* Protected Routes */}
              <Route path="/home" element={<ProtectedRoute><HomeView /></ProtectedRoute>} />
              <Route path="/posts" element={<ProtectedRoute><Posts /></ProtectedRoute>} />
              <Route path="/view/:id" element={<ProtectedRoute><Product /></ProtectedRoute>} />
              <Route path="/dashboard" element={<Dashboard />} />


              {/* Default Route */}

              <Route path="/home" element={<HomeView />} />
              <Route path="/posts" element={<Posts />} /> {/* Route for Posts */}
              <Route path="/view/:id" element={<Product />} /> {/* Route for Product Details */}
              <Route
                path="/create"
                element={
                  <CreatePost />

                }
              />
              <Route path="/" element={<HomeView />} /> {/* Default route */}

            </Routes>
          </Router>
        </PostProvider>
      </AllPostProvider>
    </AuthProvider>
  );
}

export default App;
