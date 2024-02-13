import React from 'react';
import './FriendList.css';
import arr from './Friends';
// This function creates the friend list
const FriendList = () => {
  return (
    // Add the friend list to the friends list container
    <div className="friends-list">
      <h3>Friends</h3>
      {/* Map through the friends and create a friend item for each friend */}
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