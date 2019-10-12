import * as types from '../actionTypes';
import * as courseApi from '../../api/courseApi';
import {
  beginApiCall,
  apiCallError
} from './apiStatusActions';


export function getCoursesSuccess(courses) {
  return {
    type: types.GET_COURSES_SUCCESS,
    courses
  };
}

export function getCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi.getCourses()
      .then(courses => {
        dispatch(getCoursesSuccess(courses));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

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
    dispatch(beginApiCall());
    return courseApi.saveCourse(course)
      .then(savedCourse => {
        course.id ?
          dispatch(updateCourseSuccess(savedCourse)) :
          dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteCourseOptimistic(course) {
  return {
    type: types.DELETE_COURSE_OPTIMISTIC,
    course
  };
}

export function deleteCourse(course) {
  return function (dispatch) {
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id)
      .catch(error => {
        dispatch(apiCallError(error));
      });
  };
}