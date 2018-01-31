import React from 'react'
import PropTypes from 'prop-types'
import equalByKeys from '@lourd/equal-by-keys'
import { GoogleApiConsumer } from '@lourd/react-google-api'

class GSheetData extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    range: PropTypes.string.isRequired,
    api: PropTypes.object.isRequired,
  }

  state = {
    error: null,
    data: null,
    loading: false,
  }

  constructor(props) {
    super(props)
    this.fetch = this.fetch.bind(this)
  }

  componentDidMount() {
    this.fetch()
  }

  componentDidUpdate(prevProps) {
    if (!equalByKeys(this.props, prevProps, 'id', 'range')) {
      this.fetch()
    }
  }

  async fetch() {
    this.setState({ loading: true })
    try {
      const params = {
        spreadsheetId: this.props.id,
        range: this.props.range,
      }
      const response = await this.props.api.client.sheets.spreadsheets.values.get(
        params,
      )
      // Unable to cancel requests, so we wait until it's done and check it's still the desired one
      if (
        this.props.id === params.spreadsheetId &&
        this.props.range === params.range
      ) {
        this.setState({
          loading: false,
          error: null,
          data: response.result.values,
        })
      }
    } catch (response) {
      // If the api is still null, this will be a TypeError, not a response object
      const error = response.result ? response.result.error : response
      this.setState({ loading: false, error })
    }
  }

  render() {
    return this.props.children({
      error: this.state.error,
      data: this.state.data,
      loading: this.state.loading,
      refetch: this.fetch,
    })
  }
}

const GoogleSheet = props => (
  <GoogleApiConsumer>
    {api => <GSheetData api={api} {...props} />}
  </GoogleApiConsumer>
)

export default GoogleSheet
export { GSheetData }
