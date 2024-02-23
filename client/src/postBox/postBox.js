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
    const handleAddPost = async () => {
        try {
            // Check if both content and image are empty
            if (!postContent.trim() && !image) {
                alert('Please add at least some content or an image.');
                return;
            }
    
            const readFileAsBase64 = (file) => {
                return new Promise((resolve, reject) => {
                  const reader = new FileReader();
                  reader.onload = () => resolve(reader.result);
                  reader.onerror = reject;
                  reader.readAsDataURL(file);
                });
              };
            
              let base64Image = "";
              if (document.getElementById('imageInput').files[0]) {
                base64Image = await readFileAsBase64(document.getElementById('imageInput').files[0]);
              } else {
                alert("Please select an image.");
                return;
              }
    
            const postData = {
                content: postContent,
                image: base64Image, // Use the base64 representation of the image
                ownerID: 'userID', // Set the ownerID to the user's ID
                date: new Date().toISOString(),
                comments: [],
                likes: [],
              };
            
            const response = await fetch('http://localhost:12345/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            }); 
            console.log('response:', response);
    
            if (response.ok) {
                throw new Error('Failed to add post');
            }
    
            const data = await response.json();
    
            // Assuming addPost function updates the UI with the new post
            addPost(data);
    
            // Reset state
            setPostContent("");
            setImage(null);
        } catch (error) {
            console.error('Error adding post:', error);
            alert('Failed to add post.');
        }
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