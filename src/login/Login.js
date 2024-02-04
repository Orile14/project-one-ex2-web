import React, { useState } from "react";
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import "./Login.css";
import InputBox from "../inputBox/InputBox";

import User from "../signUp/user"; // Update the path accordingly

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");

  const handleSignUpClick = () => {
    navigate('/signup'); // Change this to the path of your signup page
  };

  const handleLoginClick = () => {
    // Check if the provided email and password match any user in the list
    const user = User.allUsers.find(u => u.name === username && u.password === password);

    if (user) {
      setLoginMessage(`Welcome, ${username}! You have successfully logged in.`);
      // Add additional logic or redirect the user as needed
    } else {
      setLoginMessage('Invalid email or password. Please try again.');
    }
  };

    return (
        <div className="Login">
            
                <div className="content-box">
                    <InputBox param={"username"} value={username} onChange={setUsername} />
                    <InputBox param={"password"} value={password} onChange={setPassword} />
                    <button type="button" className="btn btn-primary" onClick={handleLoginClick}>
                        Login
                    </button>
                    <button type="button" className="btn btn-success" onClick={handleSignUpClick}>
                        Sign Up
                    </button>
                    <div>
                        {loginMessage && <p>{loginMessage}</p>}
                    </div>
                </div>
                
                <div id="textContainerf">
                    <p>facebook</p>
                </div>
                <div id="textContainer">
                    <p>Connect with friends and the world around you on Facebook.</p>
                </div>
            
        </div>
    );
};


export default Login;
