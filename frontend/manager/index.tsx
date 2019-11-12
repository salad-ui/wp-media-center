import React from 'react';
import ReactDOM from 'react-dom';
import {ThemeProvider} from '@salad-ui/theme';
import {MediaProvider} from '@api';
import {client} from './client';
import {App} from './App';

ReactDOM.render(
  <MediaProvider client={client}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </MediaProvider>,
  document.getElementById('wp-media-center__manager-app'),
);
