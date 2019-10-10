import * as types from '../actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE:
      return [...state, {
        ...action.course
      }];
    case types.GET_COURSES_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}