import React from 'react';
import CreatePost from './CreatePost';
import "./Post.css";
import postsList from './PostsList';

const Posts = () => {
    return (
        <div className="posts">
            {postsList.map((post, index) => (
                <CreatePost
                    key={index}
                    username={post.username}
                    timestamp={post.timestamp}
                    content={post.content}
                    likes={post.likes}
                    comments={post.comments}
                    image={post.image}
                />
            ))}
        </div>
    );
}
export default Posts;