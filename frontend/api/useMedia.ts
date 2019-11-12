import * as React from 'react';
import {MediaContext} from './MediaContext';
import {MediaClient} from './MediaClient';

export const useMedia = (): MediaClient => {
  const client = React.useContext(MediaContext);
  if (!client) {
    throw new Error('useMedia() must be nested within a <MediaProvider/>');
  }
  return client;
};
