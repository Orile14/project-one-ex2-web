// FeedItem.js
import React from "react";

const OptionItem = ({ iconClass }) => {
    return (
        <button className="option-section-button">
            <div class="circular-container">
                <i className={`bi ${iconClass}`}></i>
            </div>
        </button>
    );
};

export default OptionItem;
