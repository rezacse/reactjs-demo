import {
  handleResponse,
  handleError
} from "./apiUtils";
const baseCourseUrl = process.env.API_URL + "/courses/";

export function getCourses() {
  return fetch(baseCourseUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveCourse(course) {
  return fetch(baseCourseUrl + (course.id || ""), {
      method: course.id ? "PUT" : "POST", // POST for create, PUT to update when id already exists.
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(course)
    })
    .then(handleResponse)
    .catch(handleError);
}

export function deleteCourse(courseId) {
  return fetch(baseCourseUrl + courseId, {
      method: "DELETE"
    })
    .then(handleResponse)
    .catch(handleError);
}