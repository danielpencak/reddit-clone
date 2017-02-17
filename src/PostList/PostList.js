import React, {Component} from 'react';
import {DropdownButton, MenuItem} from 'react-bootstrap';
import Post from '../Post/Post';
import PostForm from '../PostForm/PostForm';
import axios from 'axios';
import './PostList.css'

class PostList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      addPostFormVisible: false,
      searchTerm: ''
    }

    this.addVotes = this.addVotes.bind(this);
    this.removeVotes = this.removeVotes.bind(this);
    this.handleNewPostClick = this.handleNewPostClick.bind(this);
    this.handleToggleComments = this.handleToggleComments.bind(this);
    this.onSearchTermChange = this.onSearchTermChange.bind(this);
    this.isSearched = this.isSearched.bind(this);
    this.addPost = this.addPost.bind(this);
    this.addComment = this.addComment.bind(this);
  }

  handleToggleComments(id) {
    const newStateofPosts = this.state.posts.map(post => {
      if (post.id === id) {
        post.toggleComments = !post.toggleComments;
      }
      return post
    })
    this.setState(({ posts: newStateofPosts }));
  }

  getPosts() {
    axios.get('/api/posts/')
      .then(({ data }) => {
        for (const post of data) {
          post.toggleComments = false;
        }
        this.setState({
          posts: data
        })
      })
  }

  addPost(post) {
    axios.post(`/api/posts/`, post)
      .then(({ data }) => {
        const newStateAddPostFormVisible = false;
        this.setState({ addPostFormVisible: newStateAddPostFormVisible })
        this.getPosts()
      })
  }

  addVotes(post, id) {
    axios.post(`/api/posts/${id}/votes`, post)
    .then(({ data }) => {
      this.getPosts()
    })
  }

  removeVotes(post, id) {
    axios.delete(`/api/posts/${id}/votes`, post)
    .then(({ data }) => {
      this.getPosts()
    })
  }

  addComment(comment, id) {
    axios.post(`/api/posts/${id}/comments`, {content: comment, post_id: id})
      .then(({ data }) => {
        this.getPosts()
      })
  }

  onSearchTermChange(event) {
    this.setState({ searchTerm: event.target.value})
  }

  isSearched(post) {
    const newSearchTerm = this.state.searchTerm.toLowerCase();
    return post.title.toLowerCase().includes(newSearchTerm);
  }

  handleNewPostClick() {
   const newStateAddPostFormVisible = !this.state.addPostFormVisible;
   this.setState({
     addPostFormVisible: newStateAddPostFormVisible
   })
  }

  sortByVotes(vote_count) {
    const updatedList = this.state.posts.sort((a,b) => b.vote_count - a.vote_count);
    this.setState({posts: updatedList});
  }

  sortByDate(created_at) {
     const updatedList = this.state.posts.sort(function(a,b){
      const c = new Date(a.created_at);
      const d = new Date(b.created_at);
       return d - c;
     });
     this.setState({posts: updatedList});
  }

  sortByTitle(title) {
    const updatedList = this.state.posts.sort((a,b) => {
      const nameA = a[title].toUpperCase(); // ignore upper and lowercase
      const nameB = b[title].toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }

      // names must be equal
      return 0;
    });

    this.setState({posts: updatedList});
  }

  render() {
    return (
      <div>
        <main className="container">
          <div className="pull-right">
            <p><a className="btn btn-info" onClick={() => this.handleNewPostClick()}>New Post</a></p>
          </div>
          <ul className="nav nav-pills">
            <li role="presentation" className="active">
              <input type="search" className="form-control input-sm search-form" placeholder="Filter" onChange={this.onSearchTermChange} />
            </li>
            <DropdownButton title="Sort By" bsStyle={"link".toLowerCase()} key={1} id={`dropdown-basic-1`}>
              <MenuItem eventKey="1" onClick={() => {this.sortByVotes('vote_count')}}>Votes</MenuItem>
              <MenuItem eventKey="2" onClick={() => {this.sortByDate('created_at')}}>Date</MenuItem>
              <MenuItem eventKey="3" onClick={() => {this.sortByTitle('title')}}>Title</MenuItem>
            </DropdownButton>
          </ul>
          { this.state.addPostFormVisible
            ? <PostForm buttonText="Add Post" postFunction={this.addPost} />
            : null
          }
          <div className="row">
            <div className="col-md-12">
              {this.state.posts.filter(this.isSearched).map(post => {
                return <Post title={post.title} vote_count={post.vote_count} body={post.body} author={post.author} created_at={post.created_at} key={post.id} image_url={post.image_url} comments={post.comments} id={post.id} addVotes={this.addVotes} removeVotes={this.removeVotes} handleToggleComments={this.handleToggleComments} toggleComments={post.toggleComments} addComment={this.addComment} />
              })}
            </div>
          </div>
        </main>
      </div>
    );
  }

  componentDidMount() {
    this.getPosts();
  }
}

export default PostList;
