import React from 'react';
import PropTypes from 'prop-types';
import { createContext } from 'react-broadcast';

const {
  Provider: GoogleApiProvider,
  Consumer: GoogleApiConsumer
} = createContext(null);
GoogleApiProvider.displayName = 'GoogleApiProvider';
GoogleApiConsumer.displayName = 'GoogleApiConsumer';

class GoogleApi extends React.Component {
  static propTypes = {
    clientId: PropTypes.string.isRequired,
    apiKey: PropTypes.string.isRequired,
    discoveryDocs: PropTypes.arrayOf(PropTypes.string).isRequired,
    scopes: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  authorize = () => {
    if (this.auth) {
      this.auth.signIn();
    }
  };

  signout = () => {
    if (this.auth) {
      this.auth.signOut();
    }
  };

  state = {
    signedIn: false,
    client: null,
    loading: true,
    error: null,
    authorize: this.authorize,
    signout: this.signout
  };

  componentDidMount() {
    this.setupApi();
  }

  async setupApi() {
    try {
      if (typeof window.gapi === 'undefined') {
        await loadScript('https://apis.google.com/js/api.js');
      }
      if (!gapi.client) {
        await new Promise((resolve, reject) =>
          gapi.load('client:auth2', {
            callback: resolve,
            onerror: reject
          })
        );
      }
      await gapi.client.init({
        apiKey: this.props.apiKey,
        clientId: this.props.clientId,
        discoveryDocs: this.props.discoveryDocs,
        scope: this.props.scopes.join(',')
      });
      this.auth = gapi.auth2.getAuthInstance();
      this.setState({
        client: gapi.client,
        loading: false,
        signedIn: this.auth.isSignedIn.get()
      });
      // Listen for sign-in state changes.
      this.auth.isSignedIn.listen(signedIn => this.setState({ signedIn }));
    } catch (error) {
      this.setState({
        loading: false,
        error
      });
    }
  }

  render() {
    return (
      <GoogleApiProvider value={this.state}>
        {this.props.children(this.state)}
      </GoogleApiProvider>
    );
  }
}

export default GoogleApi;
export { GoogleApiConsumer };
