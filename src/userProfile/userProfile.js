import React, { useState, useEffect } from 'react';
import './userProfile.css';
import { useParams } from 'react-router-dom';
import Posts from '../post/posts';


const UserProfile = () => {
    const [checkCompleted, setCheckCompleted] = useState(false);
    const { userId } = useParams();
    const [DBposts, setDBPosts] = useState([]);
    const [userData, setUserData] = useState({ profilePic: '', coverPic: '', nick: '' });
    const [isFriend, setIsFriend] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchPosts = async () => {
            try {
                const token = localStorage.getItem('userToken');
                if (!token) {
                    alert('You must be logged in to view this.');
                    return;
                }
                const response = await fetch(`http://localhost:12345/api/users/${userId}/posts`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const postsJSON = await response.json();
                console.log(postsJSON)

                if (response.status < 250) {
                    setIsFriend(true);
                }
                setDBPosts(postsJSON.posts);

            } catch (error) {
                console.error('There has been a problem with your fetch operation:', error);
            }
            setCheckCompleted(true);
        };
        fetchPosts();

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


    const SendFriendship = async () => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                alert('You must be logged in to send friendship requests.');
                return;
            }
            const response = await fetch(`http://localhost:12345/api/users/${userId}/friends`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            alert('Friendship request sent');
        }
        catch (error) {
            console.error('Error:', error);
            alert('Failed to send friendship request.');
        }
    }



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
            <div className="user-name">
                <div className="user-nickname">{userData.nick}</div>
                {/* Conditionally render the "Send request" button based on posts */}
                {!isFriend && checkCompleted && (
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button id="Follow-btn" className="btn btn-primary" onClick={SendFriendship} type="button">Send request</button>
                    </div>
                )}
            </div>

            <div className='userPosts'>
                <Posts posts={DBposts} />
            </div>
        </div>
    );
};

export default UserProfile;