import React, { useState } from 'react';
import './Comment.css';

const CommentsCreate = ({ id, username, timestamp, content }) => {
    const [isRemoved, setIsRemoved] = useState(false);
    const Remove = () => {
        setIsRemoved(true);
    };

    return (
        isRemoved ? null :
        <div className='container'>
            <div className="post-header">
                <div className="post-header-info">
                    <p className="username">{username}</p>
                    <p className="timestamp">{timestamp}</p>
                </div>
                <i className="bi bi-pencil-square Edit"></i>
                <button className="x-button" onClick={Remove}>
                    <i className="bi bi-x-lg"></i>
                </button>
            </div>
            <div className="modal-body">
                <p>{content}</p>
            </div>
        </div>
    );
};

export default CommentsCreate;
