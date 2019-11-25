import * as React from 'react';

const TextInput: React.SFC<ITextProps> = props => {
  let { label, name, value, placeholder, error, onChange } = props;
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += ' has-error';
  }

  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <input
          type="text"
          className="form-control"
          name={name}
          value={value || ''}
          placeholder={placeholder}
          onChange={onChange}
        />
        {error && <div className="py-1 text-danger">{error}</div>}
      </div>
    </div>
  );
};

// TextInput.propTypes = {
//   label: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   onChange: PropTypes.func.isRequired,
//   value: PropTypes.string,
//   placeholder: PropTypes.string,
//   error: PropTypes.string
// };

export interface ITextProps {
  label: string;
  name: string;
  value?: string | number;
  error?: string;
  onChange: (event: any) => void;
  placeholder?: string;
}

export default TextInput;
