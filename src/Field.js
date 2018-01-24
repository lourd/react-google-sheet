import React from 'react';
import PropTypes from 'prop-types';

class Field extends React.Component {
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
          <input
            id={this.props.name}
            value={this.props.value}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default Field;
