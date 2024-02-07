import React, { useState } from 'react';
import './Feed.css';
import NavigationBar from '../NavigationBar/NavigationBar';
import LeftMenu from '../LeftMenu/LeftMenu';
import Posts from '../Post/Posts';
import PostBox from '../PostBox/PostBox';
import FriendList from '../FriendList/FriendList';
import PostList from '../Post/PostsList';

const Feed = () => {

    const [posts, setPosts] = useState(PostList);
    const [isUpdated, setIsUpdated] = useState(false);

    const addPost = (postContent) => {
        const newPost = {
            id: posts.length,
            username: "username", 
            timestamp: "Just now",
            content: postContent,
            likes: 0,
            comments: [],
            image: ""
        };
        
        setIsUpdated(true);
        setPosts([...posts, newPost]);
    }


    return (
        
    
        <div>
            <NavigationBar />
            <div className="row">
                <div className="col-2">
                    <LeftMenu />
                </div>
                <div className="col-8 d-flex flex-column justify-content-start align-items-center">
                    {console.log("asdasdasdasdasdasd", posts)}
                    <PostBox addPost={addPost} />
                    <Posts posts={posts} />
                </div>
                <div className="col-2">
                    <FriendList />
                </div>
            </div>
        </div>
    );
};

export default Feed;
