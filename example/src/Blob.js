import React from 'react';

const Blob = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

export default Blob;
