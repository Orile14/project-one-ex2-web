import React, { useState } from 'react';
import './Post.css';

const CreatePost = ({ username, timestamp, originalContent, likes, comments, image }) => {
  console.log("Original content:", originalContent); // Add this line to debug

  const [isLiked, setIsLiked] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState(originalContent);

  const Remove = () => {
    setIsRemoved(true);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically update the post content in your backend
    // For now, we're just updating the local state
  };

  const handleChange = (event) => {
        setEditableContent(event.target.value);
    };

  if (isRemoved) {
    return null;
  } 


  return (
    isRemoved ? null :
          <div className="post">
        <div className="post-header">
          <div className="post-header-info">
            <p className="username">{username}</p>
            <p className="timestamp">{timestamp}</p>
          </div>
          <div className="post-header-actions">
            {isEditing ? (
              <button onClick={handleSave}>Save</button>
            ) : (
              <i className="bi bi-pencil-square Edit" onClick={handleEdit}></i>
            )}
            <button className="x-button" onClick={Remove}><i className="bi bi-x-lg"></i></button>
          </div>
        </div>

        <div className="post-content">
                {isEditing ? (
                    <textarea value={editableContent} onChange={handleChange} className="edit-textarea" />
                ) : (
                    <p>{editableContent}</p>
                )}
          {image && <img src={image} alt="Post Image" className="post-image" />}
        </div>

        <div className="buttons">
          <button className="like-button" onClick={handleLike}>
            <i className="bi bi-hand-thumbs-up"></i>
            &nbsp; Likes: {isLiked ? likes + 1 : likes}
          </button>

          <button className="comment-button">
            <i className="bi bi-chat"></i>
            &nbsp; Comments: {comments.length}
          </button>

          <button className="share-button">
            <i className="bi bi-send"></i>
            &nbsp; Share
          </button>
        </div>
      </div>
  );
};

export default CreatePost;
