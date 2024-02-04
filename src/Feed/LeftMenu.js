// MakeLeftList.js
import React from 'react';
import members from './LeftListMembers'; // Update path if needed
import './MakeLeftList.css';

const MakeLeftList = () => {
    const showToast = (message) => {
        alert(message); // Using alert for simplicity, you can replace it with your preferred toast library
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
