// OptionSection.js
import React from 'react';
import "./optionSection.css";
import OptionItem from "./optionItem/optionItem";
import OptionData from "./optionItem/optionItem.json";
import { useAuth } from '../authContext/authContext';
import { useNavigate } from 'react-router-dom';

const OptionSection = () => {

  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    //change the path to the feed page
    navigate('/login');
  };


  const deleteUser = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      alert('You must be logged in to delete your account.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:12345/api/users/', {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      handleLogout();
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };
  
  // Import the array of Bootstrap icon classes from FeedItem.json
  const OptionItems = OptionData;

  return (
    <div className="d-flex align-items-center">
      {OptionItems.map((iconClass, index) => (
        <OptionItem
          key={index}
          iconClass={iconClass}
          onLogout={handleLogout}
          deleteUser={deleteUser}
        />
      ))}
    </div>
  );
};

export default OptionSection;
