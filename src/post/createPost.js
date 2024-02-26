import React, { useState } from 'react';
import './createPost.css';
import Comment from '../comment/comment';
import ShareMenu from './shareMenu';
const CreatePost = ({ id, username, timestamp, originalContent, likes, comments, image, profile }) => {
  // Initialize state variables
  const [totalLikes, setTotalLikes] = useState(likes);

  const [isLiked, setIsLiked] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState(originalContent);
  const [editableImage, setEditableImage] = useState(image);

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
      if(error.message === 'Error: 401'){
        alert('You are not authorized to remove this post.');
        return;
      }
      console.error('Failed to remove post:', error);
      alert('Failed to remove post.');
    }
    setIsRemoved(false); 

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

      // Optimistically toggle the like state
      setIsLiked(!isLiked);

      // Send the request to the server
      const response = await fetch(`http://localhost:12345/api/posts/like/${id}`, {
        method: 'PUT', // or 'POST', as per your backend API
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          isLiked: !isLiked
        }),
      });

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Optionally, update the component state based on the response
      const data = await response.json();
      console.log('Post liked:', data);

    } catch (error) {
      console.error('Failed to like post:', error);
      // Revert the like state if the request fails
      setIsLiked(!isLiked);
      alert('Failed to like post.');
    }
  };

  // Function to handle post edit
  const handleEdit = () => {
    setIsEditing(true);
  };

  // Function to handle post save
  const handleSave = () => {
    // Check if both content and image are empty
    if (!editableContent.trim() && !editableImage) {
      alert('Post must have at least an image or some content.');
      return;
    }
    setIsEditing(false);
  };

  // Function to handle input change
  const handleChange = (event) => {
    setEditableContent(event.target.value);
  };

  const handlleImage = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditableImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  if (isRemoved) {
    return null;
  }
  return (
    isRemoved ? null :
      // Create a post component
      <div className="post">
        <div className="post-header">
          {/** Display user profile picture and post information */}
          <div className="post-header-info">
            <img src={profile} alt="PostIm" className="profilePic" />
            <p className="username">{username}</p>
            <p className="timestamp">{timestamp}</p>
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
              <input type="file" onChange={handlleImage} />
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
            &nbsp; Likes: {likes.length}
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