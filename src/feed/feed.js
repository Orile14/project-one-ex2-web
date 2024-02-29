import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './feed.css';
import NavigationBar from '../navigationBar/navigationBar';
import LeftMenu from '../leftMenu/leftMenu';
import Posts from '../post/posts';
import PostBox from '../postBox/postBox';
import FriendList from '../friendList/friendList';
import UserProfile from '../userProfile/userProfile';

// This function creates the feed
const Feed = () => {

    // Inside your Feed component
    const { userId } = useParams();
    const [DBposts, setDBPosts] = useState([]);
    const [refreshFeed, setRefreshFeed] = useState(false);

    const triggerFeedRefresh = () => {
        setRefreshFeed(prev => !prev);
    };

    useEffect(() => {
        if (!userId) {
            const fetchPosts = async () => {
                try {
                    const token = localStorage.getItem('userToken');
                    if (!token) {
                        alert('You must be logged in to view posts.');
                        return;
                    }
                    const response = await fetch('http://localhost:12345/api/posts/', {
                        method: 'GET',
                        headers: { // This is where headers should be defined
                            'Authorization': `Bearer ${token}`
                        }
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
        }
    }, [refreshFeed, userId]);
    

    return (
        //deviide the feed into 3 columns
        <div className='Feed'>
            <NavigationBar currentPage={userId ? 'profile' : 'feed'} />
            <div className="row">
                {/* Add the left menu to the left column */}
                <div className="col-2">
                    <LeftMenu />
                </div>
                {/* Add the post box and posts to the middle column */}
                <div className="col-8 d-flex flex-column justify-content-start align-items-center">
                    {userId ? <UserProfile nick={userId} /> :
                        <>
                            <PostBox onRefreshFeed={triggerFeedRefresh} />
                            <Posts posts={DBposts} />
                        </>}
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