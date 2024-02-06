import React, { useState } from 'react';
import './Feed.css';
import NavigationBar from '../NavigationBar/NavigationBar';
import LeftMenu from '../LeftMenu/LeftMenu';
import Posts from '../Post/Posts';
import PostBox from '../PostBox/PostBox';
import FriendList from '../FriendList/FriendList';
import PostList from '../Post/PostsList';
import PostResult from '../PostsResult/PostsResult';

const Feed = () => {

    const [posts, setPosts] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    const addPost = (postContent) => {
        const newPost = {
            username: "username", 
            timestamp: "Just now",
            content: postContent,
            likes: 0,
            comments: [],
            image: ""
        };
        
        setIsUpdated(true);
        
        setPosts([newPost, ...posts]);  
    }


    return (
        
    
        <div>
            <NavigationBar />
            <div className="row">
                <div className="col-2">
                    <LeftMenu />
                </div>
                <div className="col-8 d-flex flex-column justify-content-start align-items-center">
                    <PostBox addPost={addPost} />
                    {isUpdated ? <Posts posts={posts} /> : null}
                    <Posts posts={PostList} />
                    
                    
                </div>
                <div className="col-2">
                    <FriendList />
                </div>
            </div>
        </div>
    );
};

export default Feed;
