import React, { useState, useEffect } from 'react';
import './userProfile.css';
import { useParams, useLocation } from 'react-router-dom';
import Posts from '../post/posts';
import { useNavigate } from 'react-router-dom';

const UserProfile = ({ updatedFriendsList }) => {
    const [DBposts, setDBPosts] = useState([]);
    const [userData, setUserData] = useState({ profilePic: '', coverPic: '', nick: '' });
    const [isFriend, setIsFriend] = useState(false);
    const [checkCompleted, setCheckCompleted] = useState(false);
    const { userId } = useParams();
    const location = useLocation();
    const [isFromFriendRequest, setIsFromFriendRequest] = useState(false);
    const [isMyProfile, setIsMyProfile] = useState(false);
    const [friends, setFriends] = useState([{}]);
    const navigate = useNavigate();
    const [actionTriggered, setActionTriggered] = useState(false);
    useEffect(() => {
        const fromFriendRequest = location.state?.fromFriendRequest;
        setIsFromFriendRequest(!!fromFriendRequest);

        window.scrollTo(0, 0);
        const fetchPosts = async () => {
            setDBPosts([]);
            setIsFriend(false);
            setCheckCompleted(false);
            setIsMyProfile(false);
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
                if (response.status < 250) {
                    setIsFriend(true);
                }
                setDBPosts(postsJSON.posts);
                if (userId === localStorage.getItem('userID')) {
                    setIsMyProfile(true);
                }
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
    }, [location, userId,actionTriggered]);


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
    const acceptRequest = async () => {
        try {
            const id = localStorage.getItem('userID');
            const token = localStorage.getItem('userToken');
            if (!token || !id) {
                alert('You must be logged in to send friendship requests.');
                return;
            }
            const response = await fetch(`http://localhost:12345/api/users/${id}/friends/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setIsFriend(true);
            setActionTriggered(prevState => !prevState);
            updatedFriendsList();
            
        }

        catch (error) {
            console.error('Error:', error);
            alert('Failed to send friendship request.');
        }
    }
    const deleteFriend = async () => {
        try {
            const id = localStorage.getItem('userID');
            const token = localStorage.getItem('userToken');
            if (!token || !id) {
                alert('You must be logged in to send friendship requests.');
                return;
            }
            const response = await fetch(`http://localhost:12345/api/users/${id}/friends/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            setIsFriend(false);
            setActionTriggered(prevState => !prevState);
           updatedFriendsList();
        }

        catch (error) {
            console.error('Error:', error);
            alert('Failed to send friendship request.');
        }
    }

    const update = () => {
        navigate(`/signup`, { state: { fromProfile: true } });
    }
    const fetchFriends = async () => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                alert('You must be logged in to view friends.');
                return;
            }
            const response = await fetch(`http://localhost:12345/api/users/${userId}/friends`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setFriends(data.friends);
            updatedFriendsList();
        }
        catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

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
                
            </div>
            <div className='userPosts'>
                {/* Conditionally render the "Send request" button based on posts */}
                {!isFriend && checkCompleted && (
                    !isFromFriendRequest ? (
                        <div >
                            <button id="Follow-btn" className="btn btn-primary" onClick={SendFriendship} type="button">Send friendship</button>
                        </div>)
                        :
                        <div>
                            <a href="#" id="Follow-btn" class="btn btn-primary" onClick={acceptRequest}>Confirm request <span class="fa fa-check"></span></a>
                            <a href="#" id="Follow-btn" className="btn btn-danger" onClick={deleteFriend}>Delete request <span class="fa fa-close"></span></a>
                        </div>)}
                {isFriend && checkCompleted && !isMyProfile ?
                    <><>
                        <button id="Follow-btn" class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight"
                            aria-controls="offcanvasRight" onClick={fetchFriends}>User's friends</button>
                            <button id="Follow-btn" className="btn btn-danger" onClick={deleteFriend}>Delete friend</button>
                            </>
                            <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
                            <div class="offcanvas-header">
                                <h5 class="offcanvas-title" id="offcanvasRightLabel">User's friends list</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div class="offcanvas-body">
                                {friends.length > 0 ? (
                                    friends.map((friend, index) => (
                                        <div key={index} className="friend-item">
                                            <img src={friend.img} alt={friend.nick} className="friend-image" />
                                            <p className="friend-name">{friend.nick}</p>
                                        </div>
                                    ))) : (null)}
                            </div>
                        </div></> :
                    isMyProfile ?
                        <button id="Follow-btn" className="btn btn-primary" onClick={update}>Update user info</button> : null}
                {DBposts.length === 0 && checkCompleted ? null : <Posts posts={DBposts} />}
            </div>

        </div>
    );
};

export default UserProfile;