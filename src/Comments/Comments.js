import React from 'react';

function Comments({comments, handleToggleComments, id}) {
    return (
      <span>
        <i className="glyphicon glyphicon-comment"></i>
          {
              comments.length === 1 &&
              <a onClick={() => {handleToggleComments(id)}}>{comments.length} Comment</a>
          }

          {
              comments.length > 1 &&
              <a onClick={() => {handleToggleComments(id)}}>{comments.length} Comments</a>
          }

          {
              comments.length === 0 &&
              <a onClick={() => {handleToggleComments(id)}}>{comments.length} Comments</a>
          }
      </span>
    );
  }

export default Comments;
