import React from 'react'
import PropTypes from 'prop-types'
import Field from './Field'

class ApiForm extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  state = {
    apiKey: this.props.init.apiKey,
    clientId: this.props.init.clientId,
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.onSubmit(this.state)
  }

  handleChange = (key, value) => this.setState({ [key]: value })

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Field
          name="apiKey"
          label="Google Developer API Key"
          value={this.state.apiKey}
          onChange={this.handleChange}
        />
        <Field
          name="clientId"
          label="Application Client ID"
          value={this.state.clientId}
          onChange={this.handleChange}
        />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default ApiForm
