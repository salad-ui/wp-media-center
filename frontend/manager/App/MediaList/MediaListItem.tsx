import * as React from 'react';
import {useInvokablePromise} from '@jameslnewell/react-promise';
import {Button} from '@salad-ui/button';
import {useMedia, MediaItem} from '@api';
import {ListItem} from './MediaListItem.styles';

export interface MediaListItemProps {
  item: MediaItem;
}

export const MediaListItem: React.FC<MediaListItemProps> = ({item}) => {
  const media = useMedia();
  const [handleDeleteItem, , {isPending}] = useInvokablePromise(
    () => media.delete(item.id, item.nonces.delete),
    [item],
  );
  const thumbnail = item.sizes.thumbnail;
  return (
    <ListItem>
      <img
        src={thumbnail.url}
        alt={item.alt}
        width={thumbnail.width}
        height={thumbnail.height}
      />
      <br />
      <Button
        variant="tertiary"
        isDestructive
        isDisabled={isPending}
        onClick={handleDeleteItem}
      >
        Delete
      </Button>
    </ListItem>
  );
};
