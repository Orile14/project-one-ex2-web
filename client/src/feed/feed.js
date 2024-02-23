import React, { useState } from 'react';
import './feed.css';
import NavigationBar from '../navigationBar/navigationBar';
import LeftMenu from '../leftMenu/leftMenu';
import Posts from '../post/posts';
import PostBox from '../postBox/postBox';
import FriendList from '../friendList/friendList';
import PostList from '../post/postsList';
import User from '../signUp/user';

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