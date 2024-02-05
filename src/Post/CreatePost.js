// Post.js
import React from 'react';
import './Post.css';
import { useState } from 'react';
const CreatePost = ({ username, timestamp, content, likes, comments, image }) => {
  return (
    <div className="post">
      <div className="post-header">
        <p className="username">{username}</p>
        <p className="timestamp">{timestamp}</p>
      </div>
      <div className="post-content">
        <p>{content}</p>
        {image && <img src={image} alt="Post Image" className="post-image" />}
      </div>
      <div className="post-footer">

        <div class="buttons">
          <button className="like-button">
          <i class="bi bi-hand-thumbs-up"></i>
            &nbsp; {/* Add space here */}
            Likes: {likes}
          </button>

          <button className="comment-button">
          <i class="bi bi-chat"></i>
            &nbsp; {/* Add space here */}
            Comments: {comments.length}
          </button>

          <button className="share-button">
          <i class="bi bi-send"></i>
            &nbsp; {/* Add space here */}
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
