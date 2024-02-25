// FeedItem.js
import React from "react";

const OptionItem = ({ iconClass, onLogout }) => {
    return (
        <button className="option-section-button" onClick={onLogout}>
            <div className="circular-container">
                <i className={`bi ${iconClass}`}></i>
            </div>
        </button>
    );
};

export default OptionItem;
