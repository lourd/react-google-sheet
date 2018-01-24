import React from 'react';
import PropTypes from 'prop-types';

class Select extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.any,
    label: PropTypes.string
  };

  handleChange = event => {
    this.props.onChange(this.props.name, event.target.value);
  };

  render() {
    const label = this.props.label || this.props.name;
    return (
      <div>
        <label htmlFor={this.props.name}>{label}</label>
        <div>
          <select
            id={this.props.name}
            value={this.props.value}
            onChange={this.handleChange}
          >
            {this.props.options.map(str => (
              <option value={str} key={str}>
                {str}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default Select;
