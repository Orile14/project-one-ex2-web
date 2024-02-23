// OptionSection.js
import React from 'react';
import "./optionSection.css";
import OptionItem from "./optionItem/optionItem";
import OptionData from "./optionItem/OptionItem.json";
import { useAuth } from '../authContext/authContext';
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
