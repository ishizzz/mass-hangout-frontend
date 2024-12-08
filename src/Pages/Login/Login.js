import React, { useState } from "react";
import axios from 'axios';
import "./Login.css";
import { useNavigate } from 'react-router-dom'; 
import { useUser } from '../../UserContext'; // Import useUser hook
import config from '../../config/config';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const { setUserEmail } = useUser(); 
  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Handle email validation on blur
  const handleEmailBlur = () => {
    if (!validateEmail(email)) {
      setEmailError('Invalid email format.');
    } else {
      setEmailError('');
    }
  };

 

  // Handle email input change
  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (emailError && validateEmail(newEmail)) {
      setEmailError('');
    }
  };


  const handleLogin = async (e) => {
    e.preventDefault();
    // try {
    //   const response = await fetch("config.BASE_URL}/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email, password }),
    //   });


    try {
      // Send POST request to the backend login endpoint using BASE_URL from config
        // Print the base URL to the console for debugging
      console.log("Base URL:", config.USER_SERVICE);

      const response = await axios.post(`${config.USER_SERVICE}/login`, {
        email: email,
        password: password
      });
  
      // Check if the response is successful
      if (response.status === 200) {
        // Valid login, navigate to the dashboard
        if (response.data.code === 10004) {
          setUserEmail(email); // Set the email in the context
          navigate('/dashboard');
        } else {
          // Unexpected success response (optional handling)
          setErrorMessage('Unexpected error. Please try again.');
        }
      }
    } catch (error) {
      // Handle errors based on the status code
      if (error.response) {
        const { code, message } = error.response.data;

        switch (error.response.status) {
          case 401:
            // Invalid password
            if (code === 10005) {
              setErrorMessage(message);
            }
            break;

          case 404:
            // User not found
            if (code === 10003) {
              setErrorMessage(message);
            }
            break;

          default:
            // General error handling for unexpected errors
            setErrorMessage('Something went wrong. Please try again later.');
        }
      } else {
        // Handle errors that aren't related to response (network issues, etc.)
        setErrorMessage('Network error. Please check your connection.');
      }
    }
  };
  
  //     const result = await response.json();
  //     if (response.ok) {
  //       window.location.href = "/welcome";
  //     } else {
  //       setErrorMessage(result.message || "Login failed");
  //     }
  //   } catch (error) {
  //     setErrorMessage("An error occurred. Please try again.");
  //     console.error("Login error:", error);
  //   }
  // };

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
              onChange={handleEmailChange}
              onBlur={handleEmailBlur}
              placeholder="Enter your email"
              required
            /> 
            {emailError && <div className="error-message">{emailError}</div>}
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              required
            />
            {/* <div className="remember-forgot">
              <label>
              <input type="checkbox" />
              Remember me
              </label>
              <a href="/forgot-password">Forgot password?</a>
            </div> */}
    
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
