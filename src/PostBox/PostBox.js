import React from 'react';
import { useRef } from 'react'; // Importing the useRef hook
import './PostBox.css'; // Importing the CSS file for styling
import User from '../signUp/user'; 
const PostBox = ({addPost}) => {
    const user = User.allUsers[0];
    let profile;
    {user == null ? profile = "": profile = user.getImage()}
    const input = useRef(null);

    const add = () => {
        addPost(input.current.value);
        input.current.value = "";
    }
    return (
        <div className="postBox">
            <div className="postBox_top">
                <img src = {profile} alt="profile" className="profilePic"/>
                <input type="text"  ref={input}  placeholder="What's on your mind?" className="postInput"/>
            </div>
            <div className="postBox_bottom">
                <button className="postButton" onClick={add}>Post</button>
                <button className="postButton">Tag Friends</button>
                <button className="postButton">Feeling/Activity</button>
            </div>
        </div>
    );
}

export default PostBox;
