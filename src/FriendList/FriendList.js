// In your FriendsList.js or a similar component
import React from 'react';
import './FriendList.css';
import friensdData from './FriendList.json'; // Adjust the path as needed
import IMG from './IMG_8579.jpg'; // Adjust the path as needed


const FriendList = () => {
  return (
    <div className="friends-list">
      <h3>Friends</h3>
      {friensdData.map((friend) => (
        <div key={friend.id} className="friend-item">
          <img src={IMG} alt={friend.name} className="friend-image" />
          <p className="friend-name">{friend.name}</p>
        </div>
      ))}
    </div>
  );
}

export default FriendList;
