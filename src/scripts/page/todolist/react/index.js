import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Link, IndexRoute, Redirect, HashRouter, BrowserRouter, Route } from 'react-router-dom';
import Page1 from './page1';
import Page2 from './page2';
import Page3 from './page3';

const Home = () => {
  return (
    <section>
      <h1>Home Page</h1>
      <Link to="/p1">goto page1</Link>
    </section>
  );
}

class App extends Component {
  render() {
    return (
      <BrowserRouter basename="/todolist/react">
        <div className="top">
          <Route path="/" component={Home} />
          <Route path="/p1" component={Page1} />
          <Route path="/p2" component={Page2}/>
          <Route path="/p3" component={Page3}/>
        </div>
      </BrowserRouter>
    );
  }
}

ReactDom.render(<App />, document.getElementById('container'));

