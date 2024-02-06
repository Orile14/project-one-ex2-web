import React from 'react';
import CreatePost from '../Post/CreatePost';


function PostsResult({ posts }) {
    const renderedPosts = posts.map((post, index) => (
        <CreatePost key={index} {...post} />
    ));
    

    {console.log("asdasdasdasdasdasd", posts)}
    
    return (
        
        <div>
            {renderedPosts}
        </div>
    );
}


export default PostsResult;
