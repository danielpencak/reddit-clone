import React from 'react';
import TimeAgo from 'timeago-react';
import './Post.css';
import Comments from '../Comments/Comments';
import CommentList from '../CommentList/CommentList';
import {Link} from 'react-router';

function Post({ title, author, created_at, vote_count, body, id, image_url, comments, addVotes, removeVotes, toggleComments, handleToggleComments, addComment }){
  // console.log('??', toggleComments);
    return (
      <div>
        {
          <div className="well">
            <div className="media-left">
              <img className="media-object" src={image_url} role="presentation" />
              <p className="text-center">
                <Link to={`/api/posts/${id}/edit`}>edit</Link>
              </p>
            </div>
            <div className="media-body">
              <h4 className="media-heading">
                { title }
                |
                <a onClick={() => {
                  addVotes({ title, author, vote_count, body, image_url }, id)
                }}><i className="glyphicon glyphicon-arrow-up"></i></a>
                <a onClick={() => {
                  removeVotes({ title, author, vote_count, body, image_url }, id)
                }}><i className="glyphicon glyphicon-arrow-down"></i></a>
                <div> { vote_count } </div>
              </h4>
              <div className="text-right">
                { author }
              </div>
              <p>
                { body }
              </p>
              <div>
                <TimeAgo datetime={created_at} />
                |
                <Comments comments={comments} handleToggleComments={handleToggleComments} id={id}/>
              </div>
              <CommentList comments={comments} addComment={addComment} toggleComments={toggleComments} id={id} />
            </div>
          </div>
        }
      </div>
    );
}

export default Post;
