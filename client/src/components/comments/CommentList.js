import React from 'react';

const CommentList = ({ comments }) => {
    const renderedComments = Object.values(comments).map(comment => {
        let content;
        if (comment.status === 'approved')
            content = comment.content;
        if (comment.status === 'rejected') 
            content = 'This comment is rejected';
        if (comment.status === 'pending')
            content = 'This comment is awaiting moderation';
        return <li key={comment.id}>
                {content}
            </li>
    });

    return (
        <div>
            {Object.keys(comments).length} comments
            <ul>
                { renderedComments }
            </ul>
        </div>
    )
};

export default CommentList;