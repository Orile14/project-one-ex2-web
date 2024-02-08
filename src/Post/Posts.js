// Posts.js
import React from 'react';
import CreatePost from './CreatePost';
import "./Posts.css";

const Posts = ({ posts }) => {
    // Sort posts in descending order based on their IDs
    const sortedPosts = posts.slice().sort((a, b) => b.id - a.id);

    return (
        <div className="posts">
            {sortedPosts.map((post) => (
                <CreatePost
                    key={post.id}
                    id={post.id}
                    username={post.username}
                    timestamp={post.timestamp}
                    originalContent={post.content}
                    likes={post.likes}
                    comments={post.comments}
                    image={post.image}
                    profile={post.profile}
                />
            ))}
        </div>
    );
};

export default Posts;
