import React from 'react'
import { GoogleApi } from '@lourd/react-google-api'

const GoogleSheetsApi = ({
  scopes = ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  ...props
}) => (
  <GoogleApi
    scopes={scopes}
    discoveryDocs={['https://sheets.googleapis.com/$discovery/rest?version=v4']}
    {...props}
  />
)

export default GoogleSheetsApi
