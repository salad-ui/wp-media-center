import * as React from 'react';
import {usePromise} from '@jameslnewell/react-promise';
import {useMedia} from '@api';
import {MediaListItem} from './MediaListItem';
import {List} from './index.styles';

export const MediaList = () => {
  const media = useMedia();
  const [items] = usePromise(() => media.list(), []);
  return (
    <List>
      {items && items.map(item => <MediaListItem key={item.id} item={item} />)}
    </List>
  );
};
