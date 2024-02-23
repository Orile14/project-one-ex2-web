import React from 'react';
import { useState } from 'react';
import './postBox.css';
import User from '../signUp/user';
const PostBox = ({ addPost }) => {
    // Get the first user from the list of all users
    const user = User.allUsers[0];
    // Initialize state for post content and image
    const [postContent, setPostContent] = useState(""); 
    const [image, setImage] = useState(null);

    // Function to handle input change
    const handleInputChange = (event) => {
        setPostContent(event.target.value);
    };

    // Function to handle image selection
    const handleImageChange = (event) => {
    // Check if the file is an image
    // Update state with the selected image
        const file = event.target.files[0];
        if (file) {
            // Only proceed if a file is selected
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            // Optionally, handle the case where no file is selected
            setImage(null);
        }
    };
    // Function to handle adding a new post
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
            {/* Display user profile picture and input field */}
            <div className="postBox_top">
                {/** Display user profile picture */}
                <img src={user ? user.getImage() : ""} alt="profile" className="profilePic" />
                {/** Display input field */}
                <input type="text" value={postContent} onChange={handleInputChange}
                 placeholder="What's on your mind?" className="postInput" />
            </div>
            {/** Display buttons */}
            <div className="postBox_buttons">
                <button className="postButton" onClick={handleAddPost}>Post</button>
                <label className="postButton">
                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                    Add Image
                </label>
                <button className="postButton">Feeling/Activity</button>
            </div>
            {/** Display selected image */}
            {image && <img src={image} alt="selected" className="selectedImage" />} 
        </div>
    );
}

export default PostBox;