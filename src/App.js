import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginView from "./View/LoginView";
import SignupView from "./View/SignupView";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/" element={<LoginView />} />  {/* Default to login */}
      </Routes>
    </Router>
  );
}

export default App;



