import React from 'react';
import PropTypes from 'prop-types';
import Head from 'react-helmet';
import GoogleApi from './GoogleApi';
import DynamicSpreadsheet from './DynamicSpreadsheet';
import ApiForm from './ApiForm';

const SheetsDemo = props => (
  <GoogleApi
    clientId={props.clientId}
    apiKey={props.apiKey}
    scopes={['https://www.googleapis.com/auth/spreadsheets.readonly']}
    discoveryDocs={['https://sheets.googleapis.com/$discovery/rest?version=v4']}
  >
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
  </GoogleApi>
);

SheetsDemo.propTypes = {
  clientId: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired
};

class App extends React.Component {
  state = {
    apiKey: '',
    clientId: ''
  };

  handleSubmit = state => this.setState(state);

  reset = () => this.setState({ apiKey: '', clientId: '' });

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
    );
  }
}

export default App;
