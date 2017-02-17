import React, { Component } from 'react';
import Header from '../Header/Header';
import PostList from '../PostList/PostList';
import PostEdit from '../PostEdit/PostEdit';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

const NotFound = () => <div>Not found</div>

const Parent = (props) =>
  <div>
    {/* <Link to="/childOne">child One</Link>
    <Link to="/parent/childTwo">child Two</Link>
    <Link to="/parent/childThree">child Three</Link>
    {props.children} */}
    <Header />
    <div>
      {props.children}
    </div>
  </div>

// const ChildOne = () => <div>Child one</div>
// const ChildTwo = () => <div>Child two</div>
// const ChildThree = () => <div>Child three</div>

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/' component={Parent}>
          <IndexRoute component={PostList}/>
          {/* <Route path='/posts' component={PostList} /> */}
          <Route path='/api/posts/:id/edit' component={PostEdit} />
          {/* <Route path='childthree' component={ChildThree} /> */}
        </Route>
        {/* <Route path='/sum/:first/:second' component={showId} /> */}
        {/* <Route path='/query' component={showQuery} /> */}
        <Route path='*' component={NotFound} />
      </Router>
    );
  }
}

export default App;
