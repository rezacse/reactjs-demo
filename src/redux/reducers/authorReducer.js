import * as types from '../actionTypes';
import initialState from './initialState';

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.GET_AUTHORS_SUCCESS:
      return action.authors;
    default:
      return state;
  }
}