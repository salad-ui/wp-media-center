import * as React from 'react';
import {Title} from '@salad-ui/typography';
import {MediaList} from './MediaList';
import {MediaUpload} from './MediaUpload';
import {Wrapper} from './index.styles';

export const App: React.FC = () => {
  return (
    <Wrapper>
      <Title size="medium">Media Library</Title>
      <MediaList />
      <MediaUpload />
    </Wrapper>
  );
};
