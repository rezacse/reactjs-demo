import * as types from '../actionTypes';
import * as authorApi from '../../api/authorApi';


export function getAuthorsSuccess(authors) {
    return {
        type: types.GET_AUTHORS_SUCCESS,
        authors
    };
}


export function getAuthors() {
    return function (dispatch) {
        return authorApi.getAuthors()
            .then(authors => {
                dispatch(getAuthorsSuccess(authors));
            })
            .catch(error => {
                throw error;
            });
    };
}