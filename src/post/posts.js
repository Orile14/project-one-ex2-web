import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import CreatePost from './createPost';

const Posts = ({ posts }) => {
    const [postsWithProfile, setPostsWithProfile] = useState([]);

    useEffect(() => {
        const fetchProfilesAndNicknames = async () => {
            const postsWithExtraData = await Promise.all(posts.map(async (post) => {
                try {
                    // Fetch profile image
                    const profileResponse = await fetch(`http://localhost:12345/api/posts/profile/${post.postOwnerID}`);
                    if (!profileResponse.ok) {
                        throw new Error('Profile fetch failed');
                    }
                    const profileData = await profileResponse.json();
                    
    
                    // Fetch nickname
                    const nicknameResponse = await fetch(`http://localhost:12345/api/posts/nickname/${post.postOwnerID}`);
                    if (!nicknameResponse.ok) {
                        throw new Error('Nickname fetch failed');
                    }
                    const nicknameData = await nicknameResponse.json();
            
                    // Combine post data with fetched profile image and nickname
                    return { ...post, profile: profileData.imgUrl, nickname: nicknameData.nickname };
                } catch (error) {
                    console.error('Fetch profile or nickname error:', error);
                    return { ...post, profile: null, nickname: null }; // Handle error by setting profile and nickname to null
                }
            }));
            setPostsWithProfile(postsWithExtraData);
        };
        fetchProfilesAndNicknames();
    }, [posts]); // Run effect when 'posts' prop changes
    
  
    

    // Use 'postsWithProfile' for sorted and mapped posts to include fetched profiles
    const sortedPosts = postsWithProfile.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is 0-indexed
        const year = date.getFullYear();
        return `${hours}:${minutes} ${day}/${month}/${year}`;
    };
    return (
        <div className="posts">
            {sortedPosts.map((post) => (
                <CreatePost
                    key={post._id}
                    id={post._id}
                    postOwnerID={post.postOwnerID}
                    username={post.nickname}
                    timestamp={formatDate(post.date)}
                    originalContent={post.content}
                    likes={post.likesID}
                    comments={post.comments}
                    image={post.img}
                    profile={post.profile} // Profile image from fetched data
                />
            ))}
        </div>
    );
};

export default Posts;
