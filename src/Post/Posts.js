// Posts.js
import React, { useState } from 'react';
import CreatePost from './CreatePost';
import "./Post.css";
import postsList from './PostsList'; // Assuming this is your provided data

const Posts = () => {
    const [posts, setPosts] = useState(postsList);

    return (
        <div className="posts">
            {posts.map((post, index) => (
                <CreatePost
                    
                    id={index} // Using index as an id, but ideally use a unique id
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
