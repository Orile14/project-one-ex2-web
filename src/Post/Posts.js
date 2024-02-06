// Posts.js
import React, { useState } from 'react';
import CreatePost from './CreatePost';
import "./Post.css";

const Posts = ({posts}) => {
   
    return (
        <div className="posts">
            {posts.map((post) => (
                <CreatePost
                    username={post.username}
                    timestamp={post.timestamp}
                    originalContent={post.content}
                    likes={post.likes}
                    comments={post.comments}
                    image={post.image}
                />
            ))}
        </div>
    );
};

export default Posts;
