import * as types from '../actionTypes';
import * as courseApi from '../../api/courseApi';

export function createCourseSuccess(course) {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course
  };
}

export function updateCourseSuccess(course) {
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    course
  };
}

export function saveCourse(course) {
  return function (dispatch, getState) {
    return courseApi.saveCourse(course)
      .then(savedCourse => {
        course.id ?
          dispatch(updateCourseSuccess(savedCourse)) :
          dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        throw error;
      });
  };
}

export function getCoursesSuccess(courses) {
  return {
    type: types.GET_COURSES_SUCCESS,
    courses
  };
}

export function getCourses() {
  return function (dispatch) {
    return courseApi.getCourses()
      .then(courses => {
        dispatch(getCoursesSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}