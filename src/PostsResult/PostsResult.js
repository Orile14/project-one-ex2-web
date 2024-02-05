import React from 'react';
import CreatePost from '../Post/CreatePost';

function PostsResult({ posts }) {
    const renderedPosts = posts.map((post) => (
        <CreatePost {...post} />
    ));

    return (
        <div>
            {renderedPosts}
        </div>
    );
}

export default PostsResult;
