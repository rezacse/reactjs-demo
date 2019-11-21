import API from '../utils/axiosSetup';

import { handleResponse, handleError } from './apiUtils';

export function getAuthors() {
  return API.get('authors')
    .then(handleResponse)
    .catch(handleError);
}
