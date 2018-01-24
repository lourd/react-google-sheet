# Google Sheets + React [![npm package badge][npm-badge]][npm]

[npm-badge]: https://img.shields.io/npm/v/@lourd/react-google-sheet.svg?style=flat-square
[npm]: https://www.npmjs.com/package/@lourd/react-google-sheet
[site]: https://lourd.github.io/react-google-sheet

This is an small experiment in exploring how to easily pull data from Google Sheets using React components. It consists of a couple JavaScript [modules](./modules) [available on npm][npm] and a [small toy app][site] for [demonstrating its usage](./example). to componentize the [Google Sheets browser API](https://developers.google.com/sheets/api/quickstart/js).

## Module installation

```sh
yarn install @lourd/react-google-sheet
```

## Component APIs

Each component symbol is available from the module's main export

```js
import {
  GoogleSheet,
  GoogleSheetsApi,
  GoogleApi,
  GoogleApiConsumer,
} from '@lourd/react-google-sheet'
```

### [`<GoogleSheetsApi/>`](./modules/GoogleApi.js)

This component handles downloading and instantiating the Google sheets browser API, and passing it into context for other components to use. See an example of this component used in [App.js](./example/App.js#L9-L32)

### [`<GoogleSheet/>`](./modules/GoogleSheet.js/)

Ths component handles getting the Google client from context and using to to request the data from the Sheets API. See an example of this component used in [DynamicSpreadsheet.js](./example/DynamicSpreadsheet.js#L21-L33)

---

> _These components are not necessary for fetching data from the Google Sheets API, but can be used to compose components that interact with the other Google APIs._

### [`<GoogleApiConsumer/>`](./modules/GoogleApi.js)

This component gives access to the Google API state passed down by a [`GoogleApi`](#google-api) component. It uses its children prop as a function to pass the arguments along. It's used by [`GoogleSheet`](#google-sheet) under the hood.

### [`<GoogleApi/>`](./modules/GoogleApi.js)

This component is slightly lower level than [`GoogleSheetsApi`](#googlesheetsapi), needing `discoveryDocs` and `scopes` passed as a prop.

## Background

The main goal behind this project is to simplify using data from Google Sheets. This approach takes a client-centric approach, using React to componentize the [Google Sheets browser API](https://developers.google.com/sheets/api/quickstart/js).

This project utilizes the [render prop React pattern](https://reactjs.org/docs/render-props.html) and context. It uses the [new proposed context API](https://github.com/acdlite/rfcs/blob/new-version-of-context/text/0000-new-version-of-context.md) through the implementation in the [`react-broadcast` beta](https://github.com/ReactTraining/react-broadcast/pull/47). See its usage in `GoogleApi` and `GoogleSheet`, described below.

## Example

There are just a couple steps to using the [example app][site]

* Click the `Authorize` button and allow the site to have access to your Google Sheets data
* Get the ID of a spreadsheet that you have permission to view. In the URL of a sheet it's in between `/d/` and `/edit`, i.e. for `/spreadsheets/d/foofoo/edit` it's **foofoo**.
* Choose a range of the spreadsheet, e.g. `Tab 1!2:12`

You can also use your own API key and application ID that you made on the [Google APIs console](https://console.developers.google.com/apis/credentials).
