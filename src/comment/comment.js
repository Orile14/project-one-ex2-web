import React, { useState, useRef } from 'react'
import CommentsCreate from './commentsCreate';
import './comment.css';

const Comment = ({ comments, postId }) => {

    
    // Initialize state variables
    const [isAdded, setIsAdded] = useState(false);
    const input = useRef(null);
    const modalId = `commentsModal-${postId}`;
    const [newComments, setNewComments] = useState(comments);

    // Function to handle the like button
    const toggleLike = (commentId) => {
        // setNewComments(newComments.map(comment => {
        //     // If the comment id matches the id of the comment being liked, update the likes
        //     if (comment.id === id) {
        //         const currentLikes = comment.likes || { count: 0, likedByUser: false };
        //         return {
        //             ...comment,
        //             likes: {
        //                 count: currentLikes.likedByUser ? currentLikes.count - 1 : currentLikes.count + 1,
        //                 likedByUser: !currentLikes.likedByUser
        //             }
        //         };
        //     }
        //     return comment;
        // }));
    };
    // Function to delete a comment
    const deleteComment = (commentId) => {
        // const updatedComments = newComments.filter((comment) => comment.id !== id);
        // setNewComments(updatedComments);
    }
    // Function to add a comment
    const Add = () => {
        // setIsAdded(true);
    }
    // Function to add a comment
    const AddComment = () => {
        // // Create a new comment object
        // const comment = {
        //     id: newComments.length + 1,
        //     username: username,
        //     timestamp: "Just now",
        //     content: input.current.value,
        //     likes: { count: 0, likedByUser: false }
        // };
        // // Add the new comment to the comments list
        // setNewComments([...newComments, comment]);
        // input.current.value = "";
        // setIsAdded(false);
    }

    const length = () => {
        
    }

    return (
        <div>
            <button className="commentButton" id = "commentbutton"  data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
                <i className="bi bi-chat"></i>
                &nbsp; Comments: {length()}
            </button>
            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}Label`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`${modalId}Label`}>Comments List</h1>
                            <button type="button" className="btn-close CloseEditMode" data-bs-dismiss="modal" 
                            aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {newComments.map((comment) => (
                                //map through the comments and create a new CommentsCreate component for each comment
                                <CommentsCreate
                                    key={comment._id}
                                    id={comment._id}
                                    username={comment.commentOwnerID}
                                    content={comment.content}
                                    timestamp={comment.date}
                                    deleteComment={deleteComment}
                                    likes={comment.likesID}
                                    toggleLike={toggleLike}
                                />
                            ))}
                            <div className="modal-footer">
                                {isAdded ? (
                                    //if the user is adding a comment, show the input and send button
                                    <>
                                        <input ref={input} className="input" placeholder="add a comment..." />
                                        <button type="button" className="btn btn-primary" onClick={AddComment} >Send</button>
                                    </>
                                ) : (
                                    //if the user is not adding a comment, show the close and add comment button
                                    <>
                                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                        <button type="button" className="addComment btn btn-primary" onClick={Add}>Add comment</button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;