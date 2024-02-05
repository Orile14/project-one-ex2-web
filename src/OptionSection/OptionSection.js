// FeedSection.js
import React from 'react';
import "./OptionSection.css";
import FeedItem from "./OptionItem/OptionItem";
import OptionData from "./OptionItem/OptionItem.json";

const OptionSection = () => {
  // Import the array of Bootstrap icon classes from FeedItem.json
  const OptionItems = OptionData;

  return (
    <div className="d-flex align-items-center">
      {OptionItems.map((iconClass, index) => (
        <FeedItem
          key={index}
          iconClass={iconClass}
        />
      ))}
    </div>
  );
};

export default OptionSection;
