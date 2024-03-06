import React, { useState, useRef, useEffect } from 'react';
import './commentCreate.css';

const CommentsCreate = ({ postId, id, username, profile, likes, timestamp, content, deleteComment, handleEditComment,
    handleSaveComment }) => {
    // Initialize state variables
    const [isEditing, setIsEditing] = useState(false);
    const [editableContent, setEditableContent] = useState(content);
    const [likeActive, setLikeActive] = useState(false);
    const textareaRef = useRef(null);
    const amount = likes ? likes.length : 0;
    const [LikeCount, setLikeCount] = useState(amount);
    useEffect(() => {
        if (likes) {
            const user = localStorage.getItem('userID');
            const userLike = likes.find((like) => like == user);
            if (userLike) {
                setLikeActive(true);
            } else {
                setLikeActive(false);
            }
        }
    }, [likes]);
    // Function to handle the like button

    const handleLikeComment = async () => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                alert('You must be logged in to like comments.');
                return;
            }
            const response = await fetch(`http://localhost:12345/api/posts/comment/like/${postId}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            const user = localStorage.getItem('userID');
            const userLike = data.find((like) => like == user);
            if (userLike) {
                setLikeActive(true);
            } else {
                setLikeActive(false);
            }

            setLikeCount(data.length);
        } catch (error) {
            console.error('Failed to like comment:', error);
            alert('Failed to like comment.');
        }
    }

    // Function to handle the edit button
    const handleEdit = async () => {
        const canEdit = await handleEditComment(id);
        if (canEdit) {
            setIsEditing(true);
        }
    };
    // Function to handle the save button
    const handleSave = () => {
        if (textareaRef.current) {
            handleSaveComment(id, textareaRef.current.value);
            setIsEditing(false);
        }
    };
    // Function to handle the change event
    const handleChange = (event) => {
        setEditableContent(event.target.value);
    };
    // Function to remove a comment
    const Remove = () => {
        deleteComment(id);
    };

    return (
        // Add the comment to the container
        <div className='container'>
            <div className="post-header">
                {/** Add the user's profile picture and the time stamp to the post header */}
                <div className="post-header-info">
                    <img src={profile} alt="PostIm" className="profilePic" />
                    <div className="user-info">
                        <p className="username">{username}</p>
                        <p className="timestamp">{timestamp}</p>
                    </div>
                </div>
                {/** Add the post header actions */}
                <div className="post-header-actions">
                    {isEditing ? (
                        //if the user is editing the comment, show the save button
                        <button onClick={handleSave}>Save</button>
                    ) : (
                        //if the user is not editing the comment, show the edit button
                        <i className="bi bi-pencil-square Edit" onClick={handleEdit}></i>
                    )}
                    <button className="x-button" onClick={Remove}><i className="bi bi-x-lg"></i></button>
                </div>
            </div>
            {/** Add the post content */}
            <div className="modal-body">
                <div className="post-content">
                    {isEditing ? (
                        //if the user is editing the comment, show the textarea
                        <textarea ref={textareaRef} value={editableContent} onChange={handleChange} className="edit-textarea" />
                    ) : (
                        //if the user is not editing the comment, show the content
                        <p>{editableContent}</p>
                    )}
                </div>
            </div>
            <div className="comment-footer">
                {/** Add the like button */}
                <button onClick={handleLikeComment} className={`comments-like ${likeActive ? 'active' : ''}`}>
                    <i className="bi bi-hand-thumbs-up"> </i>
                    <label>{LikeCount}</label>
                </button>
            </div>
        </div>
    );
};
export default CommentsCreate;
