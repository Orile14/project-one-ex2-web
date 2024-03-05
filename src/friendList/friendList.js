import React, { useEffect, useState } from 'react';
import './friendList.css';
import { useNavigate } from 'react-router-dom';

const FriendList = ({ refreshFeed }) => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [friendRequests, setFriendRequests] = useState([]);


  useEffect(() => {
    fetchFriends(); 
    fetchRequests();
  }, [refreshFeed]); 

  const fetchFriends = async () => {
    try {
      const userId = localStorage.getItem('userID');
      const token = localStorage.getItem('userToken');
      if (!token) {
          alert('You must be logged in to view friends.');
          return;
      }
      const response = await fetch(`http://localhost:12345/api/users/${userId}/friends`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFriends(data.friends); // Assuming the API returns an object with a 'friends' array
    }
    catch (error) {
        console.error('Error fetching friends:', error);
    }
  };

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
          alert('You must be logged in to view friends.');
          return;
      }
      const response = await fetch(`http://localhost:12345/api/users/req`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setFriendRequests(data.friendsRequest); 
    }
    catch (error) {
        console.error('Error fetching friends:', error);
    }
  };
  const handleReqClick = (userId) => {
    navigate(`/profile/${userId}`, { state: { fromFriendRequest: true } });
  };
  const handleFriendClcik = (userId) => {
    navigate(`/profile/${userId}`);
  };
  return (
     <div className="friends-list">
      <h4>Friendship request</h4>
      {friendRequests.length > 0 ? (
        friendRequests.map((friend, index) => (
          <div key={index} className="friend-item" onClick={() => handleReqClick(friend.id)}>
            <img src={friend.img} alt={friend.nick} className="friend-image" />
            <p className="friend-name">{friend.nick}</p>
          </div>
        ))
      ) : (
        <p>No friendship request to show.</p>
      )}

      <h4>Friends</h4>
      {friends.length > 0 ? (
        friends.map((friend, index) => (
          <div key={index} className="friend-item" onClick={() => handleFriendClcik(friend.id)}>
            <img src={friend.img} alt={friend.nick} className="friend-image" />
            <p className="friend-name">{friend.nick}</p>
          </div>
        ))
      ) : (
        <p>No friends to show.</p>
      )}
    </div>
  );
}

export default FriendList;
