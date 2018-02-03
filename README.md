# @lourd/react-google-sheet [![npm package badge][npm-badge]][npm] [![Build status][travis badge]][travis]

[npm-badge]: https://img.shields.io/npm/v/@lourd/react-google-sheet.svg?style=flat-square
[npm]: https://www.npmjs.com/package/@lourd/react-google-sheet
[travis badge]: https://travis-ci.org/lourd/react-google-sheet.svg
[travis]: https://travis-ci.org/lourd/react-google-sheet
[site]: https://lourd.github.io/react-google-sheet
[api component]: https://github.com/lourd/react-google-api

Easily use data from Google Sheets in your React application with the [`GoogleSheet`](#googlesheet) component.

## Background

The motivation for making this module was researching ways to easily use data from Google Sheets. This module is a client-centric approach, using React to make a declarative component API for the [Google Sheets browser API](https://developers.google.com/sheets/api/quickstart/js).

Under the hood this is using the generic [`@lourd/react-google-api`][api component] module for handling loading and initializing the Google API JavaScript client library.

## Example

There are just a couple steps to using the [example app][site]. The source is in the [`example` directory](./example).

1. Click the `Authorize` button and allow the site to have access to your Google Sheets data
2. Get the ID of a spreadsheet that you have permission to view. In the URL of a sheet it's in between `/d/` and `/edit`, i.e. for `/spreadsheets/d/foofoo/edit` it's **foofoo**.
3. Choose a range of the spreadsheet, e.g. `Tab 1!2:12`

You can also use your own API key and application ID that you made on the [Google APIs console](https://console.developers.google.com/apis/credentials).

## Installation

```sh
yarn add @lourd/react-google-sheet
# or
npm install --save @lourd/react-google-sheet
```

## Reference

```js
import { GoogleSheet, GoogleSheetsApi } from '@lourd/react-google-sheet'
```

### [`<GoogleSheetsApi/>`](./modules/GoogleSheetsApi.js)

This component handles downloading and instantiating the Google sheets browser API, and passing it into context for other components to use. See an example of this component used in [App.js](./example/src/App.js#L9-L32)

| Property | Type       | Required | Default                                                     | Description                                                  |
| :------- | :--------- | :------- | :---------------------------------------------------------- | :----------------------------------------------------------- |
| scopes   | `[string]` | no       | `['https://www.googleapis.com/auth/spreadsheets.readonly']` | The authorization scopes being requested for the API client. |

### [`<GoogleSheet/>`](./modules/GoogleSheet.js/)

| Property | Type     | Required | Description                           |
| :------- | :------- | :------- | :------------------------------------ |
| id       | `string` | yes      | The id of the spreadsheet             |
| range    | `string` | yes      | The range of cells in the spreadsheet |

Ths component handles getting the Google client from context and using it to request the data from the Sheets API. See an example of this component used in [DynamicSpreadsheet.js](./example/src/DynamicSpreadsheet.js#L21-L33)
