import React, { useState } from 'react';
import './Feed.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import  NavigationBar  from '../NavigationBar/NavigationBar';
import LeftMenu from '../LeftMenu/LeftMenu';
import Posts from '../Post/Posts';
import PostBox from '../Post/PostBox';

const Feed = () => {
    return (
        <div>
            
            <NavigationBar />
            
            <div className="row">
                <div className="col-2">
                    <LeftMenu />
                </div>
                <div className="col-8">
                    <PostBox />
                    <Posts />
                </div>
                <div className="col-2">
                    FriendsList
                </div>
            </div>
        </div>
    );
};

export default Feed;
