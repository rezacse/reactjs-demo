import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CourseForm from './CourseForm';
import { getCourses, saveCourse } from '../../redux/actions/courseActions';
import { getAuthors } from '../../redux/actions/authorActions';
import newCourse from '../../../tools/mockData';
import { toast } from 'react-toastify';

export function ManageCoursePage({
  courses,
  authors,
  getAuthors,
  getCourses,
  saveCourse,
  history,
  ...props
}) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length === 0) {
      getCourses().catch(error => {
        alert('Loading courses failed' + error);
      });
    } else {
      setCourse({ ...props.course });
    }

    if (authors.length === 0) {
      getAuthors().catch(error => {
        alert('Loading authors failed' + error);
      });
    }
  }, [props.course]);

  const handleOnChange = event => {
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === 'authorId' ? parseInt(value, 10) : value
    }));
  };

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = 'Title is required.';
    if (!authorId) errors.author = 'Author is required';
    if (!category) errors.category = 'Category is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const handleSave = event => {
    event.preventDefault();
    if (!formIsValid()) return;

    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success('Course Saved');
        history.push('/courses');
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  };

  return (
    <CourseForm
      course={course}
      authors={authors}
      onSave={handleSave}
      onChange={handleOnChange}
      saving={saving}
      errors={errors}
    />
  );
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  getCourses: PropTypes.func.isRequired,
  getAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;

  return {
    course,
    courses: state.courses,
    authors: state.authors
  };
}
const mapDispatchToProps = {
  getCourses,
  getAuthors,
  saveCourse
};

export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
