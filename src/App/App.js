import React, { Component } from 'react';
import Header from '../Header/Header';
import PostList from '../PostList/PostList';
import PostEdit from '../PostEdit/PostEdit';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const NotFound = () => <div>Not found</div>

const Parent = (props) =>
  <div>
    <Header />
    <div>
      {props.children}
    </div>
  </div>

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Parent}>
          <IndexRoute component={PostList}/>
          <Route path='/api/posts/:id/edit' component={PostEdit} />
        </Route>
        <Route path='*' component={NotFound} />
      </Router>
    );
  }
}

export default App;
