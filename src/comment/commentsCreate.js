import React, { useState,useRef } from 'react';
import './commentCreate.css';

const CommentsCreate = ({ id, username, timestamp, content, deleteComment, handleEditComment,
    handleLikeComment,handleSaveComment }) => {
    // Initialize state variables
    const [isEditing, setIsEditing] = useState(false);
    const [editableContent, setEditableContent] = useState(content);
    const [likeActive, setLikeActive] = useState(false);
    const textareaRef = useRef(null);

    // Function to handle the like button
    const handleLike = async() => {
        await handleLikeComment(id);
        setLikeActive(!likeActive);
    };
    // Function to handle the edit button
    const handleEdit = async () => {
        const canEdit = await handleEditComment(username);
        if (canEdit) {
            console.log('Editing comment===================');
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
                    <p className="username">{username}</p>
                    <p className="timestamp">{timestamp}</p>
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
                <button onClick={handleLike} className={`comments-like ${likeActive ? 'active' : ''}`}>
                    <i className="bi bi-hand-thumbs-up"></i>
                </button>
            </div>
        </div>
    );
};
export default CommentsCreate;
