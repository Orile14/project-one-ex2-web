import React, { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import InputBox from "../InputBox/InputBox";
import User from "../SignUp/User"; 
import { ThemeContext } from '../ThemeContext/ThemeContext';
import { useAuth } from '../AuthContext/AuthContext';

const Login = () => {
  // Accessing theme and toggleTheme from ThemeContext using useContext hook
  const { theme, toggleTheme } = useContext(ThemeContext); 
  // Use the useNavigate hook to navigate to other pages
  const navigate = useNavigate();
  // Initialize state for username, password, and login message
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const { login } = useAuth();

  const handleSignUpClick = () => {
    // Change this to the path of your signup page
    navigate('/signup'); 
  };

  const handleLoginClick = () => {
    // Check if the provided email and password match any user in the list
    const user = User.allUsers.find(u => u.name === username && u.password === password);

    if (user) {
      setLoginMessage(`Welcome, ${username}! You have successfully logged in.`);
      login();
      //change the path to the feed page
      navigate('/Feed'); 
    } else {
      setLoginMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="Login">
      {/* Use the theme to conditionally render the class */}
      <button className="Toggle" onClick={toggleTheme}>
        {theme === 'dark' ? 'Dark Mode' : 'Light Mode'} 
      </button>
      <div className="content-box">
        {/* Add the login form */}
        <InputBox param={"username"} value={username} onChange={setUsername} />
        <InputBox param={"password"} value={password} onChange={setPassword} />
        <button type="button" className="btn btn-primary" onClick={handleLoginClick}>
          Login
        </button>
        <button type="button" className="btn btn-success" onClick={handleSignUpClick}>
          Sign Up
        </button>
        <div>
          {/* Display login message */}
          {loginMessage && <p>{loginMessage}</p>}
        </div>
      </div>

      <div id="textContainerf">
        {/* Add the facebook logo */}
        <p>facebook</p>
      </div>
      <div id="textContainer">
        <p>Connect with friends and the world around you on Facebook.</p>
      </div>

    </div>
  );
};


export default Login;
