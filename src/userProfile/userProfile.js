import React, { useState, useEffect } from 'react';
import './userProfile.css';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState({ profilePic: '', coverPic: '', nick: '' });

    useEffect(() => {
        window.scrollTo(0, 0);

        const getUserInfo = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (!token) {
                    alert('You must be logged in to view this.');
                    return;
                }
                const response = await fetch(`http://localhost:12345/api/users/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }                
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                setUserData({
                    profilePic: data.img, 
                    coverPic: data.coverImg,
                    nick: data.nick 
                });
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to load user info.');
            }
        };

        getUserInfo();
    }, [userId]);

    return (
        <div className="profile">
            <div
                className="cover-photo"
                style={{ backgroundImage: `url(${userData.coverPic})` }} 
            ></div>
            <div
                className="profile-photo"
                style={{ backgroundImage: `url(${userData.profilePic})` }} 
            ></div>
            <div className="user-nickname">
                {userData.nick} 
            </div>
        </div>
    );
};

export default UserProfile;
