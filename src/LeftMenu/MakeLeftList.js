// MakeLeftList.js
import React from 'react';
import members from './LeftListMembers';
import './MakeLeftList.css';

const MakeLeftList = () => {
    const showToast = (message) => {
        alert(message);
    };

    return (
        <ul className="list-group">
            {members.map((member, index) => (
                <li key={index} className="list-group-item d-flex justify-content-between align-items-center" onClick={() => showToast(member.message)}>
                    {member.id}
                    <div dangerouslySetInnerHTML={{ __html: member.icon }} />
                </li>
            ))}
        </ul>
    );
};

export default MakeLeftList;
