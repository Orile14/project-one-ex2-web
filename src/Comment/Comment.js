import React from 'react';
import CommentsCreate from './CommentsCreate';


const Comment = ({ comments }) => {

    return (
        <div>
            <button className="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                <i className="bi bi-chat"></i>
                &nbsp; Comments: {comments.length}
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Comments List</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">

                            {comments.map((comment) => (

                                <CommentsCreate
                                    id={comment.id}
                                    username={comment.username}
                                    timestamp={comment.timestamp}
                                    content={comment.content}
                                />

                            ))}
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary">Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;
