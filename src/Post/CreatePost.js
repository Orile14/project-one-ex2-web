// Post.js
import React, { useState } from 'react';
import './Post.css';

const CreatePost = ({ username, timestamp, content, likes, comments, image }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  const Remove = () => {
    setIsRemoved(true);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  return (
    isRemoved ? null :
      <div className="post">
        <div className="post-header">
          <p className="username">{username}</p>
          <p className="timestamp">{timestamp}</p>
          <button className="x-button" onClick={Remove}><i className="bi bi-x-lg"></i></button>
          <i className="bi bi-pencil-square Edit" ></i>
        </div>

        <div className="post-content">
          <p>{content}</p>
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
