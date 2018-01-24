import React from 'react';

const Table = ({ data }) => (
  <table>
    <thead>
      <tr>{data[0].map((label, i) => <th key={i}>{label}</th>)}</tr>
    </thead>
    <tbody>
      {data
        .slice(1)
        .map((row, i) => (
          <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
        ))}
    </tbody>
  </table>
);

export default Table;
