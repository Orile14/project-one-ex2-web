// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './login/Login';
import SignUp from './signUp/SignUp';
import Feed from './Feed/Feed';

function App() {
  return (
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Set the default route to /login */}
        <Route path="/Feed" element={<Feed />} />
        <Route index element={<Login />} />
      </Routes>
   
  );
}

export default App;
