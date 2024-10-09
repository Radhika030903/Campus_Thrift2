import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginView from "./View/LoginView";
import SignupView from "./View/SignupView";
import Homeview from "./View/Homeview";
import AuthProvider from './contextStore/AuthContext';
import PostProvider from './contextStore/PostContext'; // Import PostProvider
import AllPostProvider from './contextStore/AllPostContext';

function App() {
  return (
    <AuthProvider>
      <AllPostProvider>
        <PostProvider> {/* Wrap with PostProvider */}
          <Router>
            <Routes>
              <Route path="/signup" element={<SignupView />} />
              <Route path="/login" element={<LoginView />} />
              <Route path="/home" element={<Homeview />} />
              <Route path="/" element={<LoginView />} />
            </Routes>
          </Router>
        </PostProvider>
      </AllPostProvider>
    </AuthProvider>
  );
}

export default App;







