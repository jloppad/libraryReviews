import React from "react";
import Pagination from "./pagination";

const Comments = ({
    comments,
    userId,
    isAdmin,
    handleDeleteComment,
    newComment,
    setNewComment,
    handleAddComment,
    page,
    totalBooks,
    limit,
    handlePageChange,
}) => {
    return (
        <div className="comments-section">
            <h3>Comments</h3>
            {comments.length > 0 ? (
                <ul className="comments-list">
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            <strong>{comment.username}:</strong> {comment.comment} <br />
                            <span className="date">{new Date(comment.createdAt).toLocaleString()}</span>
                            {(userId === comment.userId || isAdmin) && (
                                <button onClick={() => handleDeleteComment(comment.id)} className="delete-comment-btn">
                                    Delete Comment
                                </button>
                            )}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No comments yet.</p>
            )}

            <Pagination 
                page={page} 
                totalBooks={totalBooks} 
                limit={limit} 
                handlePageChange={handlePageChange}
            />

            {userId && (
                <div className="comment-form">
                    <div className="input-container">
                        <label className="input-title">Add a comment</label>
                        <textarea
                            className="input-field"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your comment..."
                        ></textarea>
                    </div>
                    <button className="submit-button" onClick={handleAddComment}>Add Comment</button>
                </div>
            )}
        </div>
    );
};

export default Comments;
