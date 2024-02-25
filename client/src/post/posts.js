import React from 'react';
import CreatePost from './createPost';

const Posts = ({ posts }) => {
    // Sort posts by date in descending order
    const sortedPosts = posts.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is 0-indexed
        const year = date.getFullYear();
        return `${hours}:${minutes} ${day}/${month}/${year}`;
    };
    
    return (
        <div className="posts">
            {sortedPosts.map(post => (  
                <CreatePost
                    key={post._id}
                    id={post._id}
                    username={post.username}
                    timestamp={formatDate(post.date)}
                    originalContent={post.content}
                    likes={post.likes}
                    comments={post.comments}
                    image={post.img} 
                    profile={post.profile} 
                />
            ))}
        </div>
    );
};

export default Posts;
