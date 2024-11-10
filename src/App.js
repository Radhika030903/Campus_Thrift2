
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
  
export default App;