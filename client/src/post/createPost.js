import React, { useState } from 'react';
import './createPost.css';
import Comment from '../comment/comment';
import ShareMenu from './shareMenu';
const CreatePost = ({ id, username, timestamp, originalContent, likes, comments, image, profile }) => {

  // Initialize state variables
  const [isLiked, setIsLiked] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState(originalContent);
  const [editableImage, setEditableImage] = useState(image);

  // Function to handle post removal
  const Remove = () => {
    setIsRemoved(true);
  };
  // Function to handle post like
  const handleLike = () => {
    setIsLiked(!isLiked);
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

  if (isRemoved) {
    return null;
  }

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
            &nbsp; Likes: {isLiked ? likes + 1 : likes}
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