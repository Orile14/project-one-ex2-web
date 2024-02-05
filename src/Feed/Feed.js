import React from 'react';
import './Feed.css';
import NavigationBar from '../NavigationBar/NavigationBar';
import LeftMenu from '../LeftMenu/LeftMenu';
import Posts from '../Post/Posts';
import PostBox from '../PostBox/PostBox';
import FriendList from '../FriendList/FriendList'; 

const Feed = () => {
    
    return (
        <div>
            
            <NavigationBar />
        
            <div className="row">
                <div className="col-2">
                    <LeftMenu />
                </div>
                <div className="col-8 d-flex flex-column justify-content-start align-items-center">
                    <PostBox />
                    <Posts />
                </div>
                <div className="col-2">
                    <FriendList />
                </div>
            </div>
        </div>
    );
};

export default Feed;
