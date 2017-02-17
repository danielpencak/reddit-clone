import React, {Component} from 'react';

class PostForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
      author: '',
      image_url: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    if(event.target.name){
      this.setState({
        [event.target.name]: event.target.value
      })
    }
  }

  componentWillReceiveProps({ image_url, title, author, body, postFunction }) {
    this.setState({
      image_url,
      title,
      author,
      body
    })
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <form className="form" onSubmit={(event) =>{
              event.preventDefault();
              this.props.postFunction({ image_url: this.state.image_url, body: this.state.body, author: this.state.author, title: this.state.title })}}>
            <div>
              <label>Title</label>
              <input type="text" id="title" className="form-control" name="title" placeholder="Title" onChange={this.handleChange} value={this.state.title} />
            </div>
            <div>
              <label>Body</label>
              <textarea name="body" id="body" className="form-control" placeholder="Body" onChange={this.handleChange} value={this.state.body}></textarea>
            </div>
            <div>
              <label>Author</label>
              <input type="text" id="author" name="author" className="form-control" onChange={this.handleChange} placeholder="Author" value={this.state.author ? this.state.author : ''} />
            </div>
            <div>
              <label>Image URL</label>
              <input id="image-url" name="image_url" onChange={this.handleChange} className="form-control" placeholder="Image URL" value={this.state.image_url} />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                { this.props.buttonText }
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default PostForm;
