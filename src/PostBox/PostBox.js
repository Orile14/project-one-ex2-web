import React from 'react';
import { useState } from 'react'; // Importing the useRef hook
import './PostBox.css'; // Importing the CSS file for styling
import User from '../signUp/user';
const PostBox = ({ addPost }) => {

    const user = User.allUsers[0];
    const [postContent, setPostContent] = useState(""); // State to store post content
    const [image, setImage] = useState(null); // State to store selected image

    const handleInputChange = (event) => {
        setPostContent(event.target.value); // Update post content state
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleAddPost = () => {
        // Check if both content and image are empty
        if (!postContent.trim() && !image) {
            alert('Please add at least some content or an image.');
            return;
        }
        addPost(postContent, image);
        setPostContent("");
        setImage(null);
    };
    return (
        <div className="postBox">
            <div className="postBox_top">
                <img src={user ? user.getImage() : ""} alt="profile" className="profilePic" />
                <input type="text" value={postContent} onChange={handleInputChange} placeholder="What's on your mind?" className="postInput" />
            </div>
            <div className="postBox_buttons">
                <button className="postButton" onClick={handleAddPost}>Post</button>
                <label className="postButton">
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                    Add Image
                </label>
                <button className="postButton">Feeling/Activity</button>
            </div>
            {image && <img src={image} alt="selected" className="selectedImage" />} {/* Display selected image */}
        </div>
    );
}

export default PostBox;