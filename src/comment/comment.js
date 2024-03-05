import React, { useState, useRef } from 'react'
import CommentsCreate from './commentsCreate';
import './comment.css';

const Comment = ({ comments, postId }) => {

    // Initialize state variables
    const [isAdded, setIsAdded] = useState(false);
    const input = useRef(null);
    const modalId = `commentsModal-${postId}`;
    const [newComments, setNewComments] = useState(comments);

    const deleteComment = async (commentId) => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                alert('You must be logged in to delete comments.');
                return;
            }
            const response = await fetch(`http://localhost:12345/api/posts/comment/${postId}/${commentId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            console.log('Comment deleted successfully');
            // Refresh the comments list after deleting a comment
            // Assuming the backend returns the updated comments array after deletion
            const updatedComments = await response.json(); // Make sure the backend returns the updated list of comments
            setNewComments(updatedComments); // Update the local state to reflect the deletion
        } catch (error) {
            console.error('Failed to delete comment:', error);
            alert('Failed to delete comment.');
        }
    };
    // Function to add a comment
    const Add = () => {
        setIsAdded(true);
    }
    // Function to add a comment
    const AddComment = async () => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                alert('You must be logged in to add comments.');
                return;
            }
            const commentContent = input.current.value;
            const response = await fetch(`http://localhost:12345/api/posts/comment/${postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: commentContent })
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            const updatedComments = await response.json();
            console.log("updatedComments", updatedComments);
            setNewComments(updatedComments); // Update the state with the new data
            input.current.value = '';
            setIsAdded(false);


        } catch (error) {
            console.error('Failed to add comment:', error);
            alert('Failed to add comment.');
        }
    };

    const handleEditComment = async (id) => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                alert('You must be logged in to edit comments.');
                return false;
            }
            const responseAuth = await fetch(`http://localhost:12345/api/posts/comment/edit/${postId}/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });

            if (!responseAuth.ok) {
                // If the response is not OK, it means there's either an authorization error or another issue.
                console.error(`Error: ${responseAuth.statusText}`);
                alert('You are not authorized or there was an error.');
                return false;
            }

            const data = await responseAuth.json();
            return data;
        } catch (error) {
            console.error('Failed to check authorization:', error);
            return false;
        }
    };
    // Function to handle post save
    const handleSaveComment = async (id, newContent) => {
        try {
            const token = localStorage.getItem('userToken');
            // Check if both content and image are empty
            if (!token) {
                alert('You must be logged in to edit comments.');
                return false;
            }
            const response = await fetch(`http://localhost:12345/api/posts/comment/edit/${postId}/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ content: newContent }),

            });
            // Check if the request was successful
            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
        }
        catch (error) {
            console.error('Failed to edit post:', error);
        }
    };
    const handleLikeComment = async (id) => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) {
                alert('You must be logged in to like comments.');
                return;
            }
            const response = await fetch(`http://localhost:12345/api/posts/comment/like/${postId}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }
            const data = await response.json();
            console.log('data:', data);
        } catch (error) {
            console.error('Failed to like comment:', error);
            alert('Failed to like comment.');
        }
    }
    const formatDate = (isoDateString) => {
        const date = new Date(isoDateString);
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
        const year = date.getFullYear();
        return `${hours}:${minutes} ${day}/${month}/${year}`;
    };
    return (
        <div>
            <button className="commentButton" id="commentbutton" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
                <i className="bi bi-chat"></i>
                &nbsp; Comments: {newComments.length}
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
                                    username={comment.nickname}
                                    profile = {comment.profilePic}
                                    content={comment.content}
                                    timestamp={formatDate(comment.date)}
                                    deleteComment={deleteComment}
                                    handleEditComment={handleEditComment}
                                    handleSaveComment={handleSaveComment}
                                    handleLikeComment={handleLikeComment}
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
