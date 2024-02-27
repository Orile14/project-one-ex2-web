import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./feedSection.css";
import FeedItem from "./feedItem/feedItem";
import FeedData from "./feedItem/feedItem.json";

const FeedSection = ({ currentPage }) => {
  const [selectedIcon, setSelectedIcon] = useState(currentPage);
  const navigate = useNavigate();

  const getID = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        alert('You must be logged in to post.');
        return;
      }

      const response = await fetch('http://localhost:12345/api/users/getID', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data.ownerId

    } catch (error) {
      console.error('Error:', error);
      alert('Failed to create user.');
    }
  }

  useEffect(() => {
    if (currentPage === 'feed') {
      setSelectedIcon(FeedData[0]);
    } else if (currentPage === 'profile') {
      setSelectedIcon(FeedData[1]);
    }
  }, [currentPage]);

  const handleItemClick = async (iconClass) => {
    // Only update if the clicked icon is different from the current page
    if ((iconClass === FeedData[0] && currentPage !== 'feed') ||
      (iconClass === FeedData[1])) {
      setSelectedIcon(iconClass);

      if (iconClass === FeedData[0]) {
        navigate('/feed');
      } else if (iconClass === FeedData[1]) {
        const id = await getID();
        navigate(`/profile/${id}`);
      }
    }
  };

  return (
    <div className="d-flex align-items-center">
      {FeedData.map((iconClass, index) => (
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
