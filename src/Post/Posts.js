// Posts.js
import React from 'react';
import CreatePost from './CreatePost';

const Posts = ({ posts }) => {
    // Sort posts in descending order based on their IDs
    const sortedPosts = posts.slice().sort((a, b) => b.id - a.id);

    return (
        <div className="posts">
            {/* Map through the sorted posts and create a CreatePost component for each post */}
            {sortedPosts.map(post => (
                // Pass the post data as props to the CreatePost component
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
