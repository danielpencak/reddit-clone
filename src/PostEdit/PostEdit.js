import React, {Component} from 'react';
import PostForm from '../PostForm/PostForm';
import axios from 'axios';
import {browserHistory} from 'react-router';

class PostEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {}
    }

    this.updatePost = this.updatePost.bind(this);
  }

  componentDidMount() {
    axios.get('/api/posts/' + this.props.params.id)
      .then(({ data }) => {
        this.setState({
          post: data
        })
      })
  }

  updatePost(post) {
    axios.patch('/api/posts/' + this.props.params.id, post)
      .then(() =>
        browserHistory.push('/')
      )
  }

  // console.log('id', props.params.id);
  render() {
    return (
      <PostForm buttonText="Update Post" body={this.state.post.body} author={this.state.post.author} title={this.state.post.title} image_url={this.state.post.image_url} postFunction={this.updatePost} />
    );
  }
}

export default PostEdit;
