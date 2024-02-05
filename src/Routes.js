// src/Routes.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./login/Login";
import SignUp from "./signUp/SignUp"; // Adjust the path based on your project structure

const Home = () => {
  return <h2>Home Page</h2>; // You can replace this with your home page component
};

const NotFound = () => {
  return <h2>404 - Not Found</h2>; // You can customize your 404 page
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />{"./login/Login"}
        <Route path="/signup" element={<SignUp />} /> {"./signUp/SignUp"}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
