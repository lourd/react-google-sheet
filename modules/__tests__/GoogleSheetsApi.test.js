import React from 'react'
import { mount } from 'enzyme'

import GoogleSheetsApi from '../GoogleSheetsApi'

it('renders the GoogleApi with the sheets discovery doc provided and a default scope and passes all props through', () => {
  const result = mount(
    <GoogleSheetsApi clientId="foo" apiKey="bar" cool="🤠">
      {null}
    </GoogleSheetsApi>,
  )
  expect(result).toMatchSnapshot('default case')
})

it('accepts an array of scopes', () => {
  const result = mount(
    <GoogleSheetsApi clientId="foo" apiKey="bar" scopes={['baz', 'yup']}>
      {null}
    </GoogleSheetsApi>,
  )
  expect(result).toMatchSnapshot('custom scopes')
})
