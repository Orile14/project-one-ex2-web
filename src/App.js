// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Feed from './Feed/Feed';

function App() {
  return (
      <div className = "app">
      <Feed />
      </div>
   
  );
}

export default App;
