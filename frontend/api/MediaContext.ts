import * as React from 'react';
import {MediaClient} from './MediaClient';

export const MediaContext = React.createContext<MediaClient | undefined>(
  undefined,
);
