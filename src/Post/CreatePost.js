import React, { useState } from 'react';
import './CreatePost.css';
import Comment from '../Comment/Comment';
import ShareMenu from './ShareMenu';
const CreatePost = ({ id, username, timestamp, originalContent, likes, comments, image, profile }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState(originalContent);
  const [editableImage, setEditableImage] = useState(image);


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

  };

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
      <div className="post">
        <div className="post-header">
          <div className="post-header-info">
          <img src = {profile} alt="Post Image" className="profilePic"/>
            <p className="username">{username}</p>
            <p className="timestamp">{timestamp}</p>
  
          </div>
          <div className="post-header-actions">
            {isEditing ? (
              <button id="save" onClick={handleSave}>Save</button>
            ) : (
              <i className="bi bi-pencil-square Edit" onClick={handleEdit}></i>
            )}
            <button className="x-button" onClick={Remove}><i className="bi bi-x-lg"></i></button>
          </div>
        </div>

        <div className="post-content">
          {isEditing ? (
            <div>
            <textarea value={editableContent} onChange={handleChange} className="edit-textarea" />
            <input type="file" onChange={handlleImage} />
            </div>
            ) : (
            <p>{editableContent}</p>
            )} 
          {image && <img src={editableImage} alt="Post Image" className="post-image" />}
          
        </div>

        <div className="buttons">
          <button className="like-button" onClick={handleLike}>
            <i className="bi bi-hand-thumbs-up"></i>
            &nbsp; Likes: {isLiked ? likes + 1 : likes}
          </button>
          <Comment postId={id} comments={comments} className="comment-button" />

          <ShareMenu className="share-button" />
            
        </div>
      </div>
  );
};

export default CreatePost;