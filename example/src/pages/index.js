import React from 'react';
import PropTypes from 'prop-types';
import Head from 'react-helmet';
import Octokitty from '../Octokitty';
import App from '../App';

import './style.css';

export default () => (
  <div>
    <Octokitty repo="lourd/react-google-sheets" />
    <App />
  </div>
);
