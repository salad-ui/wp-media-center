import * as React from 'react';
import {render, waitForDomChange, fireEvent} from '@testing-library/react';
import {ThemeProvider} from '@salad-ui/theme';
import {MediaClient, MediaProvider, MediaItem} from '@api';
import {MediaUpload} from '.';

const client = new MediaClient({nonce: 'foobar'});

class ErrorSilencer extends React.Component {
  componentDidCatch() {
    // intentionally silencing errors
  }
  render() {
    return this.props.children;
  }
}

const renderMediaUpload = () =>
  render(
    <MediaProvider client={client}>
      <ThemeProvider>
        <ErrorSilencer>
          <MediaUpload />
        </ErrorSilencer>
      </ThemeProvider>
    </MediaProvider>,
  );

const selectFile = (input: HTMLInputElement | null) => {
  if (!input) {
    return;
  }
  const file = new File(['(⌐□_□)'], 'chucknorris.png', {type: 'image/png'});
  Object.defineProperty(input, 'files', {
    value: [file],
  });
};

const submitForm = (form: HTMLFormElement | null) => {
  if (!form) {
    return;
  }
  fireEvent.submit(form);
};

describe('MediaUpload', () => {
  const uploadSpy = jest.spyOn(client, 'upload');

  beforeEach(() => {
    uploadSpy.mockClear();
  });

  test('should render a message when the upload has been successful', async () => {
    uploadSpy.mockImplementation(() => Promise.resolve({} as MediaItem));
    const {container, getByText} = renderMediaUpload();
    const form = container.querySelector('form');
    const fileInput = container.querySelector('input');
    expect(form).toBeTruthy();
    expect(fileInput).toBeTruthy();

    selectFile(fileInput);
    submitForm(form);

    await waitForDomChange();
    getByText('Upload complete');
  });

  test.only('should render an error when the upload has been unsuccessful', async () => {
    uploadSpy.mockImplementation(() => Promise.reject('Uh oh!'));
    const {container, getByText} = renderMediaUpload();
    const form = container.querySelector('form');
    const fileInput = container.querySelector('input');
    expect(form).toBeTruthy();
    expect(fileInput).toBeTruthy();

    selectFile(fileInput);
    submitForm(form);

    await waitForDomChange();
    getByText('Uh oh!');
  });
});
