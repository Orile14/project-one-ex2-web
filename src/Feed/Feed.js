import React, { useState } from 'react';
import './Feed.css';
import NavigationBar from '../NavigationBar/NavigationBar';
import LeftMenu from '../LeftMenu/LeftMenu';
import Posts from '../Post/Posts';
import PostBox from '../PostBox/PostBox';
import FriendList from '../FriendList/FriendList'; 
import PostsList from '../Post/PostsList.json';
import PostsResult from '../PostsResult/PostsResult';

const Feed = () => {
    const [filteredPosts, setFilteredPosts] = useState(PostsList);
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);

    const doSearch = function(q) {
        setFilteredPosts(PostsList.filter((post) => post.content.includes(q)));
        setIsSearchPerformed(true);
    }

    return (
        <div>
            <NavigationBar doSearch={doSearch} />
        
            <div className="row">
                <div className="col-2">
                    <LeftMenu />
                </div>
                <div className="col-8 d-flex flex-column justify-content-start align-items-center">
                    <PostBox />
                    {isSearchPerformed ? <PostsResult posts={filteredPosts} /> : <Posts posts={PostsList}/>}
                </div>
                <div className="col-2">
                    <FriendList />
                </div>
            </div>
        </div>
    );
};

export default Feed;
