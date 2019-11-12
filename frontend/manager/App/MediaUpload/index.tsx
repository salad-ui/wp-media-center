import * as React from 'react';
import {useInvokablePromise} from '@jameslnewell/react-promise';
import {useMedia} from '@api';
import {Button} from '@salad-ui/button';
import {Title} from '@salad-ui/typography';

const getFileFromInput = (input: HTMLInputElement | null): File | undefined => {
  if (!input) {
    return undefined;
  }
  const files = input.files;
  if (!files) {
    return undefined;
  }
  const file = files[0];
  if (!file) {
    return undefined;
  }
  return file;
};

export const MediaUpload: React.FC = () => {
  const media = useMedia();
  const fileInput = React.useRef<HTMLInputElement>(null);
  const [upload, , {isPending, isFulfilled, error}] = useInvokablePromise(
    (name: string, file: File) => media.upload(name, file),
    [],
  );

  const handleUpload = (event: React.FormEvent): void => {
    event.preventDefault();
    const file = getFileFromInput(fileInput.current);
    if (file) {
      upload(file.name, file);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <Title size="large">Upload</Title>
      <input ref={fileInput} type="file" />
      <Button variant="primary" isDisabled={isPending}>
        Upload
      </Button>
      {error && <span>{String(error)}</span>}
      {isFulfilled && <span>Upload complete</span>}
    </form>
  );
};
