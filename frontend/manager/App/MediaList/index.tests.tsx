import * as React from 'react';
import {render, waitForDomChange} from '@testing-library/react';
import {ThemeProvider} from '@salad-ui/theme';
import {MediaClient, MediaProvider, ListItem} from '@api';
import {MediaList} from '.';

const client = new MediaClient({nonce: 'foobar'});

const renderMediaList = () =>
  render(
    <MediaProvider client={client}>
      <ThemeProvider>
        <MediaList />
      </ThemeProvider>
    </MediaProvider>,
  );

describe('MediaList', () => {
  let listSpy = jest.spyOn(client, 'list');

  beforeEach(() => {
    listSpy.mockClear();
  });

  test.todo('shows a loading screen when the list of items are being fetched');

  test('shows a list of items when the items have been fetched', async () => {
    listSpy.mockImplementation(() =>
      Promise.resolve([
        ({
          id: 1,
          sizes: {
            thumbnail: {
              width: 12,
              height: 12,
              url: 'http://example.com/example-1.jpg',
            },
          },
        } as any) as ListItem,
        ({
          id: 2,
          sizes: {
            thumbnail: {
              width: 12,
              height: 12,
              url: 'http://example.com/example-2.jpg',
            },
          },
        } as any) as ListItem,
        ({
          id: 3,
          sizes: {
            thumbnail: {
              width: 12,
              height: 12,
              url: 'http://example.com/example-3.jpg',
            },
          },
        } as any) as ListItem,
      ]),
    );
    const {container} = renderMediaList();
    await waitForDomChange();
    expect(container.getElementsByTagName('img')).toHaveLength(3);
  });

  test.todo(
    'shows an error screen when the list of items has failed to be fetched',
  );

  test.todo(
    'item is no longer rendered when the delete button is pressed and the deletion is successful',
  );
  test.todo(
    'an error is rendered when the delete button is pressed and the deletion is unsuccessful',
  );
  test.todo('delete button is disabled while deletion is in progress');
});
