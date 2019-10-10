import {
  handleResponse,
  handleError
} from "./apiUtils";
const baseAuthorUrl = process.env.API_URL + "/authors/";

export function getAuthors() {
  return fetch(baseAuthorUrl)
    .then(handleResponse)
    .catch(handleError);
}