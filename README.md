# Google Sheets + React

This is a [small experimental app](https://lourd.github.io/react-google-sheet) exploring how to easily pull data from Google Sheets using React to componentize the [Google Sheets browser API](https://developers.google.com/sheets/api/quickstart/js).

This project utilizes the [render prop React pattern](https://reactjs.org/docs/render-props.html) and context. It uses the [new proposed context API](https://github.com/acdlite/rfcs/blob/new-version-of-context/text/0000-new-version-of-context.md) through the implementation in the [`react-broadcast` beta](https://github.com/ReactTraining/react-broadcast/pull/47). See its usage in `GoogleApi` and `GoogleSheet`, described below.

## Setup

There are a few steps to using the app

* Get an API key and application ID from the [Google APIs console](https://console.developers.google.com/apis/credentials)
* Get the ID of a spreadsheet that you have permission to view. In the URL of a sheet it's in between `/d/` and `/edit`, i.e. for `/spreadsheets/d/foofoo/edit` it's **foofoo**.
* Choose a range of the spreadsheet, e.g. `Tab 1!2:12`

## Components

### [GoogleApi](./src/GoogleApi.js)

This component handles downloading and instantiating the Google API browser SDK, and passing it into context for other components to use. See an example of this component used in [App.js](./src/App.js#L9-L32)

### [GoogleSheet](./src/GoogleSheet.js/)

Ths component handles getting the Google client from context and using to to request the data from the Sheets API. See an example of this component used in [DynamicSpreadsheet.js](./src/DynamicSpreadsheet.js#L21-L33)
