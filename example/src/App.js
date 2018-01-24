import React from 'react'
import PropTypes from 'prop-types'
import Head from 'react-helmet'
import { GoogleSheetsApi } from '../../modules'
import DynamicSpreadsheet from './DynamicSpreadsheet'
import ApiForm from './ApiForm'
import Blob from './Blob'

const SheetsDemo = props => (
  <GoogleSheetsApi clientId={props.clientId} apiKey={props.apiKey}>
    {({ authorize, loading: apiLoading, signout, signedIn, error }) => (
      <div>
        {(apiLoading || error) && (
          <button onClick={props.reset}>Reset developer credentials</button>
        )}
        {apiLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <Blob data={error} />
        ) : signedIn ? (
          <button onClick={signout}>Sign Out</button>
        ) : (
          <button onClick={authorize}>Authorize</button>
        )}
        {signedIn && <DynamicSpreadsheet />}
      </div>
    )}
  </GoogleSheetsApi>
)

SheetsDemo.propTypes = {
  clientId: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
}

class App extends React.Component {
  state = {
    apiKey: '',
    clientId: '',
  }

  handleSubmit = state => this.setState(state)

  reset = () => this.setState({ apiKey: '', clientId: '' })

  render() {
    return (
      <div>
        <Head>
          <title>Google Sheets React Component Demo</title>
        </Head>
        <h1>Google Sheets API React Component</h1>
        {this.state.apiKey ? (
          <SheetsDemo
            apiKey={this.state.apiKey}
            clientId={this.state.clientId}
            reset={this.reset}
          />
        ) : (
          <ApiForm onSubmit={this.handleSubmit} />
        )}
      </div>
    )
  }
}

export default App
