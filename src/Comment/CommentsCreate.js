import React, { useState } from 'react';
import './CommentCreate.css';

const CommentsCreate = ({ id, username, timestamp, content, deleteComment, likes, toggleLike }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editableContent, setEditableContent] = useState(content);
    const [likeActive, setLikeActive] = useState(false);

    const handleLike = () => {
        toggleLike(id);
        setLikeActive(!likeActive); // Toggle likeActive state
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        setIsEditing(false);

    };

    const handleChange = (event) => {
        setEditableContent(event.target.value);
    };

    const Remove = () => {
        deleteComment(id);
    };

    return (
        <div className='container'>
            <div className="post-header">
                <div className="post-header-info">
                    <p className="username">{username}</p>
                    <p className="timestamp">{timestamp}</p>
                </div>
                <div className="post-header-actions">
                    {isEditing ? (
                        <button onClick={handleSave}>Save</button>
                    ) : (
                        <i className="bi bi-pencil-square Edit" onClick={handleEdit}></i>
                    )}
                    <button className="x-button" onClick={Remove}><i className="bi bi-x-lg"></i></button>
                </div>
            </div>
            <div className="modal-body">
                <div className="post-content">
                    {isEditing ? (
                        <textarea value={editableContent} onChange={handleChange} className="edit-textarea" />
                    ) : (
                        <p>{editableContent}</p>
                    )}
                </div>
            </div>
            <div className="comment-footer">
                <button onClick={handleLike} className={`comments-like ${likeActive ? 'active' : ''}`}>
                    <i className="bi bi-hand-thumbs-up"></i>
                    <span>{likes.count}</span>
                </button>
            </div>
        </div>
    );
};
export default CommentsCreate;
