<<<<<<< HEAD
import React from "react";  
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  
import LoginView from "./View/LoginView";  
import SignupView from "./View/SignupView";  
import HomeView from "./View/Homeview"; // Corrected import name  
import Posts from "./Components/Post/Post"; // Added import statement  
import Product from "./Components/Product/Product"; // Import ProductDetail component  
import AuthProvider from './contextStore/AuthContext';  
import PostProvider from './contextStore/PostContext';  
import AllPostProvider from './contextStore/AllPostContext';  
import Dashboard from './Components/Dashboard'; // Correct path to Dashboard  
import Header from './Components/Header/Header.js';  
  
function App() {  
  console.log('Rendering App component'); 
  return (  
   <AuthProvider>  
    <AllPostProvider>  
      <PostProvider>  
      <Router>  
       <Header/>  
        <Routes>  
          <Route path="/signup" element={<SignupView />} />  
          <Route path="/login" element={<LoginView />} />  
          <Route path="/home" element={<HomeView />} />  
          <Route path="/posts" element={<Posts />} /> {/* Route for Posts */}  
          <Route path="/view/:id" element={<Product />} /> {/* Route for Product Details */}  
          <Route path="/dashboard" element={<Dashboard />} /> {/* Route for Dashboard */}  
          <Route path="/" element={<LoginView />} /> {/* Default route */}  
        </Routes>  
      </Router>  
      </PostProvider>  
    </AllPostProvider>  
   </AuthProvider>  
  );  
}  
  
=======
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import LoginView from "./View/LoginView";
import SignupView from "./View/SignupView";
import HomeView from "./View/Homeview";
import Posts from "./Components/Post/Post"; // Import Posts component
import Product from "./Components/Product/Product"; // Import ProductDetail component
import AuthProvider, { AuthContext } from './contextStore/AuthContext';
import PostProvider from './contextStore/PostContext';
import AllPostProvider from './contextStore/AllPostContext';
import CreatePost from "./Components/CreatePost/CreatePost";

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
                  <ProtectedRoute>
                    <CreatePost />
                  </ProtectedRoute>
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

>>>>>>> 8314b8803f6a48799eb2a34e9c6ca924bebff6ad
export default App;
