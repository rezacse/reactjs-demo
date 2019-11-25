import * as React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import * as courseActions from '../../redux/actions/courseActions';
import * as authorActions from '../../redux/actions/authorActions';
import CourseList from './CourseList';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

class CoursesPage extends React.Component {
  state = {
    redirectToAddCoursePage: false
  };

  componentDidMount() {
    const { actions, authors, courses } = this.props;

    if (authors.length === 0) {
      actions.getAuthors().catch(error => {
        alert('Loading authors failed' + error);
      });
    }

    if (courses.length === 0) {
      actions.getCourses().catch(error => {
        alert('Loading courses failed' + error);
      });
    }
  }

  handleDeleteCourse = async course => {
    toast.success('Course deleted');
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error('Delete failed. ' + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2> Courses </h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              {/* className={classes.iconHover} */}
              <Icon color="error" style={{ fontSize: 30 }}>
                add_circle
              </Icon>
              Add Course
            </Button>
            <CourseList
              courses={this.props.courses}
              onDeleteClick={this.handleDeleteCourse}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
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
    authors: state.authors,
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getCourses: bindActionCreators(courseActions.getCourses, dispatch),
      getAuthors: bindActionCreators(authorActions.getAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
