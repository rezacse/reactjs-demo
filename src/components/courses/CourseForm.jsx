import React from 'react';
import PropTypes from 'prop-types';
import TextInput from '../common/TextInput';
import SelectInput from '../common/SelectInput';

const CourseForm = ({
  authors,
  course,
  onChange,
  onSave,
  saving = false,
  errors = {}
}) => {
  let authorOptions = authors.map(author => ({
    value: author.id,
    text: author.name
  }));

  return (
    <form onSubmit={onSave}>
      <h2>{course.id ? 'Edit' : 'Add'} Course</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        label="Title"
        name="title"
        value={course.title}
        onChange={onChange}
        error={errors.title}
      />
      <SelectInput
        label="Author"
        name="authorId"
        value={course.authorId || ''}
        onChange={onChange}
        error={errors.author}
        defaultOption="Select Author"
        options={authorOptions}
      />
      <TextInput
        label="Category"
        name="category"
        value={course.category}
        onChange={onChange}
        error={errors.category}
      />
      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving ? 'Saving...' : 'Save'}
      </button>
    </form>
  );
};

CourseForm.propTypes = {
  authors: PropTypes.array.isRequired,
  course: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
  saving: PropTypes.bool
};

export default CourseForm;
