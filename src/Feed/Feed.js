import React, { useState } from 'react';
import './Feed.css';
import NavigationBar from '../NavigationBar/NavigationBar';
import LeftMenu from '../LeftMenu/LeftMenu';
import Posts from '../Post/Posts';
import PostBox from '../PostBox/PostBox';
import FriendList from '../FriendList/FriendList';
import PostList from '../Post/PostsList';
import User from '../SignUp/User';

// This function creates the feed
const Feed = () => {
    const user = User.allUsers[0];
    let username;
    let profile;
    // Get the first user from the list of all users
    {user == null ? profile = "": profile = user.getImage()}
    {user == null ? username = "User": username = user.getNickName()}
    // Initialize state for posts and isUpdated
    const [posts, setPosts] = useState(PostList);
    const [isUpdated, setIsUpdated] = useState(false);
    // Function to add a new post
    const addPost = (postContent, image) => {
        // create a new post object
        const newPost = {
            id: posts.length,
            username: username,
            timestamp: "Just now",
            content: postContent,
            likes: 0,
            comments: [],
            image: image,
            profile: profile
        };
        // Add the new post to the list of posts
        setPosts([...posts, newPost]);
    };

    return (
        //deviide the feed into 3 columns
        <div className='Feed'>
            <NavigationBar />
            <div className="row">
                {/* Add the left menu to the left column */}
                <div className="col-2">
                    <LeftMenu />
                </div>
                {/* Add the post box and posts to the middle column */}
                <div className="col-8 d-flex flex-column justify-content-start align-items-center">
                    <PostBox addPost={addPost} />
                    <Posts posts={posts} />
                </div>
                {/* Add the friend list to the right column */}
                <div className="col-2">
                    <FriendList />
                </div>
            </div>
        </div>
    );
};

export default Feed;