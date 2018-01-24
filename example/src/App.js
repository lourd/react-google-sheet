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
    apiKey: 'AIzaSyDS0rsId2YdsGWAgU4xiLm8zS8gf4k9d2Y',
    clientId:
      '377437361891-v0ib2hve7mupdcpsibtuqr35o2h61op9.apps.googleusercontent.com',
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
        {this.state.apiKey && (
          <button onClick={this.reset}>Change developer credentials</button>
        )}
        {this.state.apiKey ? (
          <SheetsDemo
            apiKey={this.state.apiKey}
            clientId={this.state.clientId}
            reset={this.reset}
          />
        ) : (
          <ApiForm onSubmit={this.handleSubmit} init={this.state} />
        )}
      </div>
    )
  }
}

export default App
