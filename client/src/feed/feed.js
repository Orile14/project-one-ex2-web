import React, { useState, useEffect } from 'react';
import './feed.css';
import NavigationBar from '../navigationBar/navigationBar';
import LeftMenu from '../leftMenu/leftMenu';
import Posts from '../post/posts';
import PostBox from '../postBox/postBox';
import FriendList from '../friendList/friendList';

// This function creates the feed
const Feed = () => {

    const [DBposts, setDBPosts] = useState([]);
    const [refreshFeed, setRefreshFeed] = useState(false);

    const triggerFeedRefresh = () => {
        setRefreshFeed(prev => !prev);
    };
    

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:12345/api/posts/get', {
                    method: 'GET'
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const postsJSON = await response.json();
                setDBPosts(postsJSON);
            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
        };
        
        fetchPosts();
    },[refreshFeed]); 
    
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
                <PostBox onRefreshFeed={triggerFeedRefresh} />
                <Posts posts={DBposts} />
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