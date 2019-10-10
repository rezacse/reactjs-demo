import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../redux/actions/courseActions';
import CourseList from './CourseList';
import * as authorActions from '../../redux/actions/authorActions';

class CoursesPage extends React.Component {
  componentDidMount() {
    const { actions, authors, courses } = this.props;

    if (courses.length === 0) {
      actions.getAuthors().catch(error => {
        alert('Loading authors failed' + error);
      });
    }

    if (authors.length === 0) {
      actions.getCourses().catch(error => {
        alert('Loading courses failed' + error);
      });
    }
  }

  render() {
    return (
      <>
        <h2> Courses </h2>
        <CourseList courses={this.props.courses} />
      </>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(a => a.id === course.authorId).name
            };
          }),
    authors: state.authors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCourses: bindActionCreators(courseActions.getCourses, dispatch),
      getAuthors: bindActionCreators(authorActions.getAuthors, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
