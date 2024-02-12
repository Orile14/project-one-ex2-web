// In your FriendsList.js or a similar component
import React from 'react';
import './FriendList.css';
import arr from './Friends';

const FriendList = () => {
  return (
    <div className="friends-list">
      <h3>Friends</h3>
      {arr.map((friend) => (
        <div key={friend.id} className="friend-item">
          <img src={friend.profilePicture} alt={friend.name} className="friend-image" />
          <p className="friend-name">{friend.name}</p>
        </div>
      ))}
    </div>
  );
}

export default FriendList;