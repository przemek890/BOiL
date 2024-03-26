import React from 'react';
import ReactDOM from 'react-dom';
import MainApp from './MainApp';
import { MantineProvider } from '@mantine/core';

ReactDOM.render(
  <React.StrictMode>
    <MainApp />
  </React.StrictMode>,
  document.getElementById('root')
);
