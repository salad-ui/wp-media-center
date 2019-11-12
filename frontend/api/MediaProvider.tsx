import * as React from 'react';
import {MediaClient} from './MediaClient';
import {MediaContext} from './MediaContext';

export interface MediaProviderProps {
  client: MediaClient;
  children?: React.ReactElement;
}

export const MediaProvider: React.FC<MediaProviderProps> = ({
  client,
  children,
}) => {
  return (
    <MediaContext.Provider value={client}>{children}</MediaContext.Provider>
  );
};
