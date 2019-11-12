import {MediaClient} from '@api';

declare global {
  interface Window {
    nonce: string;
  }
}

export const client = new MediaClient({nonce: window.nonce});
