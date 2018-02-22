'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));
var equalByKeys = _interopDefault(require('@lourd/equal-by-keys'));
var reactGoogleApi = require('@lourd/react-google-api');

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};













var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

class GSheetData extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: null,
      data: null,
      loading: false
    };
    this.fetch = this.fetch.bind(this);
  }

  componentDidMount() {
    this.fetch();
  }

  componentDidUpdate(prevProps) {
    if (!equalByKeys(this.props, prevProps, 'id', 'range')) {
      this.fetch();
    }
  }

  async fetch() {
    this.setState({ loading: true });
    try {
      const params = {
        spreadsheetId: this.props.id,
        range: this.props.range
      };
      const response = await this.props.api.client.sheets.spreadsheets.values.get(params);
      // Unable to cancel requests, so we wait until it's done and check it's still the desired one
      if (this.props.id === params.spreadsheetId && this.props.range === params.range) {
        this.setState({
          loading: false,
          error: null,
          data: response.result.values
        });
      }
    } catch (response) {
      // If the api is still null, this will be a TypeError, not a response object
      const error = response.result ? response.result.error : response;
      this.setState({ loading: false, error });
    }
  }

  render() {
    return this.props.children({
      error: this.state.error,
      data: this.state.data,
      loading: this.state.loading,
      refetch: this.fetch
    });
  }
}

GSheetData.propTypes = {
  id: PropTypes.string.isRequired,
  range: PropTypes.string.isRequired,
  api: PropTypes.object.isRequired
};
const GoogleSheet = props => React.createElement(
  reactGoogleApi.GoogleApiConsumer,
  null,
  api => React.createElement(GSheetData, _extends({ api: api }, props))
);

const GoogleSheetsApi = (_ref) => {
  var _ref$scopes = _ref.scopes;
  let scopes = _ref$scopes === undefined ? ['https://www.googleapis.com/auth/spreadsheets.readonly'] : _ref$scopes,
      props = objectWithoutProperties(_ref, ['scopes']);
  return React.createElement(reactGoogleApi.GoogleApi, _extends({
    scopes: scopes,
    discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4']
  }, props));
};

exports.GoogleSheet = GoogleSheet;
exports.GoogleSheetsApi = GoogleSheetsApi;
