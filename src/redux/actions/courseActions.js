import * as types from '../actionTypes';
import * as courseApi from '../../api/courseApi';

export function createCourse(course) {
  return {
    type: types.CREATE_COURSE,
    course
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