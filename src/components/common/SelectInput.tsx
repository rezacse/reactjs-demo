import * as React from 'react';

export interface ISelectProps {
  label: string;
  name: string;
  value?: string | number;
  error?: string;
  onChange: (event: any) => void;
  defaultOption?: string;
  options: any[];
}

const SelectInput: React.SFC<ISelectProps> = props => {
  let { label, name, error, onChange, defaultOption, value, options } = props;
  let wrapperClass = 'form-group';
  if (error && error.length > 0) {
    wrapperClass += ' has-error';
  }
  return (
    <div className={wrapperClass}>
      <label htmlFor={name}>{label}</label>
      <div className="field">
        <select
          className="form-control"
          name={name}
          value={value}
          onChange={onChange}
        >
          <option value="">{defaultOption}</option>
          {options.map((option: any) => {
            return (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            );
          })}
        </select>
        {error && <div className="py-1 text-danger">{error}</div>}
      </div>
    </div>
  );
};

// SelectInput.propTypes = {
//   label: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
//   value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   error: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
//   defaultOption: PropTypes.string,
//   options: PropTypes.arrayOf(PropTypes.object)
// };

export default SelectInput;
