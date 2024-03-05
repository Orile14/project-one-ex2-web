// OptionSection.js
import React from 'react';
import "./optionSection.css";
import OptionItem from "./optionItem/optionItem";
import OptionData from "./optionItem/optionItem.json";
import { useNavigate } from 'react-router-dom';

const OptionSection = () => {


  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.setItem('userToken', "");
    localStorage.setItem('userID', "");
    navigate('/login');
  };


  const deleteUser = async () => {
    const token = localStorage.getItem('userToken');
    const userId = localStorage.getItem('userID');

    if (!token||!userId) {
      alert('You must be logged in to delete your account.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:12345/api/users/${userId}`, {
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
