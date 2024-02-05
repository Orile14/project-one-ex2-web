import React, { useState } from 'react';
import "./FeedSection.css";
import FeedItem from "./FeedItem/FeedItem";
import FeedData from "./FeedItem/FeedItem.json";


const FeedSection = () => {
  const [selectedIcon, setSelectedIcon] = useState(null);

  const handleItemClick = (iconClass) => {
    setSelectedIcon(iconClass === selectedIcon ? null : iconClass);
  };

  // Import the array of Bootstrap icon classes from FeedItem.json
  const feedItems = FeedData;

  return (
    <div className="d-flex align-items-center">
      {feedItems.map((iconClass, index) => (
        <FeedItem
          key={index}
          iconClass={iconClass}
          isClicked={iconClass === selectedIcon}
          handleClick={() => handleItemClick(iconClass)}
        />
      ))}
    </div>
  );
};

export default FeedSection;
