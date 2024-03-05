import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './createPost.css';
import Comment from '../comment/comment';
import ShareMenu from './shareMenu';
const CreatePost = ({ postOwnerID, id, username, timestamp, originalContent, likes, comments, image, profile }) => {
  // Initialize state variables
  const navigate = useNavigate();
  const [isRemoved, setIsRemoved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState(originalContent);
  const [editableImage, setEditableImage] = useState(image);
  const [LikeCount, setLikeCount] = useState(likes.length);

  // Function to handle post removal
  const Remove = async () => {
    try {

      const token = localStorage.getItem('userToken');
      if (!token) {
        alert('You must be logged in to remove posts.');
        return;
      }

      const response = await fetch(`http://localhost:12345/api/posts/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      console.log('Post removed successfully');
      setIsRemoved(true);
    } catch (error) {
      if (error.message === 'Error: 401') {
        alert('You are not authorized to remove this post.');
        return
      }
      console.error('Failed to remove post:', error);
      alert('Failed to remove post.');
    }
  };

  // Function to handle post like
  const handleLike = async () => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('userToken');
      if (!token) {
        alert('You must be logged in to like posts.');
        return;
      }

      // Send the request to the server
      const response = await fetch(`http://localhost:12345/api/posts/like/${id}`, {
        method: 'PUT', // or 'POST', as per your backend API
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const responseData = await response.json();
      setLikeCount(responseData);

    } catch (error) {
      console.error('Failed to like post:', error);
      alert('Failed to like post.');
    }
  };

  // Function to handle post edit
  const handleEdit = async () => {
    try {
      const token = localStorage.getItem('userToken');
      if (!token) {
        alert('You must be logged in to like posts.');
        return;
      }
      const responseAuth = await fetch(`http://localhost:12345/api/posts/edit/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      });
      if (!responseAuth.ok) {
        throw alert(`Error: not authorized`);
      }
      setIsEditing(true);
    } catch (error) {
      console.error('Failed to edit post:', error);
    }
  };

  // Function to handle post save
  const handleSave = async () => {
    try {
      const userId = localStorage.getItem('userID');
      const token = localStorage.getItem('userToken');
      if (!token) {
        alert('You must be logged in to edit posts.');
        return;
      }
  
      // Initialize FormData
      const formData = new FormData();
  
      // Append editable content
      formData.append('content', editableContent);
  
      // Append image file if a new one has been selected
      if (document.getElementById('imageInput').files[0]) {
        formData.append('image', document.getElementById('imageInput').files[0]);
      } 
  
      const response = await fetch(`http://localhost:12345/api/users/${userId}/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
  
      console.log('Post updated successfully:', data);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to edit post:', error);
    }
  };
  // Function to handle input change
  const handleChange = (event) => {
    setEditableContent(event.target.value);
  };

  const handleUserClick = (userId) => {
    navigate(`/profile/${userId}`);
  };

  if (isRemoved) {
    return null;
  }
  return (
    // Create a post component
    <div className="post">
      <div className="post-header">
        {/** Display user profile picture and post information */}
        <div className="post-header-info">
          <button className="button-with-profilePic" onClick={() => handleUserClick(postOwnerID)}>
            <img src={profile} alt="PostIm" className="profilePic" />
          </button>
          <div className="user-info">
          <button className="username" onClick={() => handleUserClick(postOwnerID)}>{username}</button>
            <p className="timestamp">{timestamp}</p>
          </div>
        </div>
        <div className="post-header-actions">
          {/** Display edit and remove buttons */}
          {isEditing ? (
            // Display save button if editing
            <button id="save" onClick={handleSave}>Save</button>
          ) : (
            // Display edit button if not editing
            <i className="bi bi-pencil-square Edit" onClick={handleEdit}></i>
          )}
          <button className="x-button" onClick={Remove}><i className="bi bi-x-lg"></i></button>
        </div>
      </div>
      {/** Display post content and image */}
      <div className="post-content">
        {isEditing ? (
          // Display textarea and file input if editing
          <div>
            <textarea value={editableContent} onChange={handleChange} className="edit-textarea" />
            <input type="file"  />
          </div>

        ) : (
          // Display post content and image if not editing
          <p>{editableContent}</p>
        )}
        {editableImage && <img src={editableImage} alt="PostIm" className="post-image" />}        </div>

      <div className="buttons">
        {/** Display like, comment, and share buttons */}
        <button className="like-button" onClick={handleLike}>
          <i className="bi bi-hand-thumbs-up"></i>
          &nbsp; Likes: {LikeCount}
        </button>

        {/** Display comment button */}
        <Comment postId={id} comments={comments} className="comment-button" />
        {/** Display share button */}
        <ShareMenu className="share-button" />
      </div>
    </div>
  );
};

export default CreatePost;