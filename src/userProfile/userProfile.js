// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';

// const UserProfile = ({ token }) => {
//     const { id } = useParams(); // Get the user ID from the URL
//     const [userInfo, setUserInfo] = useState({ img: '', coverImg: '', nick: '' });
//     const [userPosts, setUserPosts] = useState([]);
//     const [isFriend, setIsFriend] = useState(false);

//     // Fetch user info
//     useEffect(() => {
//         const fetchUserInfo = async () => {
//             try {
//                 const response = await fetch(`http://localhost:12345/api/users/${id}`);
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch user info');
//                 }
//                 const data = await response.json();
//                 setUserInfo({ img: data.img, imgCover: data.imgCover, nick: data.nick });
//             } catch (error) {
//                 console.error('Error fetching user info:', error);
//             }
//         };

//         fetchUserInfo();
//     }, [id]);

//     // Fetch user posts or check friendship status
//     useEffect(() => {
//         const fetchUserPosts = async () => {
//             try {
//                 const response = await fetch(`http://localhost:12345/api/users/posts/${id}`, {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`
//                     }
//                 });
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch posts');
//                 }
//                 const data = await response.json();
//                 if (data.areFriends) {
//                     setUserPosts(data.posts);
//                     setIsFriend(true);
//                 } else {
//                     setIsFriend(false);
//                 }
//             } catch (error) {
//                 console.error('Error fetching posts:', error);
//             }
//         };

//         fetchUserPosts();
//     }, [id, token]);

//     // Handle sending a friend request
//     const handleSendFriendRequest = async () => {
//         // Implement the logic for sending a friend request
//     };

//     return (
//         <div>
//             {/* User info */}
//             <img src={userInfo.img} alt="User" />
//             <img src={userInfo.imgCover} alt="Background" />
//             <h3>{userInfo.nick}</h3>

//             {/* Posts or friend request button */}
//             {isFriend ? (
//                 <div>
//                     {userPosts.map(post => (
//                         // Render each post
//                     ))}
//                 </div>
//             ) : (
//                 <button onClick={handleSendFriendRequest} style={{ backgroundColor: isFriend ? 'white' : 'blue' }}>
//                     Send Friend Request
//                 </button>
//             )}
//         </div>
//     );
// };

// export default UserProfile;
