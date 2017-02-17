import React, {Component} from 'react';

class CommentList extends Component {
  // console.log('--', toggleComments);
  constructor(props) {
    super(props);

    this.state = {
      comment: ''
    }

    this.handleCommentInput = this.handleCommentInput.bind(this);
  }

  handleCommentInput(event) {
    console.log(this.state.comment);
    this.setState({ comment: event.target.value})
  }

  render() {
    console.log(this.props.comments, this.props.id, this.state.comment);
    return (
      <div className="row">
        <div className="col-md-offset-1">
          <br />
          { this.props.toggleComments
            ?
            <div>
              {
                this.props.comments.map(comment => {
                  return <p key={comment.id}>
                    { comment.content }
                  </p>
                })
              }
              <form className="form-inline" onSubmit={(event) => {
                event.preventDefault();
                this.props.addComment(this.state.comment, this.props.id)}}>
                <div className="form-group">
                  <input className="form-control" type="text" name="comments" onChange={this.handleCommentInput} />
                </div>
                <div className="form-group">
                  <input type="submit" className="btn btn-primary" />
                </div>
              </form>
            </div>
            : null
          }
        </div>
      </div>
    );
  }
}

export default CommentList;
