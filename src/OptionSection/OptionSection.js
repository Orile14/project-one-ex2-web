// OptionSection.js
import React from 'react';
import "./OptionSection.css";
import OptionItem from "./OptionItem/OptionItem";
import OptionData from "./OptionItem/OptionItem.json";
import { useAuth } from '../AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const OptionSection = () => {

  const { logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
   //change the path to the feed page
    navigate('/login'); 
};

  // Import the array of Bootstrap icon classes from FeedItem.json
  const OptionItems = OptionData;

  return (
    <div className="d-flex align-items-center">
      {OptionItems.map((iconClass, index) => (
        <OptionItem
          key={index}
          iconClass={iconClass}
          onLogout={iconClass === "bi-box-arrow-right" ? handleLogout : null}
        />
      ))}
    </div>
  );
};

export default OptionSection;
