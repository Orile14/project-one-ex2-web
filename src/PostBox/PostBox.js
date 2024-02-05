import React from 'react';
import './PostBox.css'; // Importing the CSS file for styling
import IMG from './IMG_8579.jpg'; // Importing the image file

const PostBox = () => {
    return (
        <div className="postBox">
            <div className="postBox_top">
                <img src = {IMG} alt="profile" className="profilePic"/>
                <input type="text"  placeholder="What's on your mind?" className="postInput"/>
            </div>
            <div className="postBox_bottom">
                <button className="postButton">Photo/Video</button>
                <button className="postButton">Tag Friends</button>
                <button className="postButton">Feeling/Activity</button>
            </div>
        </div>
    );
}

export default PostBox;
