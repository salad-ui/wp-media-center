import * as React from 'react';
import {useObservable} from '@jameslnewell/react-observable';
import {useMedia, MediaItem} from '@api';
import {MediaListItem} from './MediaListItem';
import {List} from './index.styles';

export const MediaList: React.FC = () => {
  const media = useMedia();
  const [items] = useObservable<MediaItem[]>(() => media.list() as any, []);
  return (
    <List>
      {items && items.map(item => <MediaListItem key={item.id} item={item} />)}
    </List>
  );
};
