import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import HomePage from './home/HomePage';
import AboutPage from './about/AboutPage';
import Header from './common/Header';
import PageNotFound from './common/NotFoundPage';
import CoursesPage from './courses/CoursesPage';
import ManageCourse from './courses/ManageCoursePage';

function App() {
  return (
    <div>
      <Header />
      <div className="container-fluid mt-4">
        <Switch>
          <Route path="/" component={HomePage} exact />
          <Route path="/courses" component={CoursesPage} />
          <Route path="/about" component={AboutPage} />
          <Route path="/course/:slug" component={ManageCourse} />
          <Route path="/course" component={ManageCourse} />
          <Route component={PageNotFound} />
        </Switch>
        <ToastContainer autoClose={3000} hideProgressBar />
      </div>
    </div>
  );
}

export default App;
