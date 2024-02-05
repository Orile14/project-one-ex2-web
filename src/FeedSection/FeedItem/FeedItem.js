import React from "react";

const FeedItem = ({ iconClass, isClicked, handleClick }) => {
  return (
    <button
      className={`bar feed-item-button ${isClicked ? "clicked" : ""}`}
      onClick={handleClick}
    >
      <i className={`bi ${iconClass} feed-item-icon ${isClicked ? "clicked" : ""}`}></i>
    </button>
  );
};

export default FeedItem;
