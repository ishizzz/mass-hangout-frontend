import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar"; // Sidebar Component
import Login from "./Pages/Login/Login"; // Login Page
import Register from "./Pages/Register/Register"; // Register Page
import "./App.css"; // General styles for layout

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to manage login

  return (
    <Router>
      <div className="app">
        {/* Render Sidebar only if the user is logged in */}
        {isLoggedIn && <Sidebar />}
        
        {/* Main content area */}
        <div className={`main-content ${!isLoggedIn ? "center-content" : ""}`}>
          <Routes>
            {/* Routes for the application */}
            {!isLoggedIn ? (
              <>
                <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/register" element={<Register />} />
              </>
            ) : (
              <>
                <Route path="/profile" element={<div>Profile Page</div>} />
                <Route path="/welcome" element={<div>Welcome Page</div>} />
              </>
            )}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
