import React, { useState } from "react";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (response.ok) {
        window.location.href = "/welcome";
      } else {
        setErrorMessage(result.message || "Login failed");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again.");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Left Section */}
        <div className="login-left">
          <h1>UMass Hangout</h1>
          <p>Find your vibe at UMass!</p>
          <img src="/mascot.png" alt="UMass Mascot" className="mascot" />
        </div>

        {/* Vertical Line */}
        <div className="vertical-line"></div>

        {/* Right Section */}
        <div className="login-right">
          <h2>Welcome back!</h2>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
            <div className="remember-forgot">
  <label>
    <input type="checkbox" />
    Remember me
  </label>
  <a href="/forgot-password">Forgot password?</a>
</div>
    
            <button type="submit" className="btn-login">
              Sign in
            </button>
          </form>
          <p>
            Don’t have an account? <a href="/register">Sign up here!</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
