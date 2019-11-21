import axios from 'axios';

import * as types from '../actionTypes';
import * as authorApi from '../../api/authorApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export function getAuthorsSuccess(authors) {
  return {
    type: types.GET_AUTHORS_SUCCESS,
    authors
  };
}

export function getAuthors() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(getAuthorsSuccess(authors));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
