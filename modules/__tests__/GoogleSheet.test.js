import React from 'react'
import { mount } from 'enzyme'

import Deferred from '@lourd/deferred'
import { GoogleSheetApi, GoogleSheet } from '../'
import { GSheetData } from '../GoogleSheet'

it("renders the underlying GSheetData component with the api from context and passes through props, freaking out if there isn't an api provided in context", () => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
  const fn = jest.fn(() => null)
  const props = {
    id: 'foo',
    range: 'things',
    foo: 'bar',
  }
  const result = mount(<GoogleSheet {...props}>{fn}</GoogleSheet>)
  expect(result).toMatchSnapshot('mounted component')
  expect(fn).toMatchSnapshot('child function calls')
  expect(console.error).toMatchSnapshot('logged errors')
  console.error.mockRestore()
})

describe('GSheetData component', () => {
  it('calls the api methods to load the data and renders the children function with the data loading state and a refetch function', async () => {
    const api = {
      client: {
        sheets: {
          spreadsheets: {
            values: {
              get: jest.fn(),
            },
          },
        },
      },
    }
    const deferred = new Deferred()
    api.client.sheets.spreadsheets.values.get.mockReturnValueOnce(
      deferred.promise,
    )
    const props = {
      id: 'foo',
      range: 'bar',
      api,
    }
    const children = jest.fn(() => null)
    const wrapper = mount(<GSheetData {...props}>{children}</GSheetData>)
    expect(wrapper.state()).toMatchSnapshot('loading state')
    expect(api.client.sheets.spreadsheets.values.get).toMatchSnapshot(
      'spreadsheet data loading method call',
    )
    const response = {
      result: {
        values: ['🤖', '👽', '💩'],
      },
    }
    deferred.resolve(response)
    // wait here for component updates to occur
    await deferred.promise
    expect(wrapper.state()).toMatchSnapshot('resolved state')
    expect(children).toMatchSnapshot('children function calls')
  })

  it('refetches if the id or range props changes', () => {
    const response = { result: { values: ['🤖', '👽', '💩'] } }
    const api = {
      client: {
        sheets: {
          spreadsheets: {
            values: { get: jest.fn(() => Promise.resolve(response)) },
          },
        },
      },
    }
    const props = { id: 'foo', range: 'bar', api }
    const wrapper = mount(<GSheetData {...props}>{() => null}</GSheetData>)
    wrapper.setProps({ id: 'different' })
    wrapper.setProps({ range: 'also different ' })
    expect(api.client.sheets.spreadsheets.values.get).toMatchSnapshot(
      'multiple data loading calls',
    )
  })

  it("doesn't update state if the id or range changed while the data was being fetched", async () => {
    const api = {
      client: {
        sheets: {
          spreadsheets: { values: { get: jest.fn() } },
        },
      },
    }
    const request1 = new Deferred()
    const request2 = new Deferred()
    api.client.sheets.spreadsheets.values.get
      .mockReturnValueOnce(request1.promise)
      .mockReturnValueOnce(request2.promise)
    const children = jest.fn(() => null)
    const response1 = { result: { values: ['🤖', '👽', '💩'] } }
    const response2 = { result: { values: ['💂', '👩‍🎤', '👢'] } }
    const props = { id: 'foo', range: 'bar', api }
    const wrapper = mount(<GSheetData {...props}>{children}</GSheetData>)
    wrapper.setProps({ id: 'different' })
    request1.resolve(response1)
    await request1.promise
    expect(wrapper.state()).toMatchSnapshot('final state')
  })

  it('sets the error in state if the data request has an error', async () => {
    const deferred = new Deferred()
    const api = {
      client: {
        sheets: {
          spreadsheets: { values: { get: jest.fn(() => deferred.promise) } },
        },
      },
    }
    const props = { id: 'foo', range: 'bar', api }
    const children = jest.fn(() => null)
    const wrapper = mount(<GSheetData {...props}>{children}</GSheetData>)
    const error = new Error('👻👹')
    const response = { result: { error } }
    deferred.reject(response)
    // have to wait on the promise here so rejecting it propagates through the react component update
    await expect(deferred.promise).rejects
    expect(wrapper.state()).toMatchSnapshot('resolved error state')
    expect(children).toMatchSnapshot('children function calls with error state')
  })
})
