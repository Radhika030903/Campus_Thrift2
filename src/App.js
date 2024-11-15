import React from "react";
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

const ProtectedRoute = ({ children }) => {
  const { user } = React.useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

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








