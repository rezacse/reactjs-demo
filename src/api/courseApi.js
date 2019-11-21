import { handleResponse, handleError } from './apiUtils';
import API from '../utils/axiosSetup';

export function getCourses() {
  return API.get('courses')
    .then(handleResponse)
    .catch(handleError);
}

export function saveCourse(course) {
  if (course.id) {
    return API.put(`courses/${course.id}`, course)
      .then(handleResponse)
      .catch(handleError);
  } else {
    return API.post('courses', course)
      .then(handleResponse)
      .catch(handleError);
  }
}

// export function saveCourse(course) {
//   return axios
//     .post(baseCourseUrl + (course.id || ''), {
//       method: course.id ? 'PUT' : 'POST', // POST for create, PUT to update when id already exists.
//       headers: {
//         'content-type': 'application/json'
//       },
//       body: JSON.stringify(course)
//     })
//     .then(handleResponse)
//     .catch(handleError);
// }

export function deleteCourse(courseId) {
  return API.delete(`courses/${courseId}`)
    .then(handleResponse)
    .catch(handleError);
}
