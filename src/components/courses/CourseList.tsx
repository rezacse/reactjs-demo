import * as React from 'react';
import { Link } from 'react-router-dom';

const CourseList: React.SFC<ICoursesProps> = props => {
  let { courses, onDeleteClick } = props;
  return (
    <table className="table">
      <thead>
        <tr>
          <th />
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {courses.map(course => (
          <tr key={course.id}>
            <td>
              <a
                className="btn btn-light"
                href={'http://pluralsight.com/courses' + course.slug}
              >
                Watch
              </a>
            </td>
            <td>
              <Link to={'/course/' + course.slug}>{course.title}</Link>
            </td>
            <td>{course.authorName}</td>
            <td>{course.category}</td>
            <td>
              <button
                className="btn btn-outline-danger"
                onClick={() => onDeleteClick(course)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// CourseList.prototypes = {
//   courses: PropTypes.array.isRequired,
//   onDeleteClick: PropTypes.func.isRequired
// };

export interface ICoursesProps {
  courses: any[];
  onDeleteClick: (course: any) => {};
}

export default CourseList;
