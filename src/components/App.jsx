import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import Header from './common/Header';
import PageNotFound from './common/NotFoundPage';
import CoursesPage from './courses/CoursesPage';
import ManageCourse from './courses/ManageCoursePage';
import Auth from '../auth/Auth';

class App extends Component {
  constructor(props) {
    super(props);
    this.auth = new Auth(this.props.history);
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid mt-4">
          <Switch>
            <Route
              path="/"
              render={props => <HomePage auth={this.auth} {...props} />}
              exact
            />
            <Route path="/courses" component={CoursesPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/course/:slug" component={ManageCourse} />
            <Route path="/course" component={ManageCourse} />
            <Route component={PageNotFound} />

            {/* <Route
              path="/courses"
              component={CoursesPage}
              render={props => <CoursesPage auth={this.auth} {...props} />}
            />
            <Route
              path="/about"
              render={props => <AboutPage auth={this.auth} {...props} />}
            />
            <Route
              path="/course/:slug"
              render={props => <ManageCourse auth={this.auth} {...props} />}
            />
            <Route
              path="/course"
              render={props => <ManageCourse auth={this.auth} {...props} />}
            />
            <Route
              render={props => <PageNotFound auth={this.auth} {...props} />}
            /> */}
          </Switch>
          <ToastContainer autoClose={3000} hideProgressBar />
        </div>
      </div>
    );
  }
}

export default App;
