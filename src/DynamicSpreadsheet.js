import React from 'react';

import Blob from './Blob';
import Field from './Field';
import GoogleSheet from './GoogleSheet';
import Select from './Select';
import Table from './Table';

const RenderChoices = {
  table: Table,
  blob: Blob
};

const MyData = ({ data, render }) => {
  const Comp = RenderChoices[render];
  return <Comp data={data} />;
};

// Wraps the GoogleSheet component to provide some basic components
// for display loading & error states
const SimpleGSheet = props => (
  <GoogleSheet id={props.id} range={props.range}>
    {({ error, data, loading }) =>
      loading ? (
        'Getting data...'
      ) : error ? (
        JSON.stringify(error, null, 2)
      ) : data ? (
        <MyData data={data} render={props.render} />
      ) : null
    }
  </GoogleSheet>
);

class DynamicSpreadsheet extends React.Component {
  state = {
    id: '',
    range: '',
    render: 'table',
    submitted: null
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({
      submitted: {
        id: this.state.id,
        range: this.state.range
      }
    });
  };

  handleChange = (key, value) => this.setState({ [key]: value });

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Field
            label="Spreadsheet ID"
            name="id"
            onChange={this.handleChange}
            value={this.state.id}
          />
          <Field
            label="Range"
            name="range"
            onChange={this.handleChange}
            value={this.state.range}
          />
          <Select
            label="Display"
            name="render"
            onChange={this.handleChange}
            value={this.state.render}
            options={Object.keys(RenderChoices)}
          />
          <input type="submit" value="Submit" />
        </form>
        {this.state.submitted && (
          <SimpleGSheet
            id={this.state.submitted.id}
            range={this.state.submitted.range}
            render={this.state.render}
          />
        )}
      </div>
    );
  }
}

export default DynamicSpreadsheet;
