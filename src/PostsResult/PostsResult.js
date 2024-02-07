import React from 'react';
import CreatePost from '../Post/CreatePost';


function PostsResult({ posts }) {
    const renderedPosts = posts.map((post) => (
        <CreatePost key={post.id} {...post} />
    ));
    

    {console.log("asdasdasdasdasdasd", posts)}
    
    return (
        
        <div>
            {renderedPosts}
        </div>
    );
}


export default PostsResult;
